import React, { useEffect } from 'react'

function useOnline(n) {
    const [isOnline, setIsOnline] = React.useState(window.navigator.onLine)
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    useEffect(() => {
        window.addEventListener('online', handleOnline)
        window.addEventListener('offline', handleOffline)
        return () => {
            window.removeEventListener('online', handleOnline)
            window.removeEventListener('offline', handleOffline)
        }
    }, [])
    useEffect(() => {
        const interval = setInterval(() => {
            setIsOnline(window.navigator.onLine)
        }, n * 1000)
        return () => clearInterval(interval)
    }, [n])
    return isOnline
}

export default useOnline