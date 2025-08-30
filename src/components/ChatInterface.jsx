import {
    useState,
    useEffect,
    useRef,
    useLynxGlobalEventListener,
} from '@lynx-js/react';
import '../styles/ChatInterface.css';
import parseUserinput from '../api/backend';

export function ChatInterface({
    isOpen,
    onClose,
    onUIUpdate,
    getCurrentComponents,
    getCreatorStats,
}) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [inputFocus, setInputFocus] = useState(false);
    const messagesEndRef = useRef(null);

    // Native props setter for keyboard avoidance
    const setNativeProps = (itemId, props) => {
        lynx.createSelectorQuery()
            .select(`#${itemId}`)
            .setNativeProps(props)
            .exec();
    };

    // Keyboard avoidance handler
    const keyboardChanged = (keyboardHeightInPx) => {
        if (keyboardHeightInPx === 0) {
            setNativeProps('chat-input-panel', {
                transform: `translateY(${0}px)`,
                transition: 'transform 0.1s',
            });
        } else {
            const adjustedOffset = Math.min(
                keyboardHeightInPx * 0.6,
                keyboardHeightInPx - 50,
            );
            setNativeProps('chat-input-panel', {
                transform: `translateY(${-adjustedOffset}px)`,
                transition: 'transform 0.3s',
            });
        }
    };

    // Listen for keyboard status changes
    useLynxGlobalEventListener(
        'keyboardstatuschanged',
        (status, keyboardHeight) => {
            console.log('Keyboard status:', status, 'Height:', keyboardHeight);
            keyboardChanged(status === 'on' ? keyboardHeight : 0);
        },
    );

    // Focus input when modal opens
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => setInputFocus(true), 100);
        } else {
            setInputFocus(false);
        }
    }, [isOpen]);

    const handleSendMessage = async (message) => {
        if (!message.trim() || isLoading) return;

        const userMessage = { role: 'user', content: message };
        setMessages((prev) => [...prev, userMessage]);

        // Clear input field
        lynx.createSelectorQuery()
            .select('#chat-input-field')
            .invoke({
                method: 'setValue',
                params: {
                    value: '',
                },
            })
            .exec();

        setInput('');
        setIsLoading(true);

        try {

            const response = await parseUserinput(message);

            console.log("Response is", response)

            setMessages((prev) => [
                ...prev,
                { role: 'assistant', content: JSON.stringify(response)},
            ]);

        } catch (error) {
            setMessages((prev) => [
                ...prev,
                {
                    role: 'assistant',
                    content: 'Sorry, I encountered an error. Please try again.',
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOverlayTap = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <view
            className={`chat-modal-overlay ${isOpen ? 'active' : ''}`}
            bindtap={handleOverlayTap}
        >
            <view className="chat-modal">
                <view className="chat-modal-header">
                    <text className="chat-modal-title">genUIne</text>
                    <view className="chat-modal-close" bindtap={onClose}>
                        <text>×</text>
                    </view>
                </view>

                <view className="chat-interface">
                    <scroll-view
                        className="messages"
                        scroll-orientation="vertical"
                    >
                        {messages.length === 0 && (
                            <view className="chat-welcome">
                                <text className="welcome-title">
                                    Hi! I'm genUIne
                                </text>
                                <text className="welcome-desc">
                                    I can help you analyze your creator stats
                                    and insights. Try asking me something!
                                </text>
                            </view>
                        )}

                        {messages.map((msg, i) => (
                            <view key={i} className={`message ${msg.role}`}>
                                <text className="message-content">
                                    {msg.content}
                                </text>
                            </view>
                        ))}

                        {isLoading && (
                            <view className="message assistant loading">
                                <text className="message-content">
                                    Thinking...
                                </text>
                            </view>
                        )}

                        <view ref={messagesEndRef} />
                    </scroll-view>

                    <view id="chat-input-panel" className="chat-input">
                        <input
                            id="chat-input-field"
                            focus={inputFocus}
                            placeholder="Ask me about your stats..."
                            disabled={isLoading}
                            value={input}
                            bindinput={(res) => {
                                setInput(res.detail.value);
                            }}
                        />
                        <view
                            className="send-button"
                            bindtap={() => handleSendMessage(input)}
                        >
                            <text className="send-button-text">Send</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    );
}
