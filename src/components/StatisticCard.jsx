export default function StatisticCard({
    id,
    title,
    statistic,
    changePercent,
    changeValue,
    isSelected,
    onSelect,
}) {
    const isPositive = changePercent >= 0;

    const handleTap = () => {
        onSelect(id);
    };

    return (
        <view
            className={`StatisticCard ${isSelected ? 'selected' : ''}`}
            bindtap={handleTap}
        >
            <view className="StatisticCard-header">
                <text className="StatisticCard-title">{title}</text>
            </view>

            <view className="StatisticCard-body">
                <text className="StatisticCard-stat">{statistic}</text>
                <view
                    className={`StatisticCard-change ${isPositive ? 'positive' : 'negative'}`}
                >
                    <text className="StatisticCard-arrow">
                        {isPositive ? '▲' : '▼'}
                    </text>
                    <text className="StatisticCard-percent">
                        {Math.abs(changePercent)}%
                    </text>
                    <text className="StatisticCard-value">
                        ({changeValue >= 0 ? '+' : ''}
                        {changeValue})
                    </text>
                </view>
            </view>
        </view>
    );
}
