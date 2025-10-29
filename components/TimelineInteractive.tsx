'use client'

import { motion } from 'framer-motion'
import { Users, Target, ShoppingCart, TrendingUp, CheckCircle2 } from 'lucide-react'

const stages = [
  {
    icon: Users,
    title: 'Tráfego',
    value: '10.000 visitantes',
    description: 'Atraia público qualificado com campanhas otimizadas',
    color: '#6b43ef',
    percentage: 100
  },
  {
    icon: Target,
    title: 'Interesse',
    value: '3.000 leads',
    description: 'Capture contatos engajados e interessados',
    color: '#8b5cf6',
    percentage: 30
  },
  {
    icon: ShoppingCart,
    title: 'Conversão',
    value: '500 clientes',
    description: 'Transforme leads em clientes pagantes',
    color: '#a78bfa',
    percentage: 17
  },
  {
    icon: TrendingUp,
    title: 'Resultado',
    value: 'R$ 150k MRR',
    description: 'Receita recorrente mensal consolidada',
    color: '#c4b5fd',
    percentage: 100
  }
]

export default function TimelineInteractive() {
  return (
    <div className="timeline-container">
      <motion.div
        className="timeline-progress-line"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
        viewport={{ once: true }}
      />

      <div className="timeline-stages">
        {stages.map((stage, i) => (
          <motion.div
            key={i}
            className="timeline-stage"
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: i * 0.2,
              duration: 0.6,
              type: 'spring',
              stiffness: 100
            }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, zIndex: 10 }}
          >
            {/* Connector dot */}
            <motion.div
              className="timeline-dot"
              style={{ borderColor: stage.color }}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: i * 0.2 + 0.3, duration: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="timeline-dot-inner" style={{ background: stage.color }} />
            </motion.div>

            {/* Stage card */}
            <div className="timeline-card" style={{ borderColor: stage.color }}>
              <div className="timeline-card-header">
                <div
                  className="timeline-icon-wrapper"
                  style={{ background: `linear-gradient(135deg, ${stage.color}, ${stage.color}dd)` }}
                >
                  <stage.icon size={24} />
                  <div className="timeline-icon-pulse" style={{ background: stage.color }} />
                </div>
                <div className="timeline-header-content">
                  <h3 className="timeline-title">{stage.title}</h3>
                  <p className="timeline-value" style={{ color: stage.color }}>
                    {stage.value}
                  </p>
                </div>
                <CheckCircle2 className="timeline-check" size={20} style={{ color: stage.color }} />
              </div>

              <p className="timeline-description">{stage.description}</p>

              {/* Progress bar */}
              {i < stages.length - 1 && (
                <div className="timeline-progress">
                  <div className="timeline-progress-bg">
                    <motion.div
                      className="timeline-progress-fill"
                      style={{ background: `linear-gradient(90deg, ${stage.color}, ${stages[i + 1]?.color})` }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${stage.percentage}%` }}
                      transition={{ delay: i * 0.2 + 0.5, duration: 1 }}
                      viewport={{ once: true }}
                    />
                  </div>
                  <span className="timeline-percentage">{stage.percentage}%</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stats summary */}
      <motion.div
        className="timeline-summary"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="timeline-summary-item">
          <span className="timeline-summary-label">Taxa de Conversão</span>
          <span className="timeline-summary-value">5%</span>
        </div>
        <div className="timeline-summary-item">
          <span className="timeline-summary-label">Tempo Médio</span>
          <span className="timeline-summary-value">7 dias</span>
        </div>
        <div className="timeline-summary-item">
          <span className="timeline-summary-label">ROI</span>
          <span className="timeline-summary-value">300%</span>
        </div>
      </motion.div>
    </div>
  )
}
