import React from "react"
interface Props{
    value:{
        [key: string]:string
    }
    fields:Array<{name:string,label:string,input:{type:string}}>
}
const Form:React.FunctionComponent<Props>=(props)=>{
    console.log(props.fields);
    
 return    <form>
    {props.fields.map((item)=><div>
            {item.label}<input type={item.input.type}></input>
        </div>
    )}
 </form>
}

export default Form