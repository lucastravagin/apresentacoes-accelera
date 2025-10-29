import { motion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import AgentCard from './AgentCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback } from 'react'

type CarouselProps = {
  items: any[]
  options?: any
}

export default function Carousel({ items, options }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options || { loop: true, align: 'start' })

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  return (
    <div style={{ position: 'relative', maxWidth: '1200px', width: '100%' }}>
      <div ref={emblaRef} style={{ overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {items.map((item, i) => (
            <div key={i} style={{ flex: '0 0 400px', minWidth: 0 }}>
              <AgentCard {...item} />
            </div>
          ))}
        </div>
      </div>
      
      <button
        onClick={scrollPrev}
        style={{
          position: 'absolute',
          left: '-60px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(107, 67, 239, 0.2)',
          border: '1px solid var(--purple)',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--purple)'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(107, 67, 239, 0.2)'}
      >
        <ChevronLeft color="white" />
      </button>
      
      <button
        onClick={scrollNext}
        style={{
          position: 'absolute',
          right: '-60px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(107, 67, 239, 0.2)',
          border: '1px solid var(--purple)',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--purple)'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(107, 67, 239, 0.2)'}
      >
        <ChevronRight color="white" />
      </button>
    </div>
  )
}
