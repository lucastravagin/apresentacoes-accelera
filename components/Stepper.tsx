'use client'

import { motion } from 'framer-motion'
import {
  Search,
  GraduationCap,
  Calendar,
  CheckCircle,
  TrendingDown,
  RefreshCw,
  Users,
  ArrowRight
} from 'lucide-react'

type Step = {
  index: number
  title: string
  caption?: string
}

type StepperProps = {
  steps: Step[]
  connectors?: any[]
}

const stepIcons = [
  Search,
  GraduationCap,
  Calendar,
  CheckCircle,
  TrendingDown,
  RefreshCw,
  Users
]

const stepColors = [
  '#6b43ef',
  '#7c3aed',
  '#8b5cf6',
  '#9333ea',
  '#a855f7',
  '#c084fc',
  '#d8b4fe'
]

export default function Stepper({ steps, connectors }: StepperProps) {
  return (
    <div className="stepper-horizontal-container">
      <motion.div
        className="stepper-horizontal"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={{
          visible: { transition: { staggerChildren: 0.12 } }
        }}
      >
        {steps.map((step, i) => {
          const Icon = stepIcons[i] || Search
          const color = stepColors[i] || '#6b43ef'
          const isLastStep = i === steps.length - 1

          return (
            <div key={step.index} className="step-horizontal-wrapper">
              <motion.div
                className="step-horizontal"
                variants={{
                  hidden: { opacity: 0, y: 40, scale: 0.8 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      duration: 0.5,
                      type: 'spring',
                      stiffness: 100,
                      damping: 12
                    }
                  }
                }}
                whileHover={{
                  y: -12,
                  transition: { duration: 0.3 }
                }}
              >
                {/* Glow background */}
                <motion.div
                  className="step-horizontal-glow"
                  style={{ background: `${color}15` }}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Number badge circle */}
                <motion.div
                  className="step-horizontal-circle"
                  style={{
                    background: `linear-gradient(135deg, ${color}, ${color}dd)`,
                    boxShadow: `0 8px 32px ${color}66`
                  }}
                  whileHover={{
                    scale: 1.15,
                    rotate: [0, -10, 10, 0],
                    boxShadow: `0 12px 48px ${color}88`
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Icon */}
                  <motion.div
                    className="step-horizontal-icon"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon size={32} color="white" strokeWidth={2.5} />
                  </motion.div>

                  {/* Number overlay */}
                  <div className="step-horizontal-number" style={{ color }}>
                    {step.index}
                  </div>

                  {/* Pulse ring */}
                  <motion.div
                    className="step-horizontal-pulse"
                    style={{ borderColor: color }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.8, 0, 0.8]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: i * 0.4
                    }}
                  />
                </motion.div>

                {/* Content */}
                <div className="step-horizontal-content">
                  <h4 className="step-horizontal-title">{step.title}</h4>
                  {step.caption && (
                    <p className="step-horizontal-caption">{step.caption}</p>
                  )}
                </div>

                {/* Progress indicator bar */}
                <motion.div
                  className="step-horizontal-progress"
                  style={{ background: `linear-gradient(90deg, ${color}, ${color}66)` }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                />
              </motion.div>

              {/* Connector arrow between steps */}
              {!isLastStep && (
                <motion.div
                  className="step-horizontal-connector"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.12 + 0.3 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    animate={{
                      x: [0, 8, 0],
                      opacity: [0.4, 1, 0.4]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  >
                    <ArrowRight
                      size={28}
                      color={stepColors[i + 1] || color}
                      strokeWidth={2.5}
                    />
                  </motion.div>

                  {/* Animated dots */}
                  <div className="step-horizontal-dots">
                    {[0, 1, 2].map((dot) => (
                      <motion.div
                        key={dot}
                        className="step-horizontal-dot"
                        style={{ background: color }}
                        animate={{
                          opacity: [0.3, 1, 0.3],
                          scale: [0.8, 1.2, 0.8]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: dot * 0.2
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          )
        })}
      </motion.div>

      {/* Process flow summary */}
      <motion.div
        className="stepper-horizontal-summary"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="stepper-horizontal-stat">
          <div className="stepper-horizontal-stat-icon">
            <Users size={24} color="#6b43ef" />
          </div>
          <div className="stepper-horizontal-stat-content">
            <span className="stepper-horizontal-stat-value">{steps.length}</span>
            <span className="stepper-horizontal-stat-label">Etapas</span>
          </div>
        </div>

        <div className="stepper-horizontal-divider" />

        <div className="stepper-horizontal-stat">
          <div className="stepper-horizontal-stat-icon">
            <CheckCircle size={24} color="#22c55e" />
          </div>
          <div className="stepper-horizontal-stat-content">
            <span className="stepper-horizontal-stat-value">100%</span>
            <span className="stepper-horizontal-stat-label">Automatizado</span>
          </div>
        </div>

        <div className="stepper-horizontal-divider" />

        <div className="stepper-horizontal-stat">
          <div className="stepper-horizontal-stat-icon">
            <RefreshCw size={24} color="#3b82f6" />
          </div>
          <div className="stepper-horizontal-stat-content">
            <span className="stepper-horizontal-stat-value">24/7</span>
            <span className="stepper-horizontal-stat-label">Ativo</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
