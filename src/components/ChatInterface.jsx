import { useState, useEffect, useRef } from '@lynx-js/react';
import '../styles/ChatInterface.css';

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
        setInput('');
        setIsLoading(true);

        try {
            // Send to AI service
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message,
                    currentComponents: getCurrentComponents(),
                    creatorStats: getCreatorStats(),
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const { reply, uiUpdates } = await response.json();

            setMessages((prev) => [
                ...prev,
                { role: 'assistant', content: reply },
            ]);

            if (uiUpdates && uiUpdates.length > 0) {
                onUIUpdate(uiUpdates);
            }
        } catch (error) {
            console.error('Error sending message:', error);
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
                        ×
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

                    <view className="chat-input">
                        <input
                            focus={inputFocus}
                            value={input}
                            onInput={(e) => setInput(e.detail.value)}
                            onConfirm={() => handleSendMessage(input)}
                            onBlur={() => setInputFocus(false)}
                            placeholder="Ask me about your stats..."
                            disabled={isLoading}
                        />
                        <view
                            className="send-button"
                            bindtap={() => handleSendMessage(input)}
                        >
                            Send
                        </view>
                    </view>
                </view>
            </view>
        </view>
    );
}
