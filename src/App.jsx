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

  const onTap = useCallback(() => {
    'background only'
    setAlterLogo(prevAlterLogo => !prevAlterLogo)
  }, [])

  const handleInputChange = (e) => {
    setPromptInput(e.target.value)
  }

  return (
    <view>
      <view className='Background' />
      <view className='App'>
        <view className='Banner'>
          <view className='Logo' bindtap={onTap}>
            {alterLogo
              ? <image src={reactLynxLogo} className='Logo--react' />
              : <image src={lynxLogo} className='Logo--lynx' />}
          </view>
          <text className='Title'>User Input is</text>
          <text className='Subtitle'> {promptInput} </text>
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
