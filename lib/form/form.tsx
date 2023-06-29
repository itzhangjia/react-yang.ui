import React from 'react'
export interface anyObject {
  [key: string]: string
}
interface Props {
  value: anyObject
  fields: Array<{ name: string; label: string; input: { type: string } }>
  buttons: any
  onFinish: (object: anyObject) => void
  onSubmit: React.FormEventHandler
  errors:any
}
const Form: React.FunctionComponent<Props> = (props) => {
  const InputChange = (key: string, value: string) => {
    props.onFinish({ ...props.value, [key]: value })
  }
  const onSubmit: React.FormEventHandler = (e) => {
    e.preventDefault()
    props.onSubmit(e)
  }
  return (
    <form onSubmit={onSubmit}>
      {props.fields.map((item, index) => (
        <div key={index}>
          {item.label}
          <input
            type={item.input.type}
            onChange={(e) => InputChange(item.name, e.target.value)}
            value={props.value[item.name]}
          ></input>
          <div>
          {props.errors[item.name]}
          </div>
        </div>
      ))}
      <div>{props.buttons}</div>
    </form>
  )
}

export default Form
