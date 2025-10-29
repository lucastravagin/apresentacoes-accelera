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
import AnimatedBackground from '@/components/AnimatedBackground'
import Carousel from '@/components/Carousel'
import Navigation from '@/components/Navigation'
import presentation2Data from '@/presentation2.json'

export default function Parte2() {
  const [currentSection, setCurrentSection] = useState('acquisition_intro')
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

  const sections = presentation2Data.sections

  return (
    <>
      <AnimatedBackground />
      <ProgressBar progress={scrollProgress} />
      <MiniMap sections={sections} currentId={currentSection} />
      <Navigation showBack backHref="/" backLabel="Parte 1" />

      <div className="container">
        {sections.map((section: any) => (
          <Section key={section.id} id={section.id}>
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

            {section.layout && (
              <div className="grid grid-2" style={{ marginBottom: '2rem' }}>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)', lineHeight: 'var(--line-height-tight)', marginBottom: '1rem' }}>{section.left.title}</h3>
                  <p style={{ fontSize: 'var(--font-size-base)', lineHeight: 'var(--line-height-normal)', color: 'var(--text-muted)' }}>{section.left.body}</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {section.right.items.map((item: string, i: number) => (
                      <motion.li
                        key={i}
                        style={{ 
                          padding: '0.75rem 0', 
                          borderLeft: '3px solid var(--purple)',
                          paddingLeft: '1rem',
                          marginBottom: '0.5rem'
                        }}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            )}

            {section.grid && (
              <motion.div
                className={`grid grid-${section.grid.columns}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  visible: { transition: { staggerChildren: 0.08 } }
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
              <Carousel items={section.carousel.items} options={{ loop: true, align: 'start' }} />
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
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                style={{
                  textAlign: 'center',
                  fontSize: 'var(--font-size-base)',
                  lineHeight: 'var(--line-height-normal)',
                  marginTop: '2rem',
                  color: 'var(--purple)'
                }}
              >
                {section.teaser}
              </motion.p>
            )}

            {section.tagline && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                style={{
                  textAlign: 'center',
                  fontSize: 'var(--font-size-lg)',
                  lineHeight: 'var(--line-height-tight)',
                  marginTop: '2rem',
                  fontWeight: 'var(--font-weight-bold)'
                }}
              >
                {section.tagline}
              </motion.p>
            )}

            {section.cta && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                style={{ textAlign: 'center', marginTop: '2rem' }}
              >
                <a href={section.cta.href} style={{ textDecoration: 'none' }}>
                  <button className="cta-button">
                    {section.cta.label}
                  </button>
                </a>
              </motion.div>
            )}
          </Section>
        ))}
      </div>
    </>
  )
}
