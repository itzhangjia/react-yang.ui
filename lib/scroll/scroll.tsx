import React, { HTMLAttributes, useEffect, useRef, useState } from 'react'
import "./scroll.scss"
import scrollbarWidth from './scrollwidth'
interface Props extends HTMLAttributes<HTMLDivElement>{

}
const  Scroll:React.FunctionComponent<Props>=(props)=> {
    const {children,...rest} = props
    const [barHeight,setBarHeight] =useState(0)
    const [barTop,setBarTop] =useState(0)
    const containerRef=useRef<HTMLDivElement>(null)
    const onScroll=()=>{
        const scrollHeight=containerRef.current!.scrollHeight;
        const viewHeight=containerRef.current!.getBoundingClientRect().height;
        const scrollTop=containerRef.current!.scrollTop
        setBarTop(scrollTop*viewHeight/scrollHeight)
    }
    useEffect(()=>{
        const scrollHeight=containerRef.current!.scrollHeight;
        const viewHeight=containerRef.current!.getBoundingClientRect().height;
        const barHeight=viewHeight*viewHeight/scrollHeight
        setBarHeight(barHeight)
    },[])
  return (
    <div className="yang-scroll" {...rest}>
        <div className="yang-scroll-inner" style={{right:-scrollbarWidth()}} onScroll={onScroll} ref={containerRef}>
            {children}
        </div>
        <div className="yang-scroll-track">
            <div className="yang-scroll-bar" style={{height:barHeight,top:barTop}}></div>
        </div>
    </div>
  )
}

export default Scroll
