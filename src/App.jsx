import { useState } from '@lynx-js/react';

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
          <text className="Statistic">HELLO</text>
          <text className="Statistic">HELLO</text>
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
