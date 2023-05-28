import React from 'react'
import scopedClassMaker from "../classes"

export default function header() {
    const scopedClass = scopedClassMaker('yang-layout')

  return (
    <div className={scopedClass("layout-header")}>header</div>
  )
}
