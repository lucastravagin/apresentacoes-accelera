import { motion } from 'framer-motion'
import { Users, Target, ShoppingCart, TrendingUp } from 'lucide-react'

const stages = [
  { icon: Users, title: 'Tráfego', value: '10.000 visitantes', color: '#6b43ef' },
  { icon: Target, title: 'Interesse', value: '3.000 leads', color: '#8b5cf6' },
  { icon: ShoppingCart, title: 'Conversão', value: '500 clientes', color: '#a78bfa' },
  { icon: TrendingUp, title: 'Resultado', value: 'R$ 150k MRR', color: '#c4b5fd' }
]

export default function FunnelDiagram() {
  return (
    <div className="funnel-container">
      {stages.map((stage, i) => (
        <motion.div
          key={i}
          className="funnel-stage"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.2, duration: 0.5 }}
          viewport={{ once: true }}
          style={{ borderColor: stage.color }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center', maxWidth: '100%' }}>
            <stage.icon size={36} style={{ color: stage.color, flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3 style={{ margin: 0, fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', lineHeight: 'var(--line-height-tight)' }}>
                {stage.title}
              </h3>
              <p style={{ margin: '0.5rem 0 0', color: stage.color, fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-bold)', lineHeight: 'var(--line-height-tight)' }}>
                {stage.value}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
