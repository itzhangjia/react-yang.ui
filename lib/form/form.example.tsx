import React, { useState } from 'react'
import { anyObject } from './form'
import Form from './form'
import validator from "./validator"
const FormExample: React.FunctionComponent = (props) => {
  const [formData,setFormData] = useState<anyObject>({
    userName: '',
    passWord: '',
  })
  const [fields] = useState([
    { name: 'userName', label: '用户名', input: { type: 'text' } },
    { name: 'passWord', label: '密码', input: { type: 'password' } },
  ])
  const [errors,setErrors]=useState({})
  const onFinish=(values:anyObject)=>{
    setFormData(values)
  }
  const onSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    const rules=[{name:"userName",required:true,maxLength:5,minLength:1},{name:"passWord",required:true,maxLength:7,minLength:4,pattern:/[a-zA-Z/]+/}]
    const errorsResult=validator(formData,rules)
    console.log(errorsResult);
    
    setErrors(errorsResult)
    
  }
  return (
    <Form
      value={formData}
      fields={fields}
      buttons={
        <>
          <button type="submit">确定</button>
          <button>取消</button>
        </>
      }
      onFinish={onFinish}
      onSubmit={onSubmit}
      errors={errors}
    ></Form>
  )
}

export default FormExample
