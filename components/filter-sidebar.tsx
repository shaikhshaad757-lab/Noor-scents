"use client"

import { X, ChevronDown } from "lucide-react"
import { categories, scentFamilies } from "@/lib/data"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface FilterSidebarProps {
  isOpen: boolean
  onClose: () => void
  selectedCategory: string | null
  selectedScent: string | null
  onCategoryChange: (category: string | null) => void
  onScentChange: (scent: string | null) => void
}

export function FilterSidebar({
  isOpen,
  onClose,
  selectedCategory,
  selectedScent,
  onCategoryChange,
  onScentChange,
}: FilterSidebarProps) {
  const [categoryOpen, setCategoryOpen] = useState(true)
  const [scentOpen, setScentOpen] = useState(true)

  const hasFilters = selectedCategory || selectedScent

  const FilterContent = () => (
    <div className="space-y-8">
      {/* Active Filters */}
      {hasFilters && (
        <div className="pb-6 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] text-muted-foreground tracking-[0.2em] uppercase">
              Active Filters
            </span>
            <button
              onClick={() => {
                onCategoryChange(null)
                onScentChange(null)
              }}
              className="text-[11px] text-primary hover:text-gold-light tracking-wider uppercase transition-colors duration-300"
            >
              Clear All
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedCategory && (
              <button
                onClick={() => onCategoryChange(null)}
                className="group flex items-center gap-2 px-3 py-2 bg-primary/10 border border-primary/20 text-sm text-foreground hover:border-primary transition-colors duration-300"
              >
                {categories.find((c) => c.id === selectedCategory)?.name}
                <X className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
              </button>
            )}
            {selectedScent && (
              <button
                onClick={() => onScentChange(null)}
                className="group flex items-center gap-2 px-3 py-2 bg-primary/10 border border-primary/20 text-sm text-foreground hover:border-primary transition-colors duration-300"
              >
                {scentFamilies.find((s) => s.id === selectedScent)?.name}
                <X className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="border-b border-border pb-6">
        <button
          onClick={() => setCategoryOpen(!categoryOpen)}
          className="flex items-center justify-between w-full mb-4"
        >
          <span className="text-[11px] text-foreground tracking-[0.2em] uppercase">
            Category
          </span>
          <ChevronDown
            className={cn(
              "w-4 h-4 text-muted-foreground transition-transform duration-300",
              categoryOpen && "rotate-180"
            )}
          />
        </button>
        <div
          className={cn(
            "space-y-1 overflow-hidden transition-all duration-300",
            categoryOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() =>
                onCategoryChange(
                  selectedCategory === category.id ? null : category.id
                )
              }
              className={cn(
                "w-full flex items-center justify-between py-3 text-left transition-all duration-300 group",
                selectedCategory === category.id
                  ? "text-primary"
                  : "text-foreground/70 hover:text-foreground hover:pl-2"
              )}
            >
              <span className="text-sm tracking-wide">{category.name}</span>
              <div
                className={cn(
                  "w-4 h-4 border transition-all duration-300 flex items-center justify-center",
                  selectedCategory === category.id
                    ? "border-primary bg-primary"
                    : "border-border group-hover:border-foreground/40"
                )}
              >
                {selectedCategory === category.id && (
                  <svg
                    className="w-2.5 h-2.5 text-primary-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Scent Filter */}
      <div>
        <button
          onClick={() => setScentOpen(!scentOpen)}
          className="flex items-center justify-between w-full mb-4"
        >
          <span className="text-[11px] text-foreground tracking-[0.2em] uppercase">
            Scent Family
          </span>
          <ChevronDown
            className={cn(
              "w-4 h-4 text-muted-foreground transition-transform duration-300",
              scentOpen && "rotate-180"
            )}
          />
        </button>
        <div
          className={cn(
            "space-y-1 overflow-hidden transition-all duration-300",
            scentOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          {scentFamilies.map((scent) => (
            <button
              key={scent.id}
              onClick={() =>
                onScentChange(selectedScent === scent.id ? null : scent.id)
              }
              className={cn(
                "w-full flex items-center justify-between py-3 text-left transition-all duration-300 group",
                selectedScent === scent.id
                  ? "text-primary"
                  : "text-foreground/70 hover:text-foreground hover:pl-2"
              )}
            >
              <div>
                <span className="text-sm tracking-wide block">{scent.name}</span>
                <span className="text-[11px] text-muted-foreground block mt-0.5">
                  {scent.description}
                </span>
              </div>
              <div
                className={cn(
                  "w-4 h-4 border transition-all duration-300 flex items-center justify-center flex-shrink-0",
                  selectedScent === scent.id
                    ? "border-primary bg-primary"
                    : "border-border group-hover:border-foreground/40"
                )}
              >
                {selectedScent === scent.id && (
                  <svg
                    className="w-2.5 h-2.5 text-primary-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-28">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-6 h-px bg-primary" />
            <span className="text-[11px] text-primary tracking-[0.3em] uppercase">
              Refine
            </span>
          </div>
          <FilterContent />
        </div>
      </aside>

      {/* Mobile Filter Drawer */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden transition-opacity duration-500",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Drawer Panel */}
        <div
          className={cn(
            "absolute top-0 right-0 h-full w-full max-w-sm bg-card border-l border-border transition-transform duration-500 ease-out",
            isOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-6 h-px bg-primary" />
                <span className="text-[11px] tracking-[0.3em] uppercase text-foreground">
                  Filters
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-foreground/60 hover:text-primary transition-colors duration-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <FilterContent />
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-border">
              <button
                onClick={onClose}
                className="w-full py-4 bg-primary text-primary-foreground text-[13px] uppercase tracking-[0.15em] font-medium hover:bg-gold-light transition-colors duration-300"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
