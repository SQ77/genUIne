import { useState } from '@lynx-js/react';
import '../styles/PeriodSelector.css';

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
            <text className="period-selector-label">
                Time Period:
            </text>
            <view
                className={period.time === 'days' && period.amount === 7 ? 'period-button active' : 'period-button'}
                bindtap={() => handlePeriodChange('days', 7)}
            >
                <text className="period-button-text">
                    Past 7 Days
                </text>
            </view>
            <view
                className={period.time === 'days' && period.amount === 30 ? 'period-button active' : 'period-button'}
                bindtap={() => handlePeriodChange('days', 30)}
            >
                <text className="period-button-text">
                    Past 30 Days
                </text>
            </view>
            {customTimeParsed && (
                <view
                    className={isCustomActive ? 'period-button active' : 'period-button'}
                    bindtap={() => handlePeriodChange(customTimeParsed.time, customTimeParsed.amount)}
                >
                    <text className="period-button-text">
                        {getCustomButtonText()}
                    </text>
                </view>
            )}
        </view>
    );
}