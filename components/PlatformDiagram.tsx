'use client'

import { motion } from 'framer-motion'
import { Brain, Zap, Database, Globe, MessageSquare, BarChart, ArrowRight } from 'lucide-react'

const nodes = [
  {
    id: 'brain',
    icon: Brain,
    label: 'IA Central',
    description: 'Coordena todos os agentes',
    x: 50,
    y: 15,
    size: 'large'
  },
  {
    id: 'lp',
    icon: Globe,
    label: 'Landing Pages',
    description: 'Páginas que convertem',
    x: 15,
    y: 50
  },
  {
    id: 'copy',
    icon: MessageSquare,
    label: 'Copy',
    description: 'Textos persuasivos',
    x: 35,
    y: 70
  },
  {
    id: 'traffic',
    icon: Zap,
    label: 'Tráfego',
    description: 'Campanhas otimizadas',
    x: 65,
    y: 70
  },
  {
    id: 'analytics',
    icon: BarChart,
    label: 'Analytics',
    description: 'Métricas em tempo real',
    x: 85,
    y: 50
  },
  {
    id: 'data',
    icon: Database,
    label: 'Dados',
    description: 'Insights acionáveis',
    x: 50,
    y: 90
  }
]

const connections = [
  { from: 'brain', to: 'lp', label: 'Templates' },
  { from: 'brain', to: 'copy', label: 'Briefings' },
  { from: 'brain', to: 'traffic', label: 'Estratégia' },
  { from: 'brain', to: 'analytics', label: 'Monitoramento' },
  { from: 'data', to: 'copy', label: 'Insights' },
  { from: 'data', to: 'traffic', label: 'Otimização' }
]

export default function PlatformDiagram() {
  return (
    <div className="platform-diagram-container">
      <div className="platform-diagram">
        {/* SVG para conexões animadas */}
        <svg className="platform-connections" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--purple)" stopOpacity="0.3" />
              <stop offset="50%" stopColor="var(--purple)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="var(--purple)" stopOpacity="0.3" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {connections.map((conn, i) => {
            const fromNode = nodes.find(n => n.id === conn.from)
            const toNode = nodes.find(n => n.id === conn.to)
            if (!fromNode || !toNode) return null

            return (
              <g key={`${conn.from}-${conn.to}`}>
                <motion.line
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke="url(#connectionGradient)"
                  strokeWidth="0.3"
                  strokeDasharray="2,2"
                  filter="url(#glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: i * 0.2 }}
                  viewport={{ once: true }}
                />
              </g>
            )
          })}
        </svg>

        {/* Nós da plataforma como cards interativos */}
        {nodes.map((node, i) => (
          <motion.div
            key={node.id}
            className={`platform-node ${node.size === 'large' ? 'platform-node-large' : ''}`}
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
            }}
            initial={{ scale: 0, opacity: 0, rotateY: -180 }}
            whileInView={{ scale: 1, opacity: 1, rotateY: 0 }}
            transition={{
              delay: i * 0.15,
              duration: 0.6,
              type: 'spring',
              stiffness: 100
            }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.15,
              zIndex: 20,
              rotateY: 5,
              transition: { duration: 0.3 }
            }}
          >
            <div className="platform-node-inner">
              <div className="platform-node-icon-wrapper">
                <node.icon className="platform-node-icon" />
                <div className="platform-node-pulse"></div>
              </div>
              <div className="platform-node-content">
                <h4 className="platform-node-title">{node.label}</h4>
                <p className="platform-node-description">{node.description}</p>
              </div>
              {node.size === 'large' && (
                <div className="platform-node-badge">Core</div>
              )}
            </div>
            <div className="platform-node-glow"></div>
          </motion.div>
        ))}

        {/* Indicador de fluxo de dados */}
        <motion.div
          className="platform-flow-indicator"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <ArrowRight size={16} />
          <span>Fluxo de dados em tempo real</span>
        </motion.div>
      </div>

    </div>
  )
}
