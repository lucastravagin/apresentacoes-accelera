'use client'

import { motion } from 'framer-motion'
import { Network, Scale, Tag } from 'lucide-react'

const features = [
  {
    number: '01',
    icon: Network,
    title: 'Orquestração Inteligente',
    description: 'Todos os agentes trabalham juntos, compartilhando contexto e insights',
    color: '#6b43ef'
  },
  {
    number: '02',
    icon: Scale,
    title: 'Escalabilidade Automática',
    description: 'A plataforma se adapta à demanda dos seus clientes sem intervenção',
    color: '#8b5cf6'
  },
  {
    number: '03',
    icon: Tag,
    title: 'Whitelabel Completo',
    description: 'Sua marca em todos os pontos de contato, nossa tecnologia nos bastidores',
    color: '#a78bfa'
  }
]

export default function PlatformFeatures() {
  return (
    <section className="platform-features-section">
      <motion.div
        className="platform-features-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h3>Recursos Avançados</h3>
        <p>Funcionalidades premium que diferenciam sua plataforma</p>
      </motion.div>

      <div className="platform-features-grid">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            className="platform-feature-card-new"
            initial={{ opacity: 0, y: 30, rotateX: -15 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{
              delay: i * 0.15,
              duration: 0.6,
              type: 'spring',
              stiffness: 100
            }}
            viewport={{ once: true }}
            whileHover={{
              y: -12,
              rotateX: 5,
              transition: { duration: 0.3 }
            }}
          >
            <div
              className="platform-feature-card-glow"
              style={{ background: `radial-gradient(circle at 50% 0%, ${feature.color}40, transparent 70%)` }}
            />

            <div className="platform-feature-header">
              <div
                className="platform-feature-icon"
                style={{ background: `linear-gradient(135deg, ${feature.color}, ${feature.color}dd)` }}
              >
                <feature.icon size={28} />
              </div>
              <div className="platform-feature-number-badge">{feature.number}</div>
            </div>

            <h4 className="platform-feature-title">{feature.title}</h4>
            <p className="platform-feature-description">{feature.description}</p>

            <div className="platform-feature-decoration">
              <div
                className="platform-feature-line"
                style={{ background: `linear-gradient(90deg, ${feature.color}, transparent)` }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="platform-features-cta"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        viewport={{ once: true }}
      >
        <p>Todas as funcionalidades incluídas sem custos adicionais</p>
      </motion.div>
    </section>
  )
}
