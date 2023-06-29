import Demo from '../demo'
import React from 'react'
import Dialog from './index'
export default () => {
  return (
    <Demo code={require('!!raw-loader!./index.tsx').default}>
      <Dialog></Dialog>
    </Demo>
  )
}
