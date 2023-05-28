import React, { useState } from 'react'
import Dialog,{alert,confirm,Modal} from './dialog'

export default () => {
  const [open,setOpen] = useState(false)
//   const [x,setX] = useState(false)
const onCancelModal=()=>{
  const cancel=  Modal(<><h1>我是关掉你的弹窗</h1><button onClick={()=>cancel()}>123</button></>)
}
  return <>
  <button onClick={()=>setOpen(!open)}>onClick</button>
  <Dialog open={open} onCancel={()=>{setOpen(false)}} buttons={[<button>确定</button>,<button>关闭</button>]}>朱芝意是傻逼</Dialog>
  <button onClick={()=>alert("123")}>alert</button>
  <button onClick={()=>confirm("123",()=>console.log("yes"),()=>console.log("no"))} >confirm</button>
  <button onClick={onCancelModal} >Modal</button>
  </>
}
