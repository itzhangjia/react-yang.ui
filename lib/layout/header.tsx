import React from 'react'
import scopedClassMaker from "../classes"
interface Props extends React.HTMLAttributes<HTMLElement>{

}
 const Header:React.FunctionComponent<Props>=(props)=> {
    const scopedClass = scopedClassMaker('yang-layout')
  const {className,...rest}=props
  return (
    <div className={scopedClass("header",{extra:className})} {...rest}>{props.children}</div>
  )
}
export default Header