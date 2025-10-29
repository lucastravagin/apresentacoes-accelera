import { motion } from 'framer-motion'
import { Sparkles, Zap, Target, TrendingUp } from 'lucide-react'

export default function HeroVisual() {
  return (
    <div className="hero-visual">
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="orbit orbit-1" />
      <div className="orbit orbit-2" />
      <div className="orbit orbit-3" />

      <motion.div
        className="orbit-node"
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80px', height: '80px' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <Sparkles size={40} color="white" />
      </motion.div>

      <motion.div
        className="orbit-node"
        style={{ top: '100px', left: '100px' }}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 0 }}
      >
        <Zap size={24} color="white" />
      </motion.div>

      <motion.div
        className="orbit-node"
        style={{ top: '100px', right: '100px' }}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
      >
        <Target size={24} color="white" />
      </motion.div>

      <motion.div
        className="orbit-node"
        style={{ bottom: '50px', left: '50%', transform: 'translateX(-50%)' }}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 2 }}
      >
        <TrendingUp size={24} color="white" />
      </motion.div>
    </div>
  )
}
