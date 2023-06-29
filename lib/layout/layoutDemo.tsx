import Demo from '../demo'
import React from 'react'
import Layout from './index'
export default () => {
  return (
    <Demo code={require('!!raw-loader!./index.tsx').default}>
      <Layout></Layout>
    </Demo>
  )
}
