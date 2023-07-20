import React, { useState } from 'react'
import Tree from './tree'

const treeData = [
  {
    text: '1',
    value: '1',
    children: [
      {
        text: '1.1',
        value: '1.1',
        children: [
          { text: '1.1.1', value: '1.1.1' },
          { text: '1.1.2', value: '1.1.2' },
        ],
      },
      { text: '1.2', value: '1.2' },
    ],
  },
  {
    text: '11',
    value: '11',
  },
  {
    text: '2',
    value: '2',
    children: [
      { text: '2.1', value: '2.1' },
      { text: '2.2', value: '2.2' },
    ],
  },
]
export default () => {
  const [selectedValues, setSelectedValues] = useState(["1"])
  // const onChange = (item: treedata, value: boolean) => {
  //   console.log(item, value)
  //   if (value) {
  //     console.log([...selectedValues, item.value])

  //     setSelectedValues([...selectedValues, item.value])
  //   } else {
  //     setSelectedValues((v) => {
  //       return v.filter((i) => {
  //         return i !== item.value
  //       })
  //     })
  //   }
  // }
  return (
    <div style={{ width: 300 }}>
      tree
      <h1>展示数据</h1>
      <Tree
        treeData={treeData}
        selected={selectedValues}
        multiple={true}
        onChange={(values: string[]) => setSelectedValues(values)}
      ></Tree>
    </div>
  )
}
