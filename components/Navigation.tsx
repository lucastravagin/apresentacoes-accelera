'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface NavigationProps {
  showBack?: boolean
  showNext?: boolean
  backHref?: string
  nextHref?: string
  backLabel?: string
  nextLabel?: string
}

export default function Navigation({
  showBack = false,
  showNext = false,
  backHref = '/',
  nextHref = '/parte2',
  backLabel = 'Parte 1',
  nextLabel = 'Parte 2'
}: NavigationProps) {
  return (
    <motion.nav
      className="navigation"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {showBack && (
        <Link href={backHref} className="nav-link nav-link-back">
          <ArrowLeft size={20} />
          <span>{backLabel}</span>
        </Link>
      )}
      {showNext && (
        <Link href={nextHref} className="nav-link nav-link-next">
          <span>{nextLabel}</span>
          <ArrowRight size={20} />
        </Link>
      )}
    </motion.nav>
  )
}
