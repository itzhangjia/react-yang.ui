import React from 'react'
import TreeItem from "./treeItem"
import './tree.scss'
export interface treedata {
  text: string
  value: string
  children?: treedata[]
}

const Tree: React.FunctionComponent<TreeProps> = (props) => {
  const onItemChange = (values: string[] | string) => {
    if (props.multiple) {
      props.onChange(Array.from(new Set(values)) as string[]);
    } else {
      props.onChange(values as string);
    }
  };
  return (
    <div>
      {props.treeData.map((item) => {
        return <TreeItem onItemChange={onItemChange} key={item.value} treeProps={props} item={item} level={1} />
      })}
    </div>
  )
}
export default Tree
