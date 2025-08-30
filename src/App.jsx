import { useState } from '@lynx-js/react';
import StatisticCard from './components/StatisticCard';

import './App.css';

export function App(props) {
    const [promptInput, setPromptInput] = useState('');

    props.onRender?.();

    const handleInputChange = (e) => {
        setPromptInput(e.target.value);
    };

    return (
        <view>
            <view className="Background" />
            <view className="App">
                <view className="Dashboard">
                    <StatisticCard
                        title="Post Views"
                        statistic="82,310"
                        changePercent={7.9}
                        changeValue={+6_000}
                    />
                    <StatisticCard
                        title="Profile Views"
                        statistic="4,620"
                        changePercent={-2.1}
                        changeValue={-100}
                    />
                    <StatisticCard
                        title="Likes"
                        statistic="3,450"
                        changePercent={+4.2}
                        changeValue={+140}
                    />
                    <StatisticCard
                        title="Comments"
                        statistic="1,220"
                        changePercent={-1.6}
                        changeValue={-20}
                    />
                </view>
                <view className="Content">
                    <input
                        type="text"
                        className="PromptInput"
                        placeholder="Input your prompt...."
                        value={promptInput}
                        onInput={handleInputChange}
                    />
                </view>
                <view style={{ flex: 1 }} />
            </view>
        </view>
    );
}
