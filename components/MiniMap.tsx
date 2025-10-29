type MiniMapProps = {
  sections: any[]
  currentId: string
}

export default function MiniMap({ sections, currentId }: MiniMapProps) {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="minimap">
      {sections.map((section) => (
        <div
          key={section.id}
          className={`minimap-item ${currentId === section.id ? 'active' : ''}`}
          onClick={() => scrollToSection(section.id)}
          title={section.header?.title || section.id}
        />
      ))}
    </div>
  )
}
