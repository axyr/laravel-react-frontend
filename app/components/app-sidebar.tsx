import * as React from "react"
import { NavMain } from "~/components/nav-main"
import { NavUser } from "~/components/nav-user"
import { mainNavItems, footerNavItems } from '~/config/nav-items'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarRail,
} from "~/components/ui/sidebar"
import { Link } from "react-router";
import AppLogo from "~/components/app-logo";
import { NavFooter } from '~/components/nav-footer'

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