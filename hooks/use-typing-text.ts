import { useEffect, useState } from "react"

interface UseTypingTextProps {
  text: string
  speed?: number
  delay?: number
}

export function useTypingText({
  text,
  speed = 60,
  delay = 0,
}: UseTypingTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    if (!text) return

    let index = 0
    let typingInterval: NodeJS.Timeout
    let delayTimeout: NodeJS.Timeout

    setDisplayText("")
    setIsDone(false)

    delayTimeout = setTimeout(() => {
      typingInterval = setInterval(() => {
        index++

        setDisplayText(text.slice(0, index))

        if (index === text.length) {
          clearInterval(typingInterval)
          setIsDone(true)
        }
      }, speed)
    }, delay)

    return () => {
      clearTimeout(delayTimeout)
      clearInterval(typingInterval)
    }
  }, [text, speed, delay])

  return { displayText, isDone }
}
