'use client'

import { motion, useAnimation } from 'framer-motion'
import { useState, useEffect } from 'react'
import {
  Sparkles,
  Zap,
  Target,
  TrendingUp,
  Box,
  Layers,
  Settings,
  Palette,
  Code,
  Database,
  Cloud,
  Cpu
} from 'lucide-react'

const moduleIcons = [
  { Icon: Box, color: '#6b43ef', label: 'Core' },
  { Icon: Layers, color: '#8b5cf6', label: 'Stack' },
  { Icon: Database, color: '#a78bfa', label: 'Data' },
  { Icon: Cloud, color: '#c4b5fd', label: 'Cloud' },
  { Icon: Cpu, color: '#6b43ef', label: 'Processing' },
  { Icon: Code, color: '#8b5cf6', label: 'API' }
]

const customizationIcons = [
  { Icon: Palette, label: 'Brand' },
  { Icon: Settings, label: 'Config' }
]

export default function HeroVisual() {
  const [activeModule, setActiveModule] = useState(0)
  const controls = useAnimation()

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveModule((prev) => (prev + 1) % moduleIcons.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="hero-visual-modern">
      {/* Background particles */}
      <div className="particles-modern">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="particle-modern"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Central platform hub */}
      <motion.div
        className="platform-hub"
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div className="hub-inner">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles size={48} className="hub-icon" />
          </motion.div>
          <div className="hub-pulse" />
          <div className="hub-pulse hub-pulse-delay" />
        </div>
      </motion.div>

      {/* Orbiting connection rings */}
      <motion.div
        className="orbit-ring orbit-ring-1"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="orbit-ring orbit-ring-2"
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="orbit-ring orbit-ring-3"
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
      />

      {/* Modular components - arranged in circle */}
      {moduleIcons.map((module, i) => {
        const angle = (i / moduleIcons.length) * Math.PI * 2
        const radius = 180
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius
        const isActive = i === activeModule

        return (
          <motion.div
            key={i}
            className={`module-node ${isActive ? 'module-node-active' : ''}`}
            style={{
              left: '50%',
              top: '50%',
            }}
            animate={{
              x: x,
              y: y,
              scale: isActive ? 1.3 : 1,
            }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 15,
            }}
          >
            <motion.div
              className="module-node-inner"
              style={{
                background: `linear-gradient(135deg, ${module.color}, ${module.color}dd)`,
              }}
              animate={{
                boxShadow: isActive
                  ? `0 0 40px ${module.color}aa, 0 0 80px ${module.color}66`
                  : `0 8px 24px ${module.color}44`,
              }}
              whileHover={{
                scale: 1.1,
                rotate: 10,
              }}
            >
              <module.Icon size={24} color="white" />

              {/* Swapping animation indicator */}
              {isActive && (
                <motion.div
                  className="swap-indicator"
                  initial={{ scale: 0, rotate: 0 }}
                  animate={{ scale: [0, 1.5, 0], rotate: [0, 180, 360] }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
              )}
            </motion.div>

            {/* Module label */}
            <motion.div
              className="module-label"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isActive ? 1 : 0.6, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {module.label}
            </motion.div>

            {/* Connection lines to hub */}
            <svg className="module-connection" width="200" height="200">
              <motion.line
                x1="100"
                y1="100"
                x2={100 + x}
                y2={100 + y}
                stroke={module.color}
                strokeWidth={isActive ? '3' : '1'}
                strokeDasharray="5,5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: 1,
                  opacity: isActive ? 0.8 : 0.3,
                }}
                transition={{
                  duration: 2,
                  ease: 'easeInOut',
                }}
              />
            </svg>
          </motion.div>
        )
      })}

      {/* Customization tools floating around */}
      {customizationIcons.map((tool, i) => {
        const side = i === 0 ? -220 : 220
        return (
          <motion.div
            key={i}
            className="customization-tool"
            style={{
              left: '50%',
              top: '50%',
            }}
            animate={{
              x: side,
              y: [-20, 20, -20],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              y: {
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              },
              rotate: {
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
          >
            <div className="customization-tool-inner">
              <tool.Icon size={20} />
              <span className="customization-label">{tool.label}</span>
            </div>
          </motion.div>
        )
      })}

      {/* Data flow particles */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        return (
          <motion.div
            key={`flow-${i}`}
            className="data-flow-particle"
            style={{
              left: '50%',
              top: '50%',
            }}
            animate={{
              x: [0, Math.cos(angle) * 150],
              y: [0, Math.sin(angle) * 150],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeOut',
            }}
          />
        )
      })}

      {/* Floating code brackets - representing white-label customization */}
      <motion.div
        className="code-decorator code-decorator-left"
        animate={{
          x: [-10, 10, -10],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {'</>'}
      </motion.div>

      <motion.div
        className="code-decorator code-decorator-right"
        animate={{
          x: [10, -10, 10],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2.5,
        }}
      >
        {'{}'}
      </motion.div>

      {/* Status indicator */}
      <motion.div
        className="status-indicator"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <motion.div
          className="status-dot"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <span>Platform Ativa</span>
      </motion.div>
    </div>
  )
}
