import React, { useState } from "react"
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
   return <Form value={formData} fields={fields}></Form>
}

export default FormExample