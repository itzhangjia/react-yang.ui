import React, {
  HTMLAttributes,
  MouseEventHandler,
  TouchEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react'
import './scroll.scss'
import scrollbarWidth from './scrollwidth'
interface Props extends HTMLAttributes<HTMLDivElement> {
    onPull?:()=>void
}
const Scroll: React.FunctionComponent<Props> = (props) => {
  const { children, ...rest } = props
  const [barHeight, setBarHeight] = useState(0)
  const [barTop, _setBarTop] = useState(0)
  const [barVisible, setBarVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const flagRef = useRef(false)
  const currentTopRef = useRef(0)
  const lastYRef = useRef(0);
  const moveCount = useRef(0);
  const pulling = useRef(false)
  const firstRef = useRef(0)
  const timerIdRef = useRef<number | null>(null)
  const [translateY, _setTranslateY] = useState(0);
  const setTranslateY = (y: number) => {
    if (y < 0) {y = 0;} else if (y > 150) {y = 150;}
    _setTranslateY(y);
  };
  const setBarTop = (top: number) => {
    if (top === 0) {
      return
    }
    if (top < 0) {
      top = 0
    }
    const scrollHeight = containerRef.current!.scrollHeight
    const viewHeight = containerRef.current!.getBoundingClientRect().height
    const barHeight = (viewHeight * viewHeight) / scrollHeight

    if (top > viewHeight - barHeight) {
      top = viewHeight - barHeight
    }
    _setBarTop(top)
  }
  const onScroll = () => {
    setBarVisible(true)
    const scrollHeight = containerRef.current!.scrollHeight
    const viewHeight = containerRef.current!.getBoundingClientRect().height
    const scrollTop = containerRef.current!.scrollTop
    setBarTop((scrollTop * viewHeight) / scrollHeight)
    timerIdRef.current = window.setTimeout(() => {
      window.clearTimeout(timerIdRef.current!)
      setBarVisible(false)
    }, 300)
  }

  const onMouseDown: MouseEventHandler = (e) => {
    flagRef.current = true
    firstRef.current = barTop
    currentTopRef.current = e.clientY
  }
  const onMouseMove = (e: MouseEvent) => {
    if (flagRef.current === true) {
      const offset = e.clientY - currentTopRef.current
      setBarTop(firstRef.current + offset)
      const scrollHeight = containerRef.current!.scrollHeight
      const viewHeight = containerRef.current!.getBoundingClientRect().height
      containerRef.current!.scrollTop =
        ((firstRef.current + offset) * scrollHeight) / viewHeight
    }
  }
  const onMouseUp = (e: MouseEvent) => {
    flagRef.current = false
  }
  const onSelectStart = (e: Event) => {
    if (flagRef.current) {
      e.preventDefault()
    }
  }
  const onTouchStart: TouchEventHandler = (e) => {
    const scrollTop = containerRef.current!.scrollTop;
    if (scrollTop !== 0) {return;}
    pulling.current = true;
    lastYRef.current = e.touches[0].clientY;
    moveCount.current = 0;
  };
  const onTouchMove: TouchEventHandler = (e) => {
    const deltaY = e.touches[0].clientY - lastYRef.current;
    
    moveCount.current += 1;
    if (moveCount.current === 1 && deltaY < 0) {
      pulling.current = false;
      return;
    }
    if (!pulling.current) {return;}
    setTranslateY(translateY + deltaY);
    lastYRef.current = e.touches[0].clientY;
  };
  const onTouchEnd: TouchEventHandler = () => {
    if (pulling.current) {
      setTranslateY(0);
      props.onPull && props.onPull();
      pulling.current = false;
    }
  };
  useEffect(() => {
    const scrollHeight = containerRef.current!.scrollHeight
    const viewHeight = containerRef.current!.getBoundingClientRect().height
    const barHeight = (viewHeight * viewHeight) / scrollHeight
    setBarHeight(barHeight)
  }, [])
  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('selectstart', onSelectStart)
    return () => {
      document.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('selectstart', onSelectStart)
      document.removeEventListener('mousemove', onMouseMove)
    }
  }, [])
  return (
    <div className="yang-scroll" {...rest}>
      <div
        className="yang-scroll-inner"
        style={{
          right: -scrollbarWidth(),
          transform: `translateY(${translateY}px)`,
        }}
        onScroll={onScroll}
        onTouchMove={onTouchMove}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        ref={containerRef}
      >
        {children}
      </div>
      <div
        className="yang-scroll-track"
        onMouseDown={onMouseDown}
        // onMouseMove={onMouseMove}
        // onMouseUp={onMouseUp}
      >
        {barVisible && (
          <div
            className="yang-scroll-bar"
            style={{ height: barHeight, transform: `translateY(${barTop}px)` }}
          ></div>
        )}
        
      </div>
      <div className="yang-scroll-pulling" style={{height: translateY}}>
        {translateY === 150 ?
          <span className="yang-scroll-pulling-text">释放手指即可更新</span> :
          <span className="yang-scroll-pulling-icon">↓</span>}
      </div>
    </div>
  )
}

export default Scroll
