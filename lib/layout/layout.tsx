import React from 'react'
import scopedClassMaker from "../classes"
interface Props extends React.HTMLAttributes<HTMLElement>{

}
 const Layout:React.FunctionComponent<Props> =(props)=> {
    const scopedClass = scopedClassMaker('yang-layout')
    const {className,...restProps}=props
  return (
    <div className={scopedClass("",{extra:className})} {...restProps}>{props.children}</div>
  )
}
export default Layout