// lib/ui-generator.js
import { createUIComponent, createComponentConfig } from '../utils/types';

let componentCounter = 0;

function generateId() {
    return `component-${++componentCounter}-${Date.now()}`;
}

export async function generateUIComponents({
    intent,
    currentComponents,
    creatorStats,
    userMessage,
}) {
    const components = [];

    switch (intent.type) {
        case 'chart':
            components.push(
                createChartComponent(intent, creatorStats, currentComponents),
            );
            break;

        case 'metric':
            intent.metrics.forEach((metric) => {
                components.push(
                    createMetricComponent(
                        metric,
                        creatorStats,
                        currentComponents,
                        components,
                    ),
                );
            });
            break;

        case 'table':
            components.push(
                createTableComponent(intent, creatorStats, currentComponents),
            );
            break;
    }

    return components;
}

function createChartComponent(intent, creatorStats, existingComponents) {
    const data = prepareChartData(
        intent.metrics,
        creatorStats,
        intent.timeframe,
    );

    return createUIComponent(
        generateId(),
        'chart',
        data,
        createComponentConfig(
            generateChartTitle(intent),
            findNextPosition(existingComponents),
            { width: 400, height: 300 },
            { chartType: intent.visualization || 'line' },
        ),
    );
}

function createMetricComponent(
    metric,
    creatorStats,
    existingComponents,
    newComponents,
) {
    return createUIComponent(
        generateId(),
        'metric',
        {
            value: creatorStats[metric] || 0,
            label: formatMetricLabel(metric),
            metric: metric,
        },
        createComponentConfig(
            formatMetricTitle(metric),
            findNextPosition([...existingComponents, ...newComponents]),
            { width: 200, height: 120 },
        ),
    );
}

function createTableComponent(intent, creatorStats, existingComponents) {
    const data = Object.entries(creatorStats).map(([key, value]) => ({
        metric: formatMetricLabel(key),
        value: value,
    }));

    return createUIComponent(
        generateId(),
        'table',
        { rows: data, columns: ['metric', 'value'] },
        createComponentConfig(
            'All Statistics',
            findNextPosition(existingComponents),
            { width: 300, height: 250 },
        ),
    );
}

function prepareChartData(metrics, creatorStats, timeframe) {
    if (timeframe === 'trend') {
        // Mock trend data - replace with real historical data
        return Array.from({ length: 7 }, (_, i) => {
            const dataPoint = { day: `Day ${i + 1}` };
            metrics.forEach((metric) => {
                const baseValue = creatorStats[metric] || 0;
                dataPoint[metric] = Math.floor(
                    baseValue * (0.7 + Math.random() * 0.6),
                );
            });
            return dataPoint;
        });
    } else {
        // Current values for comparison
        return [
            {
                name: 'Current',
                ...metrics.reduce((acc, metric) => {
                    acc[metric] = creatorStats[metric] || 0;
                    return acc;
                }, {}),
            },
        ];
    }
}

function findNextPosition(existingComponents) {
    const gridSize = 220; // Space between components
    const startX = 20;
    const startY = 20;

    const positions = existingComponents.map((comp) => comp.config.position);

    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 5; col++) {
            const x = startX + col * gridSize;
            const y = startY + row * gridSize;

            const isOccupied = positions.some(
                (pos) =>
                    Math.abs(pos.x - x) < gridSize &&
                    Math.abs(pos.y - y) < gridSize,
            );

            if (!isOccupied) {
                return { x, y };
            }
        }
    }

    // Fallback: random position
    return {
        x: startX + Math.floor(Math.random() * 3) * gridSize,
        y: startY + Math.floor(Math.random() * 3) * gridSize,
    };
}

function generateChartTitle(intent) {
    const metricLabels = intent.metrics.map(formatMetricLabel).join(' vs ');

    if (intent.timeframe === 'trend') {
        return `${metricLabels} Trends`;
    }

    if (intent.comparison) {
        return `${metricLabels} Comparison`;
    }

    return metricLabels;
}

function formatMetricLabel(metric) {
    const labels = {
        profileViews: 'Profile Views',
        comments: 'Comments',
        likes: 'Likes',
        followers: 'Followers',
        engagement: 'Engagement Rate',
    };

    return labels[metric] || metric.charAt(0).toUpperCase() + metric.slice(1);
}

function formatMetricTitle(metric) {
    return formatMetricLabel(metric);
}
