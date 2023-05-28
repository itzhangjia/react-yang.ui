import React, { ReactElement } from 'react'
import ReactDom from 'react-dom'
import ReactDOM from 'react-dom';
import './dialog.scss'
import scopedClassMaker from '../classes'
import Icon from '../icon/icon'
interface Props {
  open: boolean
  onCancel: React.MouseEventHandler
  buttons?: ReactElement[]
  closeONclickMask?: boolean
}

const Dialog: React.FunctionComponent<Props> = (props) => {
  const onClickClose: React.MouseEventHandler = (e) => {
    props.onCancel(e)
  }
  const onClickCloseMask: React.MouseEventHandler = (e) => {
    if (props.closeONclickMask) {
      props.onCancel(e)
    }
  }
  const scopedClass = scopedClassMaker('yang-dialog')
  const content=props.open ? (
    <>
      <div className={scopedClass('mask')} onClick={onClickCloseMask}></div>
      <div className={scopedClass()}>
        <div className={scopedClass('close')} onClick={onClickClose}>
          <Icon name="close" />
        </div>
        <header className={scopedClass('header')}>提示</header>
        <main className={scopedClass('main')}>{props.children}</main>
        <footer className={scopedClass('footer')}>
          {props.buttons&&props.buttons.map((item, index) =>
            React.cloneElement(item, { key: index })
          )}
        </footer>
      </div>
    </>
  ) : null
  return ReactDom.createPortal(content,document.body)
}
export const alert=(content:string)=>{
    const component=<Dialog open={true} onCancel={()=>{
        ReactDom.render(React.cloneElement(component,{open:false}),targetDiv);
        ReactDom.unmountComponentAtNode(targetDiv)
        targetDiv.remove()
    }}>{content}</Dialog>
    const targetDiv=document.createElement("div")
    document.body.append(targetDiv)
    ReactDOM.render(component,targetDiv)
}
Dialog.defaultProps = {
  closeONclickMask: true,
}
export default Dialog
