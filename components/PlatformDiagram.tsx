import { motion } from 'framer-motion'
import { Brain, Zap, Database, Globe, MessageSquare, BarChart } from 'lucide-react'

const nodes = [
  { id: 'brain', icon: Brain, label: 'IA Central', x: 50, y: 20 },
  { id: 'lp', icon: Globe, label: 'Landing Pages', x: 10, y: 50 },
  { id: 'copy', icon: MessageSquare, label: 'Copy', x: 30, y: 70 },
  { id: 'traffic', icon: Zap, label: 'Tráfego', x: 70, y: 70 },
  { id: 'analytics', icon: BarChart, label: 'Analytics', x: 90, y: 50 },
  { id: 'data', icon: Database, label: 'Dados', x: 50, y: 90 }
]

export default function PlatformDiagram() {
  return (
    <div className="platform-diagram" style={{ position: 'relative', height: '500px' }}>
      <svg style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}>
        <motion.path
          d="M 50% 20% L 10% 50%"
          className="platform-connector"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        />
        <motion.path
          d="M 50% 20% L 30% 70%"
          className="platform-connector"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          viewport={{ once: true }}
        />
        <motion.path
          d="M 50% 20% L 70% 70%"
          className="platform-connector"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          viewport={{ once: true }}
        />
        <motion.path
          d="M 50% 20% L 90% 50%"
          className="platform-connector"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          viewport={{ once: true }}
        />
        <motion.path
          d="M 50% 90% L 30% 70%"
          className="platform-connector"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          viewport={{ once: true }}
        />
        <motion.path
          d="M 50% 90% L 70% 70%"
          className="platform-connector"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          viewport={{ once: true }}
        />
      </svg>

      {nodes.map((node, i) => (
        <motion.div
          key={node.id}
          className="platform-node"
          style={{
            position: 'absolute',
            left: `${node.x}%`,
            top: `${node.y}%`,
            transform: 'translate(-50%, -50%)',
            minWidth: '120px',
            textAlign: 'center'
          }}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.15, duration: 0.5, type: 'spring' }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.1, zIndex: 10 }}
        >
          <node.icon size={32} style={{ margin: '0 auto 0.5rem', color: 'var(--purple)' }} />
          <div style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>{node.label}</div>
        </motion.div>
      ))}
    </div>
  )
}
