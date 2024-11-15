import { useState, useRef, useEffect } from "react"

export const useMetronome = (tempo: number, beatNumber: number) => {
    const [activeIndex, setActiveIndex] = useState<number>(-1)
    const [isActive, setIsActive] = useState<boolean>(false)
    const audioRef = useRef<HTMLAudioElement>(null)
    const timeoutIdRef = useRef<number | null>(null)
    const startTimeRef = useRef<number | null>(null)

    useEffect(() => {
        if (!isActive) return

        const interval = beatNumber <= 4 ? 60000 / tempo : 30000 / tempo

        const step = () => {
            const currentTime = performance.now()
            const elapsedTime = currentTime - (startTimeRef.current || currentTime)
            if (activeIndex < beatNumber - 1) {
                setActiveIndex((prev) => prev + 1)
            } else {
                setActiveIndex(0)
            }
            if (audioRef.current) {
                audioRef.current.currentTime = 0
                audioRef.current.play()
            }
            const nextTick = interval - (elapsedTime % interval)
            timeoutIdRef.current = window.setTimeout(step, nextTick)
        }

        startTimeRef.current = performance.now()
        timeoutIdRef.current = window.setTimeout(step, interval)

        return () => {
            if (timeoutIdRef.current) {
                clearTimeout(timeoutIdRef.current)
            }
        }
    }, [isActive, activeIndex, beatNumber, tempo])

    const handleStartStop = () => {
        setIsActive((prev) => !prev)
        if (isActive) {
            setActiveIndex(-1)
        }
    }

    return { activeIndex, handleStartStop, isActive, audioRef }
}