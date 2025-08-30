import { useState } from '@lynx-js/react';
import { ChatInterface } from './ChatInterface';
import StatisticCard from './StatisticCard';
import InitialDashboard from './InitialDashboard';
import PeriodSelector from './PeriodSelector';

import '../styles/DynamicDashboard.css';

const INITIAL_COMPONENTS = [
    {
        id: 'post-views',
        type: 'metric',
        data: {
            title: 'Post Views',
            statistic: '82.3K',
            changePercent: 7.9,
            changeValue: +6000,
        },
        config: {},
    },
    {
        id: 'profile-views',
        type: 'metric',
        data: {
            title: 'Profile Views',
            statistic: '4.6K',
            changePercent: -2.1,
            changeValue: -100,
        },
        config: {},
    },
    {
        id: 'likes',
        type: 'metric',
        data: {
            title: 'Likes',
            statistic: '3.4K',
            changePercent: +4.2,
            changeValue: +140,
        },
        config: {},
    },
    {
        id: 'comments',
        type: 'metric',
        data: {
            title: 'Comments',
            statistic: '1.2K',
            changePercent: -1.6,
            changeValue: -20,
        },
        config: {},
    },
    {
        id: 'shares',
        type: 'metric',
        data: {
            title: 'Shares',
            statistic: '850',
            changePercent: +3.5,
            changeValue: +30,
        },
        config: {},
    },
    {
        id: 'unique-viewers',
        type: 'metric',
        data: {
            title: 'Unique Viewers',
            statistic: '12.5K',
            changePercent: +5.1,
            changeValue: +600,
        },
        config: {},
    },
];

export function DynamicDashboard() {
    const [components, setComponents] = useState(INITIAL_COMPONENTS);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [period, setPeriod] = useState({
        time: 'days', // days or months
        amount: 7,
    });

    const [customTimeParsed, setCustomTimeParsed] = useState(null);

    const resetComponents = () => {
        setComponents(INITIAL_COMPONENTS);
        setSelectedCard(null);
        setPeriod({ time: 'days', amount: 7 });
        setCustomTimeParsed(null);
    };

    const updateComponentsFromMetrics = (metrics) => {
        if (!metrics || !Array.isArray(metrics)) return;

        // Create a mapping function to convert metric text to component format
        const createComponentFromMetric = (metric, index) => {
            // Generate a unique ID based on the metric text
            const id = metric.text.toLowerCase().replace(/\s+/g, '-');

            return {
                id: id,
                type: 'metric',
                data: {
                    title: metric.text,
                    statistic: metric.value || '0', // Use metric.value if available
                    changePercent: metric.changePercent || 0,
                    changeValue: metric.changeValue || 0,
                },
                config: {},
            };
        };

        // Update components state with new metrics
        const newComponents = metrics.map(createComponentFromMetric);
        setComponents(newComponents);
    };

    const renderComponent = (component) => {
        const commonProps = {
            key: component.id,
            id: component.id,
            title: component.data.title,
            statistic: component.data.statistic,
            changePercent: component.data.changePercent,
            changeValue: component.data.changeValue,
            isSelected: selectedCard === component.id,
            period: period, // Pass period to StatisticCard
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
            <scroll-view
                scroll-orientation="vertical"
                className="dashboard-main"
            >
                <text className="title">Analytics</text>
                <PeriodSelector
                    period={period}
                    onChange={setPeriod}
                    customTimeParsed={customTimeParsed}
                />
                <view className="dashboard-content">
                    <view
                        className="dashboard-grid"
                        style={{ position: 'relative', minHeight: '600px' }}
                    >
                        {components.map(renderComponent)}
                        {components.length === 0 && <InitialDashboard />}
                        {isChatOpen && (
                            <ChatInterface
                                isOpen={isChatOpen}
                                onClose={() => setIsChatOpen(false)}
                                onSend={setPeriod}
                                onConfirm={setCustomTimeParsed}
                                onMetricsUpdate={updateComponentsFromMetrics}
                                onReset={resetComponents}
                            />
                        )}
                    </view>

                    <InitialDashboard selectedCard={selectedCard} />
                </view>
                <view
                    bindtap={() => setIsChatOpen(true)}
                    className="chat-button"
                >
                    <text className="chat-button-text">Chat</text>
                </view>
            </scroll-view>
        </view>
    );
}
