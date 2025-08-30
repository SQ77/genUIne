import { useState } from '@lynx-js/react';

export default function PeriodSelector({ period, onChange, customTimeParsed }) {
    const [customAmount, setCustomAmount] = useState(period.amount);

    const handlePeriodChange = (time, amount) => {
        onChange({ time, amount });
        setCustomAmount(amount);
    };

    // Check if current period matches customTimeParsed
    const isCustomActive = customTimeParsed && 
        period.time === customTimeParsed.time && 
        period.amount === customTimeParsed.amount;

    // Generate custom button text
    const getCustomButtonText = () => {
        if (!customTimeParsed) return null;
        
        const { time, amount } = customTimeParsed;
        if (time === 'days') {
            return `Past ${amount} Days`;
        } else if (time === 'months') {
            return `Past ${amount} Month${amount > 1 ? 's' : ''}`;
        }
        return 'Custom';
    };

    return (
        <view className="period-selector">
            <text style={{ 
                fontSize: '10px', 
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
                    fontSize: '10px', 
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
                    fontSize: '10px', 
                    fontWeight: '600', 
                    color: period.time === 'days' && period.amount === 30 ? '#ffffff' : '#374151'
                }}>
                    Past 30 Days
                </text>
            </view>
            {customTimeParsed && (
                <view
                    className={isCustomActive ? 'period-active' : 'period-button'}
                    bindtap={() => handlePeriodChange(customTimeParsed.time, customTimeParsed.amount)}
                    style={{ 
                        display: 'inline-flex', 
                        cursor: 'pointer', 
                        padding: '8px 16px',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: '500',
                        transition: 'all 0.2s ease',
                        backgroundColor: isCustomActive ? '#667eea' : '#f8fafc',
                        color: isCustomActive ? '#ffffff' : '#64748b',
                        border: '1px solid',
                        borderColor: isCustomActive ? '#667eea' : '#e2e8f0'
                    }}
                >
                    <text style={{ 
                        fontSize: '14px', 
                        fontWeight: '600', 
                        color: isCustomActive ? '#ffffff' : '#374151'
                    }}>
                        {getCustomButtonText()}
                    </text>
                </view>
            )}
        </view>
    );
}