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
                    top: '70px',
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
                    height: `${chartHeight + 30}px`,
                    borderLeft: '2px solid #ddd',
                    borderBottom: '2px solid #ddd',
                    overflow: 'hidden',
                    width: "80%"
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
                            {/* Value label */}
                            <view
                                style={{
                                    position: 'absolute',
                                    left: `${point.x}px`,
                                    top: `${point.y}px`,
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

                            {/* X-axis label */}
                            <view
                                style={{
                                    position: 'absolute',
                                    left: `${point.x - 30}px`,
                                    top: `${chartHeight -5}px`,
                                    width: '60px',
                                    fontSize: '11px',
                                    color: 'black',
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
