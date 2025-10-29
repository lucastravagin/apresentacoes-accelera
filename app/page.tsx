'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Section from '@/components/Section'
import AgentCard from '@/components/AgentCard'
import DocCard from '@/components/DocCard'
import Stepper from '@/components/Stepper'
import MetricBadge from '@/components/MetricBadge'
import MiniMap from '@/components/MiniMap'
import ProgressBar from '@/components/ProgressBar'
import HeroVisual from '@/components/HeroVisual'
import TimelineInteractive from '@/components/TimelineInteractive'
import PlatformDiagram from '@/components/PlatformDiagram'
import PlatformFeatures from '@/components/PlatformFeatures'
import AnimatedBackground from '@/components/AnimatedBackground'
import Carousel from '@/components/Carousel'
import Navigation from '@/components/Navigation'
import presentationData from '@/presentation.json'

export default function Home() {
  const [currentSection, setCurrentSection] = useState('cover')
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress((scrollTop / docHeight) * 100)

      const sections = document.querySelectorAll('.section')
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
          setCurrentSection(section.id)
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const sections = presentationData.sections

  return (
    <>
      <AnimatedBackground />
      <ProgressBar progress={scrollProgress} />
      <MiniMap sections={sections} currentId={currentSection} />
      <Navigation showNext nextHref="/parte2" nextLabel="Parte 2" />

      <div className="container">
        {sections.map((section: any, idx: number) => (
          <Section key={section.id} id={section.id}>
            {section.id === 'cover' && <HeroVisual />}
            
            {section.header && (
              <motion.div
                className="section-header"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
              >
                <h2>{section.header.title}</h2>
                {section.header.subtitle && <p>{section.header.subtitle}</p>}
              </motion.div>
            )}
            
            {section.id === 'intro' && <TimelineInteractive />}
            {section.id === 'model' && (
              <>
                <PlatformDiagram />
                <PlatformFeatures />
              </>
            )}

            {section.grid && (
              <motion.div
                className={`grid grid-${section.grid.columns}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  visible: { transition: { staggerChildren: section.motion?.staggerChildren || 0.08 } }
                }}
              >
                {section.grid.cards.map((card: any, i: number) => (
                  card.component === 'AgentCard' ? (
                    <AgentCard key={i} {...card} />
                  ) : (
                    <DocCard key={i} {...card} />
                  )
                ))}
              </motion.div>
            )}

            {section.carousel && (
              <Carousel items={section.carousel.items} options={section.carousel.options} />
            )}

            {section.agents && (
              <motion.div
                className="grid grid-3"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  visible: { transition: { staggerChildren: 0.08 } }
                }}
              >
                {section.agents.items.map((agent: any, i: number) => (
                  <AgentCard key={i} {...agent} />
                ))}
              </motion.div>
            )}

            {section.stepper && (
              <Stepper steps={section.stepper.steps} connectors={section.stepper.connectors} />
            )}

            {section.metrics && (
              <motion.div
                className="metrics"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                {section.metrics.items.map((metric: any, i: number) => (
                  <MetricBadge key={i} {...metric} />
                ))}
              </motion.div>
            )}

            {section.teaser && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                style={{ textAlign: 'center', maxWidth: '600px' }}
              >
                <p style={{ fontSize: 'var(--font-size-base)', lineHeight: 'var(--line-height-normal)', marginBottom: '1rem' }}>{section.teaser}</p>
                {section.cta && (
                  <a href={section.cta.href} style={{ textDecoration: 'none' }}>
                    <button className="cta-button">
                      {section.cta.label}
                    </button>
                  </a>
                )}
              </motion.div>
            )}
          </Section>
        ))}
      </div>
    </>
  )
}
