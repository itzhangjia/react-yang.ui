import React from 'react'
import scopedClassMaker from "../classes"

export default function content() {
    const scopedClass = scopedClassMaker('yang-layout')

  return (
    <div className={scopedClass("layout-content")}>content</div>
  )
}
