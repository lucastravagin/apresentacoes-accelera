import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'

type AgentCardProps = {
  icon: string
  title: string
  body: string
  chipsIn?: string[]
  chipsOut?: string[]
  status?: string
}

export default function AgentCard({ icon, title, body, chipsIn, chipsOut, status }: AgentCardProps) {
  const Icon = (Icons as any)[icon.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join('')] || Icons.Box

  return (
    <motion.div
      className="card"
      variants={{
        hidden: { opacity: 0, y: 24, rotateX: -15 },
        visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.5, type: 'spring' } }
      }}
      whileHover={{ y: -8, scale: 1.02, rotateY: 5 }}
      style={{ perspective: 1000 }}
    >
      <Icon className="card-icon" />
      <h3>{title}</h3>
      <p>{body}</p>
      
      {chipsIn && chipsIn.length > 0 && (
        <div className="chips">
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Entrada:</span>
          {chipsIn.map((chip, i) => (
            <span key={i} className="chip">{chip}</span>
          ))}
        </div>
      )}
      
      {chipsOut && chipsOut.length > 0 && (
        <div className="chips">
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Saída:</span>
          {chipsOut.map((chip, i) => (
            <span key={i} className="chip">{chip}</span>
          ))}
        </div>
      )}
      
      {status && (
        <div className={`status status-${status.toLowerCase()}`}>
          {status}
        </div>
      )}
    </motion.div>
  )
}
