import { useState } from '@lynx-js/react';

export default function PeriodSelector({ period, onChange }) {
    const [customAmount, setCustomAmount] = useState(period.amount);

    const handlePeriodChange = (time, amount) => {
        onChange({ time, amount });
        setCustomAmount(amount);
    };

    return (
        <view className="period-selector" style={{ 
            height: '60px', 
            backgroundColor: '#ffffff', 
            padding: '12px 24px', 
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
            <text style={{ 
                fontSize: '14px', 
                fontWeight: '600', 
                color: '#374151', 
                marginRight: '16px' 
            }}>
                Time Period:
            </text>
            <view
                className={period.time === 'days' && period.amount === 7 ? 'period-active' : 'period-button'}
                bindtap={() => handlePeriodChange('days', 7)}
                style={{ 
                    display: 'inline-flex', 
                    cursor: 'pointer', 
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: '500',
                    transition: 'all 0.2s ease',
                    backgroundColor: period.time === 'days' && period.amount === 7 ? '#667eea' : '#f8fafc',
                    color: period.time === 'days' && period.amount === 7 ? '#ffffff' : '#64748b',
                    border: '1px solid',
                    borderColor: period.time === 'days' && period.amount === 7 ? '#667eea' : '#e2e8f0'
                }}
            >
                <text style={{ 
                    fontSize: '14px', 
                    fontWeight: '600', 
                    color: '#374151', 
                    marginRight: '16px' 
                }}>
                    Past 7 Days
                </text>
            </view>
            <view
                className={period.time === 'days' && period.amount === 30 ? 'period-active' : 'period-button'}
                bindtap={() => handlePeriodChange('days', 30)}
                style={{ 
                    display: 'inline-flex', 
                    cursor: 'pointer', 
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: '500',
                    transition: 'all 0.2s ease',
                    backgroundColor: period.time === 'days' && period.amount === 30 ? '#667eea' : '#f8fafc',
                    color: period.time === 'days' && period.amount === 30 ? '#ffffff' : '#64748b',
                    border: '1px solid',
                    borderColor: period.time === 'days' && period.amount === 30 ? '#667eea' : '#e2e8f0'
                }}
            >
                <text style={{ 
                    fontSize: '14px', 
                    fontWeight: '600', 
                    color: '#374151', 
                    marginRight: '16px' 
                }}>
                    Past 30 Days
                </text>
            </view>
            <view className="custom-period" style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '8px',
                marginLeft: '8px'
            }}>
                <text style={{ fontSize: '13px', color: '#64748b' }}>Custom</text>
                <view
                    className={period.time === 'days' && period.amount === customAmount ? 'period-active' : 'period-button'}
                    bindtap={() => handlePeriodChange('days', customAmount)}
                    style={{ 
                        display: 'inline-flex', 
                        cursor: 'pointer', 
                        padding: '8px 16px',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: '500',
                        transition: 'all 0.2s ease',
                        backgroundColor: period.time === 'days' && period.amount === customAmount ? '#667eea' : '#f8fafc',
                        color: period.time === 'days' && period.amount === customAmount ? '#ffffff' : '#64748b',
                        border: '1px solid',
                        borderColor: period.time === 'days' && period.amount === customAmount ? '#667eea' : '#e2e8f0'
                    }}
                >
                    Apply
                </view>
            </view>
        </view>
    );
}