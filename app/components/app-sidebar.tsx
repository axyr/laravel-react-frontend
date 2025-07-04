import * as React from "react"
import {
    BookOpen,
    Folder,
    LayoutGrid,
} from 'lucide-react'

import { NavMain } from "~/components/nav-main"
import { NavUser } from "~/components/nav-user"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarRail,
} from "~/components/ui/sidebar"
import type { NavItem } from "~/types";
import { Link } from "react-router";
import AppLogo from "~/components/app-logo";
import { NavFooter } from '~/components/nav-footer'

const mainNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    to: '/dashboard',
    icon: LayoutGrid,
  },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        to: 'https://github.com/axyr/laravel-tractor-react',
        icon: Folder,
    },
    {
        title: 'Laravel Tractor',
        to: 'https://github.com/axyr/laravel-tractor',
        icon: BookOpen,
    },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/dashboard" >
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={mainNavItems} />
      </SidebarContent>
      <SidebarFooter>
          <NavFooter items={footerNavItems} className="mt-auto" />
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}