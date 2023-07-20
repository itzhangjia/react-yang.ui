import { useEffect, useRef } from "react"

const useUpdates = (dep: any, fn: () => void) => {
    const isFirst = useRef(true)
    useEffect(() => {
        if (isFirst.current) {
            isFirst.current = false
            return
        }
        fn()
    }, [dep])
}
export default useUpdates