export function LineChart({ data = [], height = 400, title }) {
    if (!data.length) return <view>No data available</view>;

    const maxValue = Math.max(
        ...data.map((d) => d.views || d.profileViews || 0),
    );
    const chartHeight = height - 80;
    const pointWidth = 80; // Space between points
    const pointRadius = 4; // Circle radius for data points

    // Calculate total content width for scrolling
    const totalPointsWidth = pointWidth * (data.length - 1);
    const contentWidth = totalPointsWidth + 80; // Add padding on both sides

    const formatValue = (value) => {
        if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
        if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
        return `${value}`;
    };

    // Calculate point positions
    const points = data.map((item, index) => {
        const value = item.views || item.profileViews || 0;
        const x = 40 + index * pointWidth; // Start with padding
        const y = chartHeight - (value / maxValue) * chartHeight;
        return { x, y, value, item };
    });

    // Create line segments between points
    const lineSegments = [];
    for (let i = 0; i < points.length - 1; i++) {
        const startPoint = points[i];
        const endPoint = points[i + 1];

        // Calculate line angle and length
        const deltaX = endPoint.x - startPoint.x;
        const deltaY = endPoint.y - startPoint.y;
        const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

        lineSegments.push({
            x: startPoint.x,
            y: startPoint.y,
            length,
            angle,
        });
    }

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

           
                {/* Y-axis labels */}
                <view
                    style={{
                        position: 'absolute',
                        left: '10px',
                        top: '50px',
                        height: `${chartHeight}px`,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        fontSize: '12px',
                        color: '#666',
                        backgroundColor: '#fafafa',
                        paddingRight: '8px',
                    }}
                > 
                    <text>{formatValue(maxValue)}</text>
                    <text>{formatValue(maxValue * 0.75)}</text>
                    <text>{formatValue(maxValue * 0.5)}</text>
                    <text>{formatValue(maxValue * 0.25)}</text>
                    <text>0</text>
                </view>

                {/* Chart area with horizontal scroll */}
                <scroll-view
                    scroll-orientation="horizontal"
                    style={{
                        left: '50px',
                        top: '20px',
                        right: '10px',
                        height: `${chartHeight}px`,
                        borderLeft: '2px solid #ddd',
                        borderBottom: '2px solid #ddd',
                        overflow: 'hidden',
                    }}
                >
                    {/* Scrollable content container */}
                    <view
                        style={{
                            width: `${contentWidth}px`,
                            height: `${chartHeight}px`,
                            position: 'relative',
                        }}
                    >
                        {/* Grid lines */}
                        <view
                            style={{
                                top: '0',
                                left: '0',
                                width: '100%',
                                height: '100%',
                                pointerEvents: 'none',
                            }}
                        >
                            {[0, 0.25, 0.5, 0.75, 1].map((percent) => (
                                <view
                                    key={percent}
                                    style={{
                                        position: 'relative',
                                        bottom: `${percent * 100}%`,
                                        left: '0',
                                        right: '0',
                                        height: '1px',
                                        backgroundColor:
                                            percent === 0 ? '#ddd' : '#f0f0f0',
                                    }}
                                />
                            ))}
                        </view>

                        {/* Line segments */}
                        {lineSegments.map((segment, index) => (
                            <view
                                key={`line-${index}`}
                                style={{
                                    position: 'absolute',
                                    left: `${segment.x}px`,
                                    top: `${segment.y}px`,
                                    width: `${segment.length}px`,
                                    height: '3px',
                                    backgroundColor: '#0ea5e9',
                                    transformOrigin: '0 50%',
                                    transform: `rotate(${segment.angle}deg)`,
                                    borderRadius: '1.5px',
                                }}
                            />
                        ))}

                        {/* Data points and labels */}
                        {points.map((point, index) => (
                            <view key={index}>
                                {/* Value label above point */}
                                <view
                                    style={{
                                        position: 'absolute',
                                        left: `${point.x - 25}px`,
                                        top: `${point.y - 25}px`,
                                        width: '50px',
                                        fontSize: '10px',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        backgroundColor:
                                            'rgba(240, 249, 255, 0.9)',
                                        padding: '2px 4px',
                                    }}
                                >
                                    <text>{formatValue(point.value)}</text>
                                </view>

                                {/* Data point circle */}
                                <view
                                    style={{
                                        position: 'absolute',
                                        left: `${point.x - pointRadius}px`,
                                        top: `${point.y - pointRadius}px`,
                                        width: `${pointRadius * 2}px`,
                                        height: `${pointRadius * 2}px`,
                                        backgroundColor: '#0ea5e9',
                                        borderRadius: '50%',
                                        border: '2px solid #fff',
                                        boxShadow:
                                            '0 2px 4px rgba(14, 165, 233, 0.3)',
                                        cursor: 'pointer',
                                    }}
                                />

                                {/* X-axis label below chart area */}
                                <view
                                    style={{
                                        position: 'absolute',
                                        left: `${point.x - 30}px`,
                                        top: `${chartHeight + 8}px`,
                                        width: '60px',
                                        fontSize: '11px',
                                        color: '#0369a1',
                                        textAlign: 'center',
                                        fontWeight: '500',
                                    }}
                                >
                                    <text>{point.item.period}</text>
                                </view>
                            </view>
                        ))}
                    </view>
                </scroll-view>
            </view>
    );
}
