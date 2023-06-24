import React, { ReactElement } from 'react'
import scopedClassMaker from '../classes'
import Sider from './sider'
interface Props extends React.HTMLAttributes<HTMLElement> {
  children: ReactElement | Array<ReactElement>
}
const Layout: React.FunctionComponent<Props> = (props) => {
  const scopedClass = scopedClassMaker('yang-layout')
  const { className, ...rest } = props
  // let hasSider = false
  // if ((props.children as Array<ReactElement>).length) {
  //  (props.children as Array<ReactElement>).map((item) => {
  //     if (item.type === Sider) {
  //       hasSider = true
  //     }
  //   })
  // }
  const children=props.children as Array<ReactElement>
  const hasSider=children.some((item)=>item.type==Sider)

  return (
    <div
      className={scopedClass({"":true,hasSider:hasSider}, {
        extra: className,
      })}
      {...rest}
    >
      {props.children}
    </div>
  )
}
export default Layout
export {Layout};
export {default as Header} from './header';
export {default as Content} from './content';
export {default as Footer} from './footer';
export {default as Sider} from './sider';
