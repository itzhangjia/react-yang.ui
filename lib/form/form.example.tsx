import React, { useState } from 'react'
import Button from '../button/button'
import { anyObject } from './form'
import Form from './form'
import validator from './validator'
const FormExample: React.FunctionComponent = (props) => {
  const nameList=["fanbingbing","yangmi"]
  const checkName=(name:string,success:(value?:unknown)=>void,reject:()=>void)=>{
    setTimeout(()=>{
      if(nameList.includes(name)){
        success()
      }else{
        reject()
      }
    },3000)
  }
  const [formData, setFormData] = useState<anyObject>({
    userName: '',
    passWord: '',
  })
  const [fields] = useState([
    { name: 'userName', label: '用户名', input: { type: 'text' } },
    { name: 'passWord', label: '密码', input: { type: 'password' } },
  ])
  const [errors, setErrors] = useState({})
  const onFinish = (values: anyObject) => {
    setFormData(values)
  }
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const rules = [
      { key: 'userName', required: true, maxLength: 5, minLength: 1 },
      {
        key: 'passWord',
        required: true,
        maxLength: 7,
        minLength: 4,
        pattern: /[a-zA-Z/]+/,
      },
      {key:"userName",validator:{
        name: "required",
        validatorFn:(username:string)=>{
          return new Promise<void>((resolve, reject) => {
            checkName(username,resolve,reject)
          })
        }
      }}
    ] 
    validator(formData, rules,(errorsResult)=>{
      setErrors(errorsResult)
    })
   
  }
  return (
    <Form
      value={formData}
      fields={fields}
      buttons={
        <>
          <Button type="submit">确定</Button>
          <Button>取消</Button>
        </>
      }
      onFinish={onFinish}
      onSubmit={onSubmit}
      errors={errors}
    ></Form>
  )
}

export default FormExample
