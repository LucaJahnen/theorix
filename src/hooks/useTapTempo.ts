import { useState, useRef } from "react"

export const useTapTempo = (setTempo: (tempo: number) => void) => {
    const [clicks, setClicks] = useState<number[]>([])
    const timeoutRef = useRef<number | null>(null)

    const handleTapTempo = () => {
        const now = Date.now()

        if (clicks.length === 0) {
            setClicks([now])
            return
        }

        const updatedClicks = [...clicks, now].slice(-5)
        setClicks(updatedClicks)

        if (updatedClicks.length > 1) {
            const intervals = updatedClicks
                .slice(1)
                .map((time, index) => time - updatedClicks[index])

            const avgInterval = intervals.reduce((a, b) => a + b) / intervals.length

            let bpm = Math.round(60000 / avgInterval)
            bpm = Math.max(40, Math.min(220, bpm))
            setTempo(bpm)
        }

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = window.setTimeout(() => {
            setClicks([])
        }, 3000)
    }

    return handleTapTempo
}