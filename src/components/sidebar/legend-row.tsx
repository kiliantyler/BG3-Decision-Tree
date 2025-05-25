import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

interface LegendRowProps {
  color: string
  borderColor?: string
  isDashed?: boolean
  opacity?: number
  label: string
  isChecked: boolean
  onToggle: () => void
}

export function LegendRow({
  color,
  borderColor,
  isDashed = false,
  opacity = 1,
  label,
  isChecked,
  onToggle,
}: LegendRowProps) {
  return (
    <div
      className="flex cursor-pointer items-center justify-between py-1 select-none"
      onClick={onToggle}
    >
      <div className="flex items-center gap-2">
        <span
          className={cn(
            'inline-block h-3 w-3 rounded-sm',
            isDashed ? 'border-dashed' : 'border-solid',
          )}
          style={{
            backgroundColor: color,
            borderColor: borderColor || color,
            borderWidth: 1,
            opacity,
          }}
        />
        <span className="text-xs">{label}</span>
      </div>
      <Switch
        checked={isChecked}
        onCheckedChange={onToggle}
        className="scale-75"
        aria-label={`Toggle ${label}`}
      />
    </div>
  )
}
