import { ReactNode } from 'react'

export default function Section({ id, children }: { id: string; children: ReactNode }) {
  return (
    <section id={id} className="section">
      {children}
    </section>
  )
}
