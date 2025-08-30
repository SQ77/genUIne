import { useState, useCallback, useEffect } from '@lynx-js/react';
import { ChatInterface } from './ChatInterface';
import StatisticCard from './StatisticCard';
import InitialDashboard from './InitialDashboard';
import PeriodSelector from './PeriodSelector'
import { createCreatorStats } from '../utils/types';

import '../styles/DynamicDashboard.css';

export function DynamicDashboard() {
    const [components, setComponents] = useState([]);
    const [creatorStats, setCreatorStats] = useState(createCreatorStats());
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [period, setPeriod] = useState({
        time: 'days', // days or months
        amount: 7
    })

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
            data: component.data,
            config: component.config,
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
                <PeriodSelector period={period} onChange={setPeriod} />
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
