import React from 'react'
import TreeItem from "./treeItem"
import './tree.scss'
export interface treedata {
  text: string
  value: string
  children?: treedata[]
}

const Tree: React.FunctionComponent<TreeProps> = (props) => {

  return (
    <div>
      {props.treeData.map((item) => {
        return <TreeItem key={item.value} treeProps={props} item={item} level={1} />
      })}
    </div>
  )
}
export default Tree
