import { Settings2, type LucideIcon } from "lucide-react"
import React from "react"

import { SettingsModal } from "@/components/settings-modal"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar"

// [
//   {
//     title: "Calendar",
//     url: "#",
//     icon: Calendar,
//   },
//   {
//     title: "Settings",
//     url: "#",
//     icon: Settings2,
//   },
//   {
//     title: "Templates",
//     url: "#",
//     icon: Blocks,
//   },
//   {
//     title: "Trash",
//     url: "#",
//     icon: Trash2,
//   },
//   {
//     title: "Help",
//     url: "#",
//     icon: MessageCircleQuestion,
//   },
// ]
export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
    badge?: React.ReactNode
  }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <SidebarGroup {...props}>
        <SidebarGroupContent>
          <SidebarMenu>
            {/* {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
              {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
            </SidebarMenuItem>
          ))} */}
            <SidebarMenuItem onClick={() => setOpen(true)}>
              <SidebarMenuButton asChild>
                <div className="cursor-pointer">
                  <Settings2 />
                  <span>Settings</span>
                </div>
              </SidebarMenuButton>
              {/* {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>} */}
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <SettingsModal open={open} onOpenChange={setOpen} />
    </>
  )
}
