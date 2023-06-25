import Icon from './index'
import Demo from '../demo'
import React from 'react'
export default () => {
  return (
    <Demo code={require('!!raw-loader!./index.tsx').default}>
      <Icon></Icon>
    </Demo>
  )
}
