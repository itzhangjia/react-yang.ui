import React from 'react'
import scopedClassMaker from "../classes"

export default function footer() {
    const scopedClass = scopedClassMaker('yang-layout')

  return (
    <div className={scopedClass("layout-footer")}>footer</div>
  )
}
