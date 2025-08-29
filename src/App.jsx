import { useCallback, useEffect, useState } from '@lynx-js/react'

import './App.css'
import arrow from './assets/arrow.png'
import lynxLogo from './assets/lynx-logo.png'
import reactLynxLogo from './assets/react-logo.png'

export function App(props) {
  const [alterLogo, setAlterLogo] = useState(false)
  const [promptInput, setPromptInput] = useState("")

  useEffect(() => {
    console.info('Hello, ReactLynx')
  }, [])

  props.onRender?.()

  const handleInputChange = (e) => {
    setPromptInput(e.target.value)
  }

  return (
    <view>
      <view className='Background' />
      <view className='App'>
        <view className='Dashboard'>
          <text className="Statistic">       
              HELLO   
          </text>
          <text className="Statistic">
              HELLO
          </text>
        </view>
        <view className='Content'>
          <input
            type="text"
            className='PromptInput'
            placeholder='Input your prompt....'
            value={promptInput}             
            onInput={handleInputChange}     
          />
        </view>
        <view style={{ flex: 1 }} />
      </view>
    </view>
  )
}
