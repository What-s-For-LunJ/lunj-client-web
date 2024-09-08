"use client"

import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons"
import { DayPicker } from "react-day-picker"
import { DirectionProvider } from '@radix-ui/react-direction'

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  dir = "ltr", // Add default direction
  ...props
}: CalendarProps & { dir?: "ltr" | "rtl" }) {
  return (
    <DirectionProvider dir={dir}> {/* Ensure the DirectionProvider is used */}
      <DayPicker
        showOutsideDays={showOutsideDays}
        className={cn("p-3", className)}
        classNames={{
          // All the classNames
        }}
        components={{
          Button: ({ isPrevious }: any) => (
            <button className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100">
              {isPrevious ? (
                <ChevronLeftIcon className="h-4 w-4" />
              ) : (
                <ChevronRightIcon className="h-4 w-4" />
              )}
            </button>
          ),
        }}
        {...props}
      />
    </DirectionProvider>
  )
}

Calendar.displayName = "Calendar"

export { Calendar }
