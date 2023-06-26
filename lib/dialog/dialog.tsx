import React, { ReactElement, ReactNode } from 'react'
import ReactDOM from 'react-dom'
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
  const content = props.open ? (
    <>
      <div className={scopedClass('mask')} onClick={onClickCloseMask}></div>
      <div className={scopedClass("")}>
        <div className={scopedClass('close')} onClick={onClickClose}>
          <Icon name="close" />
        </div>
        <header className={scopedClass('header')}>提示</header>
        <main className={scopedClass('main')}>{props.children}</main>
        {props.buttons && props.buttons.length > 0 && (
          <footer className={scopedClass('footer')}>
            {props.buttons.map((item, index) =>
              React.cloneElement(item, { key: index })
            )}
          </footer>
        )}
      </div>
    </>
  ) : null
  return ReactDOM.createPortal(content, document.body)
}
export const Modal = (
  content: ReactNode,
  buttons?: ReactElement[],
  afterClose?: () => void
) => {
  const onCancel = () => {
    ReactDOM.render(React.cloneElement(component, { open: false }), targetDiv)
    ReactDOM.unmountComponentAtNode(targetDiv)
    targetDiv.remove()
  }
  const component = (
    <Dialog
      open={true}
      onCancel={()=>{onCancel();afterClose&&afterClose()}}
      buttons={buttons}
    >
      {content}
    </Dialog>
  )
  const targetDiv = document.createElement('div')
  document.body.append(targetDiv)
  ReactDOM.render(component, targetDiv)
  return onCancel
}
export const alert = (content: string) => {
  const button = <button onClick={() => onCancel()}>确定</button>
  const onCancel = Modal(content, [button])
}
export const confirm = (content: string, yes: () => void, no: () => void) => {
  const onYes = () => {
    close()
    yes && yes()
  }
  const onNo = () => {
    close()
    no && no()
  }
  const buttons = [
    <button onClick={onYes}>yes</button>,
    <button onClick={onNo}>no</button>,
  ]
  const close = Modal(content, buttons, no)
}
Dialog.defaultProps = {
  closeONclickMask: true,
}
export default Dialog
