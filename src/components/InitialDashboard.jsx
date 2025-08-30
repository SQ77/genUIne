import { useState } from '@lynx-js/react';
import StatisticCard from './StatisticCard';

import '../styles/InitialDashboard.css';

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
        </view>
    );
}
