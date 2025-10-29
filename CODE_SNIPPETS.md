# Reusable Code Snippets and Examples

This document contains ready-to-use code snippets for implementing similar navigation patterns in other projects.

---

## 1. Global Keyboard Navigation Hook

### `useKeyboardNavigation.ts`

```typescript
import { useEffect, useState } from 'react'

interface UseKeyboardNavigationProps {
  items: any[]
  currentIndex: number
  onNavigate: (index: number) => void
  circular?: boolean
}

export function useKeyboardNavigation({
  items,
  currentIndex,
  onNavigate,
  circular = true
}: UseKeyboardNavigationProps) {
  const [showFeedback, setShowFeedback] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault()

        let nextIndex: number

        if (e.key === 'ArrowUp') {
          if (circular) {
            nextIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1
          } else {
            nextIndex = Math.max(0, currentIndex - 1)
          }
        } else {
          if (circular) {
            nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0
          } else {
            nextIndex = Math.min(items.length - 1, currentIndex + 1)
          }
        }

        onNavigate(nextIndex)

        // Show visual feedback
        setShowFeedback(true)
        setTimeout(() => setShowFeedback(false), 2000)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex, items.length, onNavigate, circular])

  return { showFeedback }
}
```

### Usage Example:

```typescript
'use client'

import { useState } from 'react'
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation'

export default function MyComponent() {
  const [activeIndex, setActiveIndex] = useState(0)
  const sections = ['Section 1', 'Section 2', 'Section 3']

  const { showFeedback } = useKeyboardNavigation({
    items: sections,
    currentIndex: activeIndex,
    onNavigate: (index) => {
      setActiveIndex(index)
      // Scroll to section or perform action
    },
    circular: true
  })

  return (
    <div>
      {showFeedback && <div className="keyboard-hint">↑↓</div>}
      {/* Rest of your component */}
    </div>
  )
}
```

---

## 2. Custom Scrollbar Styles (Reusable)

### `scrollbar.css`

```css
/* Global scrollbar styles */
* {
  scrollbar-width: thin;
  scrollbar-color: var(--scroll-thumb) var(--scroll-track);
}

*::-webkit-scrollbar {
  width: var(--scrollbar-width, 10px);
  height: var(--scrollbar-height, 10px);
}

*::-webkit-scrollbar-track {
  background: var(--scroll-track, rgba(255, 255, 255, 0.05));
  border-radius: var(--scrollbar-radius, 5px);
  margin: var(--scrollbar-margin, 2px);
}

*::-webkit-scrollbar-thumb {
  background: var(--scroll-thumb, linear-gradient(135deg, #6b43ef, #4620b7));
  border-radius: var(--scrollbar-radius, 5px);
  border: var(--scrollbar-border, 2px solid rgba(12, 12, 12, 0.3));
  transition: all var(--scrollbar-transition, 0.3s ease);
}

*::-webkit-scrollbar-thumb:hover {
  background: var(--scroll-thumb-hover, linear-gradient(135deg, #4620b7, #5b21b6));
  box-shadow: var(--scrollbar-hover-shadow, 0 0 10px rgba(107, 67, 239, 0.5));
}

*::-webkit-scrollbar-corner {
  background: var(--scroll-corner, rgba(12, 12, 12, 0.95));
}

/* Scrollbar variants */
.scrollbar-thin {
  --scrollbar-width: 6px;
  --scrollbar-height: 6px;
}

.scrollbar-thick {
  --scrollbar-width: 14px;
  --scrollbar-height: 14px;
}

.scrollbar-green {
  --scroll-thumb: linear-gradient(135deg, #22c55e, #16a34a);
  --scroll-thumb-hover: linear-gradient(135deg, #16a34a, #15803d);
  --scrollbar-hover-shadow: 0 0 10px rgba(34, 197, 94, 0.5);
}

.scrollbar-blue {
  --scroll-thumb: linear-gradient(135deg, #3b82f6, #2563eb);
  --scroll-thumb-hover: linear-gradient(135deg, #2563eb, #1d4ed8);
  --scrollbar-hover-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
}

/* Hide scrollbar but keep functionality */
.scrollbar-hidden {
  scrollbar-width: none;
}

.scrollbar-hidden::-webkit-scrollbar {
  display: none;
}
```

