import { useState, useCallback, useEffect } from '@lynx-js/react';
import { ChatInterface } from './ChatInterface';
import StatisticCard from './StatisticCard';
import InitialDashboard from './InitialDashboard';
import PeriodSelector from './PeriodSelector'
import { createCreatorStats } from '../utils/types';

import '../styles/DynamicDashboard.css';

export function DynamicDashboard() {
    const [components, setComponents] = useState([
        {
            id: 'post-views',
            type: 'metric',
            data: {
                title: 'Post Views',
                statistic: '82.3K',
                changePercent: 7.9,
                changeValue: +6000
            },
            config: {}
        },
        {
            id: 'profile-views',
            type: 'metric',
            data: {
                title: 'Profile Views',
                statistic: '4.6K',
                changePercent: -2.1,
                changeValue: -100
            },
            config: {}
        },
        {
            id: 'likes',
            type: 'metric',
            data: {
                title: 'Likes',
                statistic: '3.4K',
                changePercent: +4.2,
                changeValue: +140
            },
            config: {}
        },
        {
            id: 'comments',
            type: 'metric',
            data: {
                title: 'Comments',
                statistic: '1.2K',
                changePercent: -1.6,
                changeValue: -20
            },
            config: {}
        },
        {
            id: 'shares',
            type: 'metric',
            data: {
                title: 'Shares',
                statistic: '850',
                changePercent: +3.5,
                changeValue: +30
            },
            config: {}
        },
        {
            id: 'unique-viewers',
            type: 'metric',
            data: {
                title: 'Unique Viewers',
                statistic: '12.5K',
                changePercent: +5.1,
                changeValue: +600
            },
            config: {}
        }
    ]);
    const [creatorStats, setCreatorStats] = useState(createCreatorStats());
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [period, setPeriod] = useState({
        time: 'days', // days or months
        amount: 7
    })

    const [customTimeParsed, setCustomTimeParsed] = useState(null);

    // Mock data - replace with real API calls
    useEffect(() => {
        const mockStats = createCreatorStats({
            profileViews: 15420,
            comments: 342,
            likes: 1205,
            followers: 8934,
            engagement: 12.8,
        });
        setCreatorStats(mockStats);
    }, []);

    const updateComponents = useCallback((newComponents) => {
        setComponents(newComponents);
    }, []);

    const getCurrentComponents = useCallback(() => components, [components]);
    const getCreatorStats = useCallback(() => creatorStats, [creatorStats]);

    const renderComponent = (component) => {
        const commonProps = {
            key: component.id,
            id: component.id,
            title: component.data.title,
            statistic: component.data.statistic,
            changePercent: component.data.changePercent,
            changeValue: component.data.changeValue,
            isSelected: selectedCard === component.id,
            onSelect: (cardId) => {
                // Toggle selection
                setSelectedCard(selectedCard === cardId ? null : cardId);
            },
            onRemove: () => removeComponent(component.id),
        };

        switch (component.type) {
            case 'metric':
                return <StatisticCard {...commonProps} />;
            default:
                return null;
        }
    };

    const removeComponent = (componentId) => {
        setComponents((prev) => prev.filter((comp) => comp.id !== componentId));
    };

    return (
        <view className="dashboard-container">
            <view className="dashboard-main">
                <text className="title">Analytics</text>
                <PeriodSelector period={period} onChange={setPeriod} customTimeParsed={customTimeParsed} />
                <view
                    className="dashboard-grid"
                    style={{ position: 'relative', minHeight: '600px' }}
                >
                    {components.map(renderComponent)}
                    {components.length === 0 && <InitialDashboard />}
                    <InitialDashboard selectedCard={selectedCard} />
                    {isChatOpen && (
                        <ChatInterface
                            isOpen={isChatOpen}
                            onClose={() => setIsChatOpen(false)}
                            onUIUpdate={updateComponents}
                            getCurrentComponents={getCurrentComponents}
                            getCreatorStats={getCreatorStats}
                        />
                    )}
                    <view
                        bindtap={() => setIsChatOpen(true)}
                        className="chat-button"
                    >
                        <text className="chat-button-text">Chat</text>
                    </view>
                </view>
            </view>
        </view>
    );
}
