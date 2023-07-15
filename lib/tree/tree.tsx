import React, { useState } from 'react'
import scopedClassMaker from '../classes'
import './tree.scss'
export interface treedata {
  text: string
  value: string
  children?: treedata[]
}
type Props = {
  treeData: treedata[]
} & (
  | { selected: string[]; multiple: true; onChange: (item: string[]) => void }
  | { selected: string; multiple?: false; onChange: (item: string) => void }
)
const scopedClass = scopedClassMaker('yang-tree')

const Tree: React.FunctionComponent<Props> = (props) => {
  const renderTree = (item: treedata, level = 1) => {
    const [expand, setexpand] = useState(false)
    const classes = {
      ['level-' + level]: true,
      item: true,
    }
    const checked = props.multiple
      ? props.selected.includes(item.value)
      : props.selected === item.value
    const onExpand = () => {
      setexpand(true)
    }
    const onretract = () => {
      setexpand(false)
    }
    return (
      <div className={scopedClass(classes)} key={item.value}>
        <label className={scopedClass('text')}>
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(item, e.target.checked)}
          />
          {item.text}
          {item.children && (
            <>
              {expand && <span onClick={onretract}>-</span>}
              {!expand && <span onClick={onExpand}>+</span>}
            </>
          )}
        </label>
        <div className={scopedClass({ children: true, gone: !expand })}>
          {item.children &&
            item.children.map((item) => renderTree(item, level + 1))}
        </div>
      </div>
    )
  }
  const onChange = (item: treedata, value: boolean) => {
    if (props.multiple) {
      if (value) {
        props.onChange([...props.selected, item.value])
      } else {
        props.onChange(
          props.selected.filter((i) => {
            return i !== item.value
          })
        )
      }
    } else {
      props.onChange(item.value)
    }
  }
  return (
    <div>
      {props.treeData.map((item) => {
        return renderTree(item)
      })}
    </div>
  )
}
export default Tree
