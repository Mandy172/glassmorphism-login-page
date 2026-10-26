"use client"

import { useCallback, useRef } from "react"

const MAX_TILT_DEG = 9

export function useGlassTilt<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const frame = useRef<number | null>(null)

  const apply = useCallback((rx: number, ry: number, px: number, py: number, active: boolean) => {
    const node = ref.current
    if (!node) return
    if (frame.current !== null) cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      node.style.setProperty("--tilt-x", `${rx}deg`)
      node.style.setProperty("--tilt-y", `${ry}deg`)
      node.style.setProperty("--glare-x", `${px}%`)
      node.style.setProperty("--glare-y", `${py}%`)
      node.style.setProperty("--glare-opacity", active ? "1" : "0")
      node.dataset.tilting = active ? "true" : "false"
    })
  }, [])

  const onPointerMove = useCallback(
    (event: React.PointerEvent<T>) => {
      if (event.pointerType !== "mouse") return
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
      const rect = event.currentTarget.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width
      const y = (event.clientY - rect.top) / rect.height
      // Pressing into the corner under the cursor: that edge tips away from the viewer.
      const rotateY = (x - 0.5) * 2 * MAX_TILT_DEG
      const rotateX = (0.5 - y) * 2 * MAX_TILT_DEG
      apply(rotateX, rotateY, x * 100, y * 100, true)
    },
    [apply],
  )

  const onPointerLeave = useCallback(() => apply(0, 0, 50, 50, false), [apply])

  return { ref, onPointerMove, onPointerLeave }
}
