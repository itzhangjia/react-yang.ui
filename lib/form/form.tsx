import React, {   } from 'react'
interface Props {
  value: {
    [key: string]: string
  }
  fields: Array<{ name: string; label: string; input: { type: string } }>
  buttons:any
}
const Form: React.FunctionComponent<Props> = (props) => {

  return (
    <form>
      {props.fields.map((item) => (
        <div>
          {item.label}
          <input type={item.input.type}></input>
        </div>
      ))}
      <div>
        {props.buttons}
      </div>
    </form>
  )
}

export default Form
