import { useState } from '@lynx-js/react';
import '../styles/InitialDashboard.css';
import { BarChart } from './BarChart';
import { LineChart } from './LineChart';
import { PieChart } from './PieChart';

export default function InitialDashboard({ selectedCard: externalSelectedCard, ...props }) {
    const [selectedCard, setSelectedCard] = useState(null);
    
    // Use external selectedCard if provided, otherwise use internal state
    const activeCard = externalSelectedCard !== undefined ? externalSelectedCard : selectedCard;

    props.onRender?.();

    const handleCardSelect = (cardId) => {
        // Toggle selection (only used when no external selectedCard is provided)
        if (externalSelectedCard === undefined) {
            setSelectedCard(selectedCard === cardId ? null : cardId);
        }
    };

    return (
        <view className="initial-dashboard">
            <text className="title">Analytics</text>
            <view className="cards-container">
                {/* Cards will be rendered by DynamicDashboard */}
            </view>
            {activeCard === 'profile-views' && (
                <BarChart
                    data={[
                        { month: 'Jan', views: 1200 },
                        { month: 'Feb', views: 1800 },
                        { month: 'Mar', views: 2400 },
                        { month: 'Apr', views: 1900 },
                        { month: 'May', views: 3200 },
                        { month: 'Jun', views: 2800 },
                        { month: 'Jul', views: 3600 },
                        { month: 'Aug', views: 4200 },
                    ]}
                    title="Profile Views by Month"
                />
            )}
            {activeCard === 'post-views' && (
                <LineChart
                    data={[
                        { period: 'Mon', views: 4200 },
                        { period: 'Tue', views: 3800 },
                        { period: 'Wed', views: 5100 },
                        { period: 'Thu', views: 6300 },
                        { period: 'Fri', views: 7900 },
                        { period: 'Sat', views: 9200 },
                        { period: 'Sun', views: 8600 },
                    ]}
                    title="Post Views by Day"
                />
            )}
            {activeCard === 'likes' && (
                <PieChart
                    data={[
                        { period: 'Mon', views: 4200 },
                        { period: 'Tue', views: 3800 },
                        { period: 'Wed', views: 5100 },
                        { period: 'Thu', views: 6300 },
                        { period: 'Fri', views: 7900 },
                        { period: 'Sat', views: 9200 },
                        { period: 'Sun', views: 8600 },
                    ]}
                    title="Likes Distribution"
                />
            )}
            {activeCard === 'comments' && (
                <LineChart
                    data={[
                        { period: 'Mon', views: 4200 },
                        { period: 'Tue', views: 3800 },
                        { period: 'Wed', views: 5100 },
                        { period: 'Thu', views: 6300 },
                        { period: 'Fri', views: 7900 },
                        { period: 'Sat', views: 9200 },
                        { period: 'Sun', views: 8600 },
                    ]}
                    title="Comments by Day"
                />
            )}
            {activeCard === 'shares' && (
                <LineChart
                    data={[
                        { period: 'Mon', views: 4200 },
                        { period: 'Tue', views: 3800 },
                        { period: 'Wed', views: 5100 },
                        { period: 'Thu', views: 6300 },
                        { period: 'Fri', views: 7900 },
                        { period: 'Sat', views: 9200 },
                        { period: 'Sun', views: 8600 },
                    ]}
                    title="Shares by Day"
                />
            )}
            {activeCard === 'unique-viewers' && (
                <LineChart
                    data={[
                        { period: 'Mon', views: 4200 },
                        { period: 'Tue', views: 3800 },
                        { period: 'Wed', views: 5100 },
                        { period: 'Thu', views: 6300 },
                        { period: 'Fri', views: 7900 },
                        { period: 'Sat', views: 9200 },
                        { period: 'Sun', views: 8600 },
                    ]}
                    title="Viewers by Day"
                />
            )}
        </view>
    );
}
