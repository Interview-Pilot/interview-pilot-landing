'use client'

import { Box } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'

interface Circle {
  x: number
  y: number
  translateX: number
  translateY: number
  size: number
  alpha: number
  targetAlpha: number
  dx: number
  dy: number
  magnetism: number
}

interface ParticleBackgroundProps {
  color?: string
  quantity?: number
  staticity?: number
  ease?: number
}

function hexToRgb(color: string) {
  let hex = color.replace(/^#/, '')

  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('')
  }

  const value = Number.parseInt(hex, 16)

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  }
}

function remapValue(value: number, start1: number, end1: number, start2: number, end2: number) {
  const remapped = ((value - start1) * (end2 - start2)) / (end1 - start1) + start2
  return remapped > 0 ? remapped : 0
}

export function ParticleBackground({
  color = '#F5EEDD',
  quantity = 90,
  staticity = 50,
  ease = 26,
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const circlesRef = useRef<Circle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const sizeRef = useRef({ w: 0, h: 0 })
  const frameRef = useRef(0)
  const colorRef = useRef(hexToRgb(color))

  useEffect(() => {
    colorRef.current = hexToRgb(color)
  }, [color])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    const context = canvas?.getContext('2d')
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!canvas || !container || !context || prefersReducedMotion) return

    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
    const frameInterval = 1000 / 30
    let lastFrame = 0

    const getParticleCount = () => (window.matchMedia('(max-width: 767px)').matches ? 45 : quantity)

    const createCircle = (): Circle => {
      const { w, h } = sizeRef.current

      return {
        x: Math.floor(Math.random() * w),
        y: Math.floor(Math.random() * h),
        translateX: 0,
        translateY: 0,
        size: Math.random() * 2.4 + 0.8,
        alpha: 0,
        targetAlpha: Number.parseFloat((Math.random() * 0.3 + 0.06).toFixed(2)),
        dx: (Math.random() - 0.5) * 0.56,
        dy: (Math.random() - 0.5) * 0.56,
        magnetism: 0.1 + Math.random() * 4,
      }
    }

    const clear = () => {
      context.clearRect(0, 0, sizeRef.current.w, sizeRef.current.h)
    }

    const drawCircle = (circle: Circle) => {
      const { r, g, b } = colorRef.current

      context.translate(circle.translateX, circle.translateY)
      context.beginPath()
      context.arc(circle.x, circle.y, circle.size, 0, 2 * Math.PI)
      context.fillStyle = `rgba(${r}, ${g}, ${b}, ${circle.alpha})`
      context.fill()
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    }

    const resize = () => {
      const nextWidth = container.offsetWidth
      const nextHeight = container.offsetHeight
      const currentSize = sizeRef.current
      const widthChanged = Math.abs(nextWidth - currentSize.w) > 8
      const heightChanged = Math.abs(nextHeight - currentSize.h) > 80

      if (currentSize.w > 0 && !widthChanged && !heightChanged) return

      circlesRef.current = []
      sizeRef.current = {
        w: nextWidth,
        h: nextHeight,
      }
      canvas.width = sizeRef.current.w * pixelRatio
      canvas.height = sizeRef.current.h * pixelRatio
      canvas.style.width = `${sizeRef.current.w}px`
      canvas.style.height = `${sizeRef.current.h}px`
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      clear()

      for (let index = 0; index < getParticleCount(); index += 1) {
        circlesRef.current.push(createCircle())
      }
    }

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const { w, h } = sizeRef.current
      const x = event.clientX - rect.left - w / 2
      const y = event.clientY - rect.top - h / 2

      if (x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2) {
        mouseRef.current = { x, y }
      }
    }

    const animate = (timestamp = 0) => {
      frameRef.current = window.requestAnimationFrame(animate)

      if (timestamp - lastFrame < frameInterval) return
      lastFrame = timestamp

      clear()

      circlesRef.current.forEach((circle, index) => {
        const edge = [
          circle.x + circle.translateX - circle.size,
          sizeRef.current.w - circle.x - circle.translateX - circle.size,
          circle.y + circle.translateY - circle.size,
          sizeRef.current.h - circle.y - circle.translateY - circle.size,
        ]
        const closestEdge = edge.reduce((a, b) => Math.min(a, b))
        const edgeAlpha = Number.parseFloat(remapValue(closestEdge, 0, 20, 0, 1).toFixed(2))

        if (edgeAlpha > 1) {
          circle.alpha += 0.02
          if (circle.alpha > circle.targetAlpha) circle.alpha = circle.targetAlpha
        } else {
          circle.alpha = circle.targetAlpha * edgeAlpha
        }

        circle.x += circle.dx
        circle.y += circle.dy
        circle.translateX +=
          (mouseRef.current.x / (staticity / circle.magnetism) - circle.translateX) / ease
        circle.translateY +=
          (mouseRef.current.y / (staticity / circle.magnetism) - circle.translateY) / ease

        if (
          circle.x < -circle.size ||
          circle.x > sizeRef.current.w + circle.size ||
          circle.y < -circle.size ||
          circle.y > sizeRef.current.h + circle.size
        ) {
          circlesRef.current[index] = createCircle()
        } else {
          drawCircle(circle)
        }
      })

    }

    resize()
    animate()

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.cancelAnimationFrame(frameRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [ease, quantity, staticity])

  return (
    <Box ref={containerRef} position="absolute" inset={0} aria-hidden="true">
      <canvas ref={canvasRef} />
    </Box>
  )
}
