import React from "react"
interface Props {
    code:string
}
const  Demo:React.FunctionComponent<Props>=(props)=>{
 return   <div>
        <div>{props.children}</div>
        <pre>{props.code}</pre>
    </div>
}
export default Demo