import { useState, useEffect } from '@lynx-js/react';
import metricDataJson from '../../metric_data.json';

// Helper function to format large numbers
const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
};

// Helper function to calculate statistics based on period
const calculateMetricStats = (metricData, periodType, periodAmount) => {
    if (!metricData || !metricData[periodType] || metricData[periodType].length === 0) {
        return { total: 0, changePercent: 0, changeValue: 0 };
    }

    const dataArray = metricData[periodType];
    const dataLength = dataArray.length;
    
    const currentPeriodData = dataArray.slice(-periodAmount);
    const currentTotal = currentPeriodData.reduce((sum, value) => sum + value, 0);
    
    const comparisonStartIndex = Math.max(0, dataLength - (periodAmount * 2));
    const comparisonEndIndex = dataLength - periodAmount;
    const comparisonPeriodData = dataArray.slice(comparisonStartIndex, comparisonEndIndex);
    const comparisonTotal = comparisonPeriodData.reduce((sum, value) => sum + value, 0);
    
    const changeValue = currentTotal - comparisonTotal;
    const changePercent = comparisonTotal > 0 ? (changeValue / comparisonTotal) * 100 : 0;
    
    return {
        total: currentTotal,
        changePercent: Math.round(changePercent * 10) / 10,
        changeValue: changeValue
    };
};

export default function StatisticCard({
    id,
    title,
    statistic: initialStatistic,
    changePercent: initialChangePercent,
    changeValue: initialChangeValue,
    isSelected,
    onSelect,
    period,
}) {
    const [statistic, setStatistic] = useState(initialStatistic);
    const [changePercent, setChangePercent] = useState(initialChangePercent);
    const [changeValue, setChangeValue] = useState(initialChangeValue);

    useEffect(() => {
        if (metricDataJson && metricDataJson[id] && period) {
            const stats = calculateMetricStats(metricDataJson[id], period.time, period.amount);
            setStatistic(formatNumber(stats.total));
            setChangePercent(stats.changePercent);
            setChangeValue(stats.changeValue);
        }
    }, [id, period]);

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
