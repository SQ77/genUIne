export function BarChart({ data = [], height = 400, title }) {
    if (!data.length) return <view>No data available</view>;

    const maxValue = Math.max(
        ...data.map((d) => d.views || d.profileViews || 0),
    );
    const chartHeight = height - 80;
    const barWidth = 60; 
    const barGap = 15; 

    // Calculate total content width for scrolling
    const totalBarsWidth = barWidth * data.length + barGap * (data.length - 1);
    const contentWidth = totalBarsWidth + 40; // Add padding

    const formatValue = (value) => {
        if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
        if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
        return `${value}`;
    };

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
                    height: `${height}px`,
                    border: '1px solid #e1e5e9',
                    borderRadius: '8px',
                    backgroundColor: '#fafafa',
                    overflow: 'hidden',
                }}
            >
                {/* Y-axis labels */}
                <view
                    style={{
                        position: 'absolute',
                        left: '10px',
                        top: '20px',
                        height: `${chartHeight}px`,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        fontSize: '12px',
                        color: '#666',
                        zIndex: 10,
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
                        position: 'absolute',
                        left: '50px',
                        top: '20px',
                        right: '10px',
                        height: `${chartHeight + 40}px`,
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
                            display: 'flex',
                            alignItems: 'end',
                            paddingLeft: '20px',
                            paddingRight: '20px',
                        }}
                    >
                        {/* Grid lines */}
                        <view
                            style={{
                                position: 'absolute',
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
                                        position: 'absolute',
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

                        {/* Bars container */}
                        <view
                            style={{
                                display: 'flex',
                                alignItems: 'end',
                                gap: `${barGap}px`,
                                height: '100%',
                            }}
                        >
                            {data.map((item, index) => {
                                const value =
                                    item.views || item.profileViews || 0;
                                const barHeight = Math.max(
                                    2,
                                    (value / maxValue) * chartHeight,
                                ); // Min height of 2px

                                return (
                                    <view
                                        key={index}
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            width: `${barWidth}px`,
                                        }}
                                    >
                                        {/* Value label above bar */}
                                        <view
                                            style={{
                                                marginBottom: '5px',
                                                fontSize: '10px',
                                                fontWeight: 'bold',
                                                color: '#0ea5e9',
                                                padding: '2px 4px',
                                                minHeight: '16px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <text>{formatValue(value)}</text>
                                        </view>

                                        {/* Bar with internal label */}
                                        <view
                                            style={{
                                                width: '100%',
                                                height: `${barHeight}px`,
                                                backgroundColor: '#f0f9ff',
                                                border: '2px solid #0ea5e9',
                                                borderRadius: '4px 4px 0 0',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
                                                boxShadow:
                                                    '0 2px 4px rgba(14, 165, 233, 0.1)',
                                                position: 'relative',
                                                display: 'flex',
                                                alignItems: 'flex-end',
                                                justifyContent: 'center',
                                                paddingBottom: '4px',
                                            }}
                                        >
                                            {/* X-axis label inside bar */}
                                            <text
                                                style={{
                                                    fontSize: '11px',
                                                    color: '#0369a1',
                                                    fontWeight: '500',
                                                    textAlign: 'center',
                                                    transform:
                                                        barHeight < 30
                                                            ? 'rotate(-90deg)'
                                                            : 'none',
                                                    transformOrigin: 'center',
                                                }}
                                            >
                                                {item.month}
                                            </text>
                                        </view>
                                    </view>
                                );
                            })}
                        </view>
                    </view>
                </scroll-view>
            </view>
        </view>
    );
}
