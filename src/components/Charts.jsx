import { useState, useEffect } from '@lynx-js/react';
import '../styles/InitialDashboard.css';
import { BarChart } from './BarChart';
import { LineChart } from './LineChart';
import metricDataJson from '../../metric_data.json';

// Helper function to format data for charts
const formatChartData = (data, periodType) => {
    if (!data) return [];
    const today = new Date();
    const formattedData = [];

    if (periodType === 'days') {
        // The last item in `data` corresponds to today
        for (let i = 0; i < data.length; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() - (data.length - 1 - i));
            formattedData.push({
                period: date.toISOString().split('T')[0], // Format: YYYY-MM-DD
                views: data[i],
            });
        }
    } else { // months
        // The last item in `data` corresponds to the current month
        for (let i = 0; i < data.length; i++) {
            const date = new Date(today);
            // Set month, accounting for year changes
            date.setMonth(today.getMonth() - (data.length - 1 - i));
            const month = date.toLocaleString('default', { month: 'short' });
            const year = date.getFullYear();
            formattedData.push({
                period: `${month} ${year}`, // Format: 'Mon YYYY'
                views: data[i],
            });
        }
    }
    return formattedData;
};

export default function InitialDashboard({ selectedCard: externalSelectedCard, period, ...props }) {
    const [selectedCard, setSelectedCard] = useState(null);
    const [chartData, setChartData] = useState([]);
    
    // Use external selectedCard if provided, otherwise use internal state
    const activeCard = externalSelectedCard !== undefined ? externalSelectedCard : selectedCard;

    useEffect(() => {
        if (activeCard && period && metricDataJson[activeCard]) {
            const dataForMetric = metricDataJson[activeCard][period.time];
            const slicedData = dataForMetric.slice(-period.amount);
            setChartData(formatChartData(slicedData, period.time));
        } else {
            setChartData([]);
        }
    }, [activeCard, period]);

    props.onRender?.();

    const handleCardSelect = (cardId) => {
        // Toggle selection (only used when no external selectedCard is provided)
        if (externalSelectedCard === undefined) {
            setSelectedCard(selectedCard === cardId ? null : cardId);
        }
    };

    return (
        <view className="initial-dashboard">
            {activeCard === 'profile-views' && (
                <BarChart
                    data={chartData}
                    title={`Profile Views (${period.time})`}
                />
            )}
            {activeCard === 'post-views' && (
                <LineChart
                    data={chartData}
                    title={`Post Views (${period.time})`}
                />
            )}
            {activeCard === 'likes' && (
                <BarChart
                    data={chartData}
                    title={`Likes (${period.time})`}
                />
            )}
            {activeCard === 'comments' && (
                <LineChart
                    data={chartData}
                    title={`Comments (${period.time})`}
                />
            )}
            {activeCard === 'shares' && (
                <LineChart
                    data={chartData}
                    title={`Shares (${period.time})`}
                />
            )}
            {activeCard === 'unique-viewers' && (
                <LineChart
                    data={chartData}
                    title={`Viewers (${period.time})`}
                />
            )}
        </view>
    );
}
