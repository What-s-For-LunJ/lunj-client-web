"use client"

import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof Avatar>

interface TeamSwitcherProps extends PopoverTriggerProps {}

export default function TeamSwitcher({ className }: TeamSwitcherProps) {
  return (
    <div className="flex items-center justify-center h-screen space-x-4">
      {/* Avatar Logo at half the size */}
    

      {/* Word next to the avatar, using custom font */}
      <span
        className={cn(
          "text-xl font-bold", // Adjust this for size and weight
          "font-custom" // Replace this with the actual font class or inline styles
        )}
      >
       Lunj?
      </span>
    </div>
  )
}
