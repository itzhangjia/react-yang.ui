import React from 'react'
import Input from '../input/input'
import { classes } from '../classes'
import './form.scss'

export interface anyObject {
  [key: string]: string
}
interface Props {
  value: anyObject
  fields: Array<{ name: string; label: string; input: { type: string } }>
  buttons: any
  onChange: (object: anyObject) => void
  onSubmit: React.FormEventHandler
  errors: any
  validateFirst?: 'first' | 'all'
  transformError?: (message: string) => void
}
const Form: React.FunctionComponent<Props> = (props) => {
  const InputChange = (key: string, value: string) => {
    props.onChange({ ...props.value, [key]: value })
  }
  const onSubmit: React.FormEventHandler = (e) => {
    e.preventDefault()
    props.onSubmit(e)
  }
  const transformError = (message: string) => {
    const map: any = {
      required: '必填',
      minLength: '太短',
      maxLength: '太长',
      format: '格式不对',
      onlyOne:"用户名重复"
    }
    return (
      (props.transformError && props.transformError(message)) ||
      map[message] ||
      '未知错误'
    )
  }
  return (
    <form onSubmit={onSubmit}>
      <table className="yang-form-table">
        <tbody>
        {props.fields.map((item, index) => (
          <tr className={classes('yang-form-row')} key={index}>
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
              <div className="yang-form-error">
                {props.errors[item.name] ? (
                  props.validateFirst === 'first' ? (
                    transformError!(props.errors[item.name][0])
                  ) : (
                    props.errors[item.name].map(transformError).join(',')
                  )
                ) : (
                  <span>&nbsp;</span>
                )}
              </div>
            </td>
          </tr>
        ))}
        <tr className="yang-form-tr">
          <td className="yang-form-td"></td>
          <td className="yang-form-td">
            <div>{props.buttons}</div>
          </td>
        </tr>
        </tbody>
      </table>
    </form>
  )
}
Form.defaultProps = {
  // validateFirst: 'first',
}
export default Form
