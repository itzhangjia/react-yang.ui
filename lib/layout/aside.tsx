import React from 'react'
import scopedClassMaker from "../classes"

export default function aside() {
    const scopedClass = scopedClassMaker('yang-layout')

  return (
    <div className={scopedClass("layout-aside")}>aside</div>
  )
}
