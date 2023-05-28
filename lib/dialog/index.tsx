import React, { useState } from 'react'
import Dialog,{alert} from './dialog'

export default () => {
  const [open,setOpen] = useState(false)
//   const [x,setX] = useState(false)

  return <>
  <button onClick={()=>setOpen(!open)}>onClick</button>
  <Dialog open={open} onCancel={()=>{setOpen(false)}} buttons={[<button>确定</button>,<button>关闭</button>]}>朱芝意是傻逼</Dialog>
  <button onClick={()=>alert(123)}>alert</button>
  </>
}
