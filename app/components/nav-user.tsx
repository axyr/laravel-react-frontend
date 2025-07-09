"use client"

import {
  ChevronsUpDown,
  LogOut,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "~/components/ui/sidebar"

import React from "react"
import { useAuthStore } from "~/core/stores/auth-store"
import { useLogout } from '~/core/hooks/use-auth'
import { UserInfo } from '~/components/user-info'
import { UserMenuContent } from '~/components/user-menu-content'
import { useIsMobile } from '~/core/hooks/use-mobile'

export function NavUser() {
  const { state } = useSidebar()
  const isMobile = useIsMobile()
  const logout = useLogout()
  const user = useAuthStore((s) => s.user)

  function  handleLogout(e: React.MouseEvent) {
    e.preventDefault()
    logout()
  }

  if (!user) return null

  return (
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <UserInfo user={user} />
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side={isMobile ? 'bottom' : state === 'collapsed' ? 'left' : 'bottom'}
                align="end"
                sideOffset={4}
            >
              <UserMenuContent user={user} />
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
  )
}