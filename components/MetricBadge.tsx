type MetricBadgeProps = {
  value: string
  caption: string
}

export default function MetricBadge({ value, caption }: MetricBadgeProps) {
  return (
    <div className="metric">
      <div className="metric-value">{value}</div>
      <div className="metric-caption">{caption}</div>
    </div>
  )
}
