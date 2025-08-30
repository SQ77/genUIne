export function PieChart({ data = [], size = 400, title }) {
    if (!data.length) return <view>No data available</view>;

    const chartSize = size - 100;
    const centerX = chartSize / 2;
    const centerY = chartSize / 2;

    // Calculate total value and percentages
    const totalValue = data.reduce(
        (sum, item) =>
            sum + (item.views || item.profileViews || item.value || 0),
        0,
    );

    // Generate colors for each slice
    const colors = [
        '#0ea5e9',
        '#06b6d4',
        '#10b981',
        '#f59e0b',
        '#ef4444',
        '#8b5cf6',
        '#ec4899',
        '#84cc16',
        '#f97316',
        '#6366f1',
        '#14b8a6',
        '#eab308',
    ];

    const formatValue = (value) => {
        if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
        if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
        return `${value}`;
    };

    // Create segments data with percentages
    const segments = data
        .map((item, index) => {
            const value = item.views || item.profileViews || item.value || 0;
            const percentage = (value / totalValue) * 100;

            return {
                ...item,
                value,
                percentage,
                color: colors[index % colors.length],
                label: item.period || item.month || `Item ${index + 1}`,
            };
        })
        .sort((a, b) => b.percentage - a.percentage); // Sort by percentage descending

    return (
        <view style={{ marginTop: '30px' }}>
            <text
                style={{
                    marginBottom: '20px',
                    color: '#333',
                    fontSize: '16px',
                    fontWeight: 'bold',
                }}
            >
                {title}
            </text>

            <view
                style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '100vw',
                    border: '1px solid #e1e5e9',
                    borderRadius: '8px',
                    backgroundColor: '#fafafa',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* Pie Chart Visual */}
                <view
                    style={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '20px',
                        height: `${size}px`,
                    }}
                >
                    {/* Circular segments - full pie without hole */}
                    <view
                        style={{
                            width: `${chartSize}px`,
                            height: `${chartSize}px`,
                            borderRadius: '50%',
                            position: 'relative',
                            overflow: 'hidden',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                        }}
                    >
                        {/* Create visual segments using positioned divs */}
                        {segments.map((segment, index) => {
                            const cumulativePercentage = segments
                                .slice(0, index)
                                .reduce((sum, s) => sum + s.percentage, 0);

                            const startAngle =
                                (cumulativePercentage / 100) * 360 - 90;
                            const segmentAngle =
                                (segment.percentage / 100) * 360;

                            // Break large slices into multiple <=180° wedges
                            const wedges = [];
                            let remaining = segmentAngle;
                            let offset = 0;

                            while (remaining > 0) {
                                const wedgeAngle = Math.min(remaining, 180);
                                wedges.push({ angle: wedgeAngle, offset });
                                remaining -= wedgeAngle;
                                offset += wedgeAngle;
                            }

                            return wedges.map((wedge, i) => (
                                <view
                                    key={`${index}-${i}`}
                                    style={{
                                        position: 'absolute',
                                        width: '50%',
                                        height: '50%',
                                        top: '50%',
                                        left: '50%',
                                        transformOrigin: '0 0',
                                        transform: `rotate(${startAngle + wedge.offset}deg)`,
                                        overflow: 'hidden',
                                    }}
                                >
                                    <view
                                        style={{
                                            width: '100%',
                                            height: '200%',
                                            backgroundColor: segment.color,
                                            transformOrigin: '0 0',
                                            transform: `rotate(${wedge.angle}deg)`,
                                            opacity: 0.9,
                                        }}
                                    />
                                </view>
                            ));
                        })}
                    </view>
                </view>

                {/* Legend */}
                <view
                    style={{
                        padding: '20px',
                        backgroundColor: '#fff',
                        borderTop: '1px solid #e1e5e9',
                        borderRadius: '0 0 8px 8px',
                    }}
                >
                    <text
                        style={{
                            fontSize: '14px',
                            fontWeight: 'bold',
                            color: '#333',
                            marginBottom: '15px',
                        }}
                    >
                        Legend
                    </text>

                    {/* Legend items in a responsive grid */}
                    <view
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '12px',
                            maxHeight: '200px',
                            overflow: 'auto',
                        }}
                    >
                        {segments.map((segment, index) => (
                            <view
                                key={index}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '8px 12px',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    backgroundColor: 'rgba(14, 165, 233, 0.05)',
                                    border: '1px solid rgba(14, 165, 233, 0.1)',
                                    minWidth: '140px',
                                    flex: '1 1 calc(33.333% - 8px)',
                                }}
                            >
                                {/* Color indicator */}
                                <view
                                    style={{
                                        width: '16px',
                                        height: '16px',
                                        backgroundColor: segment.color,
                                        borderRadius: '3px',
                                        border: '1px solid #fff',
                                        boxShadow:
                                            '0 1px 3px rgba(0, 0, 0, 0.1)',
                                        flexShrink: 0,
                                    }}
                                />

                                {/* Label and value */}
                                <view style={{ flex: '1', minWidth: 0 }}>
                                    <text
                                        style={{
                                            fontSize: '12px',
                                            fontWeight: '500',
                                            color: '#333',
                                            marginBottom: '2px',
                                            display: 'block',
                                        }}
                                    >
                                        {segment.label}
                                    </text>
                                    <view
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            gap: '6px',
                                        }}
                                    >
                                        <text
                                            style={{
                                                fontSize: '10px',
                                                color: '#666',
                                                fontWeight: '500',
                                            }}
                                        >
                                            {formatValue(segment.value)}
                                        </text>
                                        <text
                                            style={{
                                                fontSize: '11px',
                                                color: '#0ea5e9',
                                                fontWeight: 'bold',
                                                padding: '1px 4px',
                                                backgroundColor: '#f0f9ff',
                                                borderRadius: '3px',
                                                border: '1px solid #0ea5e9',
                                            }}
                                        >
                                            {segment.percentage.toFixed(1)}%
                                        </text>
                                    </view>
                                </view>
                            </view>
                        ))}
                    </view>
                </view>
            </view>
        </view>
    );
}