### Usage in HTML:

```html
<!-- Default branded scrollbar -->
<div class="content">...</div>

<!-- Thin scrollbar -->
<div class="content scrollbar-thin">...</div>

<!-- Green scrollbar -->
<div class="content scrollbar-green">...</div>

<!-- Hidden scrollbar -->
<div class="content scrollbar-hidden">...</div>
```

---

## 3. Horizontal Tooltip Component

### `HorizontalTooltip.tsx`

```typescript
'use client'

import React from 'react'

interface HorizontalTooltipProps {
  number?: number
  text: string
  isActive?: boolean
  isVisible?: boolean
  position?: 'left' | 'right'
}

export function HorizontalTooltip({
  number,
  text,
  isActive = false,
  isVisible = false,
  position = 'left'
}: HorizontalTooltipProps) {
  return (
    <div
      className={`
        horizontal-tooltip
        horizontal-tooltip-${position}
        ${isVisible ? 'visible' : ''}
        ${isActive ? 'active' : ''}
      `}
    >
      {number !== undefined && (
        <span className="horizontal-tooltip-number">{number}</span>
      )}
      <span className="horizontal-tooltip-text">{text}</span>
    </div>
  )
}
```

### Styles (`horizontal-tooltip.css`):

```css
.horizontal-tooltip {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: linear-gradient(135deg, rgba(12, 12, 12, 0.98), rgba(23, 22, 45, 0.95));
  backdrop-filter: blur(20px);
  color: white;
  padding: 0.75rem 1.25rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid rgba(107, 67, 239, 0.3);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 200px;
  z-index: 10;
}

.horizontal-tooltip-left {
  right: calc(100% + 1.5rem);
}

.horizontal-tooltip-right {
  left: calc(100% + 1.5rem);
}

.horizontal-tooltip.visible {
  opacity: 1;
}

.horizontal-tooltip-left.visible {
  transform: translateY(-50%) translateX(-12px);
}

.horizontal-tooltip-right.visible {
  transform: translateY(-50%) translateX(12px);
}

.horizontal-tooltip.active {
  border-color: #6b43ef;
  box-shadow: 0 8px 32px rgba(107, 67, 239, 0.5);
}

.horizontal-tooltip.active .horizontal-tooltip-text {
  color: #6b43ef;
}

.horizontal-tooltip-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: linear-gradient(135deg, #6b43ef, #4620b7);
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 700;
  color: white;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(107, 67, 239, 0.4);
}

.horizontal-tooltip-text {
  flex: 1;
  line-height: 1.2;
}

/* Arrow pointer for left position */
.horizontal-tooltip-left::after {
  content: '';
  position: absolute;
  right: -10px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 10px solid rgba(23, 22, 45, 0.95);
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
}

.horizontal-tooltip-left::before {
  content: '';
  position: absolute;
  right: -12px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 12px solid rgba(107, 67, 239, 0.3);
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
}

/* Arrow pointer for right position */
.horizontal-tooltip-right::after {
  content: '';
  position: absolute;
  left: -10px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-right: 10px solid rgba(23, 22, 45, 0.95);
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
}

.horizontal-tooltip-right::before {
  content: '';
  position: absolute;
  left: -12px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-right: 12px solid rgba(107, 67, 239, 0.3);
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
}
```

### Usage Example:

```typescript
import { HorizontalTooltip } from './components/HorizontalTooltip'

function NavigationItem() {
  const [isHovered, setIsHovered] = useState(false)
  const [isActive, setIsActive] = useState(false)

  return (
    <div
      className="nav-item"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="nav-dot" />
      <HorizontalTooltip
        number={1}
        text="Introduction"
        isActive={isActive}
        isVisible={isHovered || isActive}
        position="left"
      />
    </div>
  )
}
```

---

## 4. Smooth Scroll Utility

### `smoothScroll.ts`

```typescript
interface SmoothScrollOptions {
  behavior?: ScrollBehavior
  block?: ScrollLogicalPosition
  inline?: ScrollLogicalPosition
  offset?: number
}

export function smoothScrollTo(
  elementId: string,
  options: SmoothScrollOptions = {}
) {
  const {
    behavior = 'smooth',
    block = 'start',
    inline = 'nearest',
    offset = 0
  } = options

  const element = document.getElementById(elementId)

  if (!element) {
    console.warn(`Element with id "${elementId}" not found`)
    return
  }

  if (offset === 0) {
    // Standard scroll
    element.scrollIntoView({ behavior, block, inline })
  } else {
    // Scroll with offset
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset

    window.scrollTo({
      top: offsetPosition,
      behavior
    })
  }
}

// Alternative: Scroll to element with callback
export function smoothScrollToWithCallback(
  elementId: string,
  callback?: () => void,
  options: SmoothScrollOptions = {}
) {
  smoothScrollTo(elementId, options)

  if (callback) {
    // Estimate scroll duration based on distance
    const element = document.getElementById(elementId)
    if (element) {
      const distance = Math.abs(
        element.getBoundingClientRect().top
      )
      const duration = Math.min(distance / 2, 1000) // Max 1s

      setTimeout(callback, duration)
    }
  }
}

// Check if element is in viewport
export function isInViewport(elementId: string): boolean {
  const element = document.getElementById(elementId)
  if (!element) return false

  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}
```

### Usage:

```typescript
import { smoothScrollTo, smoothScrollToWithCallback } from './utils/smoothScroll'

// Basic scroll
smoothScrollTo('section-2')

// Scroll with offset (for fixed headers)
smoothScrollTo('section-2', { offset: 80 })

// Scroll with callback
smoothScrollToWithCallback('section-2', () => {
  console.log('Scroll complete!')
  // Update state, analytics, etc.
})

// Check if section is visible
if (isInViewport('section-2')) {
  // Do something
}
```

---

## 5. Animated Badge Component

### `AnimatedBadge.tsx`

```typescript
'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface AnimatedBadgeProps {
  isVisible: boolean
  children: React.ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
  variant?: 'purple' | 'green' | 'blue' | 'red'
}

export function AnimatedBadge({
  isVisible,
  children,
  position = 'top',
  variant = 'purple'
}: AnimatedBadgeProps) {
  const variants = {
    top: {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: -8 },
      exit: { opacity: 0, y: 10 }
    },
    bottom: {
      initial: { opacity: 0, y: -10 },
      animate: { opacity: 1, y: 8 },
      exit: { opacity: 0, y: -10 }
    },
    left: {
      initial: { opacity: 0, x: 10 },
      animate: { opacity: 1, x: -8 },
      exit: { opacity: 0, x: 10 }
    },
    right: {
      initial: { opacity: 0, x: -10 },
      animate: { opacity: 1, x: 8 },
      exit: { opacity: 0, x: -10 }
    }
  }

  const colorVariants = {
    purple: 'linear-gradient(135deg, #6b43ef, #4620b7)',
    green: 'linear-gradient(135deg, #22c55e, #16a34a)',
    blue: 'linear-gradient(135deg, #3b82f6, #2563eb)',
    red: 'linear-gradient(135deg, #ef4444, #dc2626)'
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`animated-badge animated-badge-${position}`}
          initial={variants[position].initial}
          animate={variants[position].animate}
          exit={variants[position].exit}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{ background: colorVariants[variant] }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

### Styles (`animated-badge.css`):

```css
.animated-badge {
  position: absolute;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 1000;
  pointer-events: none;
}

.animated-badge-top {
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

.animated-badge-bottom {
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.animated-badge-left {
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}

.animated-badge-right {
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
```

### Usage:

```typescript
import { AnimatedBadge } from './components/AnimatedBadge'
import { ChevronUp, ChevronDown } from 'lucide-react'

function MyComponent() {
  const [showBadge, setShowBadge] = useState(false)

  return (
    <div style={{ position: 'relative' }}>
      <AnimatedBadge
        isVisible={showBadge}
        position="top"
        variant="purple"
      >
        <ChevronUp size={16} />
        <ChevronDown size={16} />
      </AnimatedBadge>

      <button onClick={() => {
        setShowBadge(true)
        setTimeout(() => setShowBadge(false), 2000)
      }}>
        Show Badge
      </button>
    </div>
  )
}
```

---

## 6. Pulse Animation Component

### `PulseRing.tsx`

```typescript
'use client'

interface PulseRingProps {
  color?: string
  size?: number
  duration?: number
}

export function PulseRing({
  color = '#6b43ef',
  size = 20,
  duration = 2
}: PulseRingProps) {
  return (
    <div
      className="pulse-ring"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderColor: color,
        animationDuration: `${duration}s`
      }}
    />
  )
}
```

### Styles:

```css
.pulse-ring {
  position: absolute;
  border: 2px solid;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  animation: pulse-animation ease-in-out infinite;
}

@keyframes pulse-animation {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.8;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 0;
  }
}
```

### Usage:

```typescript
import { PulseRing } from './components/PulseRing'

function ActiveIndicator() {
  return (
    <div style={{ position: 'relative', width: '40px', height: '40px' }}>
      <div className="dot" />
      <PulseRing color="#6b43ef" size={60} duration={2} />
    </div>
  )
}
```

---

## 7. Intersection Observer Hook

### `useIntersectionObserver.ts`

```typescript
import { useEffect, useState, useRef } from 'react'

interface UseIntersectionObserverOptions {
  threshold?: number | number[]
  root?: Element | null
  rootMargin?: string
}

export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)
  const targetRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const target = targetRef.current
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
        setEntry(entry)
      },
      {
        threshold: options.threshold ?? 0.1,
        root: options.root ?? null,
        rootMargin: options.rootMargin ?? '0px'
      }
    )

    observer.observe(target)

    return () => {
      observer.unobserve(target)
    }
  }, [options.threshold, options.root, options.rootMargin])

  return { targetRef, isIntersecting, entry }
}
```

### Usage for Auto-Active Section:

```typescript
import { useIntersectionObserver } from './hooks/useIntersectionObserver'

function Section({ id, onVisible }: { id: string, onVisible: () => void }) {
  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.5
  })

  useEffect(() => {
    if (isIntersecting) {
      onVisible()
    }
  }, [isIntersecting, onVisible])

  return (
    <section ref={targetRef} id={id}>
      {/* Section content */}
    </section>
  )
}

// In parent component
function Page() {
  const [activeSection, setActiveSection] = useState('section-1')

  return (
    <>
      <Section id="section-1" onVisible={() => setActiveSection('section-1')} />
      <Section id="section-2" onVisible={() => setActiveSection('section-2')} />
      <MiniMap activeSection={activeSection} />
    </>
  )
}
```

---

## 8. Debounced Event Handler

### `useDebounce.ts`

```typescript
import { useEffect, useState } from 'react'

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// Alternative: Debounced function
export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return ((...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args)
    }, delay)
  }) as T
}
```

### Usage:

```typescript
import { useDebounce, useDebouncedCallback } from './hooks/useDebounce'

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  useEffect(() => {
    if (debouncedSearchTerm) {
      // Perform search
      console.log('Searching for:', debouncedSearchTerm)
    }
  }, [debouncedSearchTerm])

  return (
    <input
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  )
}

// With callback
function ScrollComponent() {
  const handleScroll = useDebouncedCallback(() => {
    console.log('Scrolled!')
    // Update active section, etc.
  }, 150)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return <div>{/* Content */}</div>
}
```

---

## 9. Complete MiniMap Component (Standalone)

### `StandaloneMiniMap.tsx`

```typescript
'use client'

import { useEffect, useState } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'

interface Section {
  id: string
  title: string
}

interface StandaloneMiniMapProps {
  sections: Section[]
  onNavigate?: (sectionId: string) => void
}

export function StandaloneMiniMap({
  sections,
  onNavigate
}: StandaloneMiniMapProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id || '')
  const [showHint, setShowHint] = useState(false)

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault()

        const currentIndex = sections.findIndex(s => s.id === activeId)
        let nextIndex: number

        if (e.key === 'ArrowUp') {
          nextIndex = currentIndex > 0 ? currentIndex - 1 : sections.length - 1
        } else {
          nextIndex = currentIndex < sections.length - 1 ? currentIndex + 1 : 0
        }

        const nextSection = sections[nextIndex]
        handleNavigate(nextSection.id)

        setShowHint(true)
        setTimeout(() => setShowHint(false), 2000)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeId, sections])

  // Auto-detect active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3

      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveId(section.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  const handleNavigate = (id: string) => {
    setActiveId(id)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    onNavigate?.(id)
  }

  return (
    <nav className="minimap" aria-label="Section navigation">
      {showHint && (
        <div className="minimap-hint">
          <ChevronUp size={16} />
          <ChevronDown size={16} />
        </div>
      )}

      {sections.map((section, index) => (
        <button
          key={section.id}
          className={`minimap-dot ${activeId === section.id ? 'active' : ''}`}
          onClick={() => handleNavigate(section.id)}
          aria-label={`Navigate to ${section.title}`}
          aria-current={activeId === section.id ? 'true' : 'false'}
        >
          <span className="minimap-tooltip">
            <span className="minimap-number">{index + 1}</span>
            <span className="minimap-text">{section.title}</span>
          </span>
        </button>
      ))}

      <div className="minimap-help">
        <ChevronUp size={12} />
        <ChevronDown size={12} />
        <span>Use arrows</span>
      </div>
    </nav>
  )
}
```

### Usage:

```typescript
import { StandaloneMiniMap } from './components/StandaloneMiniMap'

function App() {
  const sections = [
    { id: 'intro', title: 'Introduction' },
    { id: 'features', title: 'Features' },
    { id: 'pricing', title: 'Pricing' },
    { id: 'contact', title: 'Contact' }
  ]

  return (
    <>
      <StandaloneMiniMap
        sections={sections}
        onNavigate={(id) => console.log('Navigated to:', id)}
      />

      <section id="intro">{/* Content */}</section>
      <section id="features">{/* Content */}</section>
      <section id="pricing">{/* Content */}</section>
      <section id="contact">{/* Content */}</section>
    </>
  )
}
```

---

## 10. Testing Utilities

### `navigationTestUtils.ts`

```typescript
import { fireEvent } from '@testing-library/react'

export const navigationTestUtils = {
  // Simulate arrow key press
  pressArrowUp: () => {
    fireEvent.keyDown(window, { key: 'ArrowUp', code: 'ArrowUp' })
  },

  pressArrowDown: () => {
    fireEvent.keyDown(window, { key: 'ArrowDown', code: 'ArrowDown' })
  },

  // Check if element is in viewport
  isInViewport: (element: HTMLElement): boolean => {
    const rect = element.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= window.innerHeight &&
      rect.right <= window.innerWidth
    )
  },

  // Simulate scroll to element
  scrollToElement: (element: HTMLElement) => {
    element.scrollIntoView = jest.fn()
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  },

  // Wait for scroll animation
  waitForScroll: (ms: number = 500): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}
```

### Usage in Tests:

```typescript
import { render, screen } from '@testing-library/react'
import { navigationTestUtils } from './utils/navigationTestUtils'
import MiniMap from './components/MiniMap'

describe('MiniMap Navigation', () => {
  it('navigates with arrow keys', async () => {
    const sections = [
      { id: 'section-1', title: 'Section 1' },
      { id: 'section-2', title: 'Section 2' }
    ]

    render(<MiniMap sections={sections} currentId="section-1" />)

    // Press down arrow
    navigationTestUtils.pressArrowDown()

    // Wait for scroll
    await navigationTestUtils.waitForScroll()

    // Check if section 2 is active
    const section2Dot = screen.getByLabelText(/Section 2/i)
    expect(section2Dot).toHaveClass('active')
  })

  it('shows keyboard hint on navigation', () => {
    const { container } = render(
      <MiniMap sections={[...]} currentId="section-1" />
    )

    navigationTestUtils.pressArrowDown()

    const hint = container.querySelector('.minimap-keyboard-hint')
    expect(hint).toHaveClass('visible')
  })
})
```

---

These code snippets provide a complete, production-ready implementation that can be easily adapted to different projects and frameworks. Each snippet is modular, well-typed, and follows best practices for performance and accessibility.
