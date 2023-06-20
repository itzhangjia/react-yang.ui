import React from 'react'
import scopedClassMaker from "../classes"
interface Props extends React.HTMLAttributes<HTMLElement>{

}
 const Sider:React.FunctionComponent<Props>=(props)=> {
    const scopedClass = scopedClassMaker('yang-layout')
  const {className,...rest}=props
  return (
    <div className={scopedClass("sider",{extra:className})} {...rest}>sider</div>
  )
}
export default Sider