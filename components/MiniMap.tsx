'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

type MiniMapProps = {
  sections: any[]
  currentId: string
}

export default function MiniMap({ sections, currentId }: MiniMapProps) {
  const pathname = usePathname()
  const [activeSectionId, setActiveSectionId] = useState(currentId)

  useEffect(() => {
    setActiveSectionId(currentId)
  }, [currentId, pathname])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveSectionId(id)
    }
  }

  return (
    <div className="minimap">
      {sections.map((section) => {
        const isActive = activeSectionId === section.id
        const sectionTitle = section.header?.title || section.id

        return (
          <div
            key={section.id}
            className={`minimap-item ${isActive ? 'active' : ''}`}
            onClick={() => scrollToSection(section.id)}
            title={sectionTitle}
            role="button"
            aria-label={`Navegar para ${sectionTitle}`}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                scrollToSection(section.id)
              }
            }}
          >
            <div className="minimap-tooltip">{sectionTitle}</div>
          </div>
        )
      })}
    </div>
  )
}
