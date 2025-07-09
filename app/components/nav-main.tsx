"use client"

import { useLocation, Link } from "react-router"
import type { NavItem } from "~/core/types"

import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "~/components/ui/sidebar"

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const { pathname } = useLocation()

    return (
        <SidebarGroup>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                            asChild
                            isActive={pathname.startsWith(item.to)}
                            tooltip={{ children: item.title }}
                        >
                            <Link to={item.to}>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}