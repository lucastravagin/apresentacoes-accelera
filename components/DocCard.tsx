import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'

type DocCardProps = {
  icon: string
  title: string
  body: string
}

export default function DocCard({ icon, title, body }: DocCardProps) {
  const Icon = (Icons as any)[icon.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join('')] || Icons.FileText

  return (
    <motion.div
      className="card"
      variants={{
        hidden: { opacity: 0, scale: 0.8, rotate: -5 },
        visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.5, type: 'spring' } }
      }}
      whileHover={{ y: -8, scale: 1.02, rotate: 2 }}
    >
      <Icon className="card-icon" />
      <h3>{title}</h3>
      <p>{body}</p>
    </motion.div>
  )
}
