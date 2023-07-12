import React from 'react'

interface treedata{
    title:string,
    key :string,
    disabled?:boolean,
    disableCheckbox?:boolean,
    children?:treedata[]|any
}
interface Props {
    treeData:treedata[]
}
  const Tree:React.FunctionComponent<Props>=()=> {
  return (
    <div>tree</div>
  )
}
export default Tree