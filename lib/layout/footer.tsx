import React from 'react'
import scopedClassMaker from "../classes"
interface Props extends React.HTMLAttributes<HTMLElement>{

}
 const Footer:React.FunctionComponent<Props>=(props)=> {
    const scopedClass = scopedClassMaker('yang-layout')
  const {className,...rest}=props
  return (
    <div className={scopedClass("footer",{extra:className})} {...rest}>{props.children}</div>
  )
}
export default Footer