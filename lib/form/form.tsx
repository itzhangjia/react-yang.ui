import React from 'react'
import Input from '../input/input'
import {classes} from "../classes"
import "./form.scss"

export interface anyObject {
  [key: string]: string
}
interface Props {
  value: anyObject
  fields: Array<{ name: string; label: string; input: { type: string } }>
  buttons: any
  onFinish: (object: anyObject) => void
  onSubmit: React.FormEventHandler
  errors: any
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
      <table className="yang-form-table">
        {props.fields.map((item, index) => (
          <tr className={classes("yang-form-row")} key={index}>
            <td className="yang-form-td">
              <span className="yang-form-label">{item.label}</span>
              </td>
            <td className="yang-form-td">
              <Input
              className="yang-form-input"
                type={item.input.type}
                onChange={(e) => InputChange(item.name, e.target.value)}
                value={props.value[item.name]}
              ></Input>
              <div>{props.errors[item.name]}</div>
            </td>
          </tr>
        ))}
      </table>
      <div>{props.buttons}</div>
    </form>
  )
}

export default Form
