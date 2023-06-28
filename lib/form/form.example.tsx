import React, {  useState } from "react"
import Form from "./form"
const FormExample:React.FunctionComponent=(props)=>{
    const [formData]=useState({
        userName:"",
        passWord:""
    })
    const [fields]=useState([
        {name:"userName",label:"用户名",input:{type:"text",}},
        {name:"passWord",label:"密码",input:{type:"password",}}
    ])
   return <Form value={formData} fields={fields} buttons={
   <>
  <button>确定</button>
  <button>取消</button> 
   </>}></Form>
}

export default FormExample