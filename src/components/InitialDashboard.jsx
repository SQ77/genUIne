import { useState } from '@lynx-js/react';
import StatisticCard from './StatisticCard';

import '../styles/InitialDashboard.css';
import { BarChart } from './BarChart';

export default function InitialDashboard(props) {
    const [selectedCard, setSelectedCard] = useState(null);

    props.onRender?.();

    const handleCardSelect = (cardId) => {
        // Toggle selection
        setSelectedCard(selectedCard === cardId ? null : cardId);
    };

    return (
        <view className="initial-dashboard">
            <text className="title">Analytics</text>
            <view className="cards-container">
                <StatisticCard
                    id="post-views"
                    title="Post Views"
                    statistic="82.3K"
                    changePercent={7.9}
                    changeValue={+6_000}
                    isSelected={selectedCard === 'post-views'}
                    onSelect={handleCardSelect}
                />
                <StatisticCard
                    id="profile-views"
                    title="Profile Views"
                    statistic="4.6K"
                    changePercent={-2.1}
                    changeValue={-100}
                    isSelected={selectedCard === 'profile-views'}
                    onSelect={handleCardSelect}
                />
                <StatisticCard
                    id="likes"
                    title="Likes"
                    statistic="3.4K"
                    changePercent={+4.2}
                    changeValue={+140}
                    isSelected={selectedCard === 'likes'}
                    onSelect={handleCardSelect}
                />
                <StatisticCard
                    id="comments"
                    title="Comments"
                    statistic="1.2K"
                    changePercent={-1.6}
                    changeValue={-20}
                    isSelected={selectedCard === 'comments'}
                    onSelect={handleCardSelect}
                />
            </view>
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
        </view>
    );
}
