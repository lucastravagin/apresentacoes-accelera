import { motion } from 'framer-motion'

type Step = {
  index: number
  title: string
  caption?: string
}

type StepperProps = {
  steps: Step[]
  connectors?: any[]
}

export default function Stepper({ steps }: StepperProps) {
  return (
    <motion.div
      className="stepper"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        visible: { transition: { staggerChildren: 0.1 } }
      }}
    >
      {steps.map((step, i) => (
        <motion.div
          key={step.index}
          className="step"
          variants={{
            hidden: { opacity: 0, scale: 0.5, y: 50 },
            visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, type: 'spring', bounce: 0.4 } }
          }}
        >
          <motion.div 
            className="step-number"
            whileHover={{ scale: 1.2, rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            {step.index}
          </motion.div>
          <h4>{step.title}</h4>
          {step.caption && <p>{step.caption}</p>}
        </motion.div>
      ))}
    </motion.div>
  )
}
