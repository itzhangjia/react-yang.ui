import { useEffect, useState } from "react"

const useUpdates = (dep: any, fn: () => void) => {
    const [count, setCount] = useState(0)
    useEffect(() => {
        setCount(count + 1)
    }, [dep])
    useEffect(() => {
        fn()
    }, [count])
}
export default useUpdates