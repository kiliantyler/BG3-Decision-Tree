import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MinusSquare, PlusSquare, SearchIcon } from 'lucide-react'
import { LegendRow } from './legend-row'

interface LegendAreaProps {
  showRequired: boolean
  setShowRequired: (show: boolean) => void
  showOptional: boolean
  setShowOptional: (show: boolean) => void
  showUnavailable: boolean
  setShowUnavailable: (show: boolean) => void
  collapseAllSections: () => void
  expandAllSections: () => void
  searchTerm: string
  setSearchTerm: (term: string) => void
}

export function LegendArea({
  showRequired,
  setShowRequired,
  showOptional,
  setShowOptional,
  showUnavailable,
  setShowUnavailable,
  collapseAllSections,
  expandAllSections,
  searchTerm,
  setSearchTerm,
}: LegendAreaProps) {
  return (
    <div className="mb-4 rounded-md bg-muted/40 p-3 select-none">
      {/* Search bar */}
      <div className="relative mb-3">
        <SearchIcon className="absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search decisions..."
          className="h-8 pl-8 text-xs"
        />
      </div>

      {/* Legend rows */}
      <div className="mb-3 space-y-1.5">
        <LegendRow
          color="#fac564"
          borderColor="#eb8c00"
          label="Required Quest"
          isChecked={showRequired}
          onToggle={() => setShowRequired(!showRequired)}
        />

        <LegendRow
          color="#f1f1f1"
          borderColor="#bbbbbb"
          label="Optional Side Quest"
          isChecked={showOptional}
          onToggle={() => setShowOptional(!showOptional)}
        />

        <LegendRow
          color="#f8f8f8"
          borderColor="#999999"
          isDashed={true}
          opacity={0.6}
          label="Unavailable Decision"
          isChecked={showUnavailable}
          onToggle={() => setShowUnavailable(!showUnavailable)}
        />
      </div>

      {/* Collapse/expand buttons */}
      <div className="flex justify-end gap-2 border-t border-border/30 pt-2">
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7"
          onClick={collapseAllSections}
          title="Collapse All Sections"
        >
          <MinusSquare className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7"
          onClick={expandAllSections}
          title="Expand All Sections"
        >
          <PlusSquare className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
