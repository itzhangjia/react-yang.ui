import React, { ReactElement } from 'react'
import scopedClassMaker from '../classes'
import Sider from './sider'
interface Props extends React.HTMLAttributes<HTMLElement> {
  children: ReactElement | Array<ReactElement>
}
const Layout: React.FunctionComponent<Props> = (props) => {
  const scopedClass = scopedClassMaker('yang-layout')
  const { className, ...rest } = props
  let hasSider = false
  if ((props.children as Array<ReactElement>).length) {
   (props.children as Array<ReactElement>).map((item) => {
      if (item.type === Sider) {
        hasSider = true
      }
    })
  }

  return (
    <div
      className={scopedClass('', {
        extra: [className,hasSider&&'hasSider'].filter((item)=>item).join(' '),
      })}
      {...rest}
    >
      {props.children}
    </div>
  )
}
export default Layout
