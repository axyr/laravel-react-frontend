import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '~/components/ui/dropdown-menu'
import { UserInfo } from '~/components/user-info'
import { useMobileNavigation } from '~/core/hooks/use-mobile-navigation'
import { type User } from '~/core/types'
import { LogOut, Settings } from 'lucide-react'
import { Link } from 'react-router'
import { useLogout } from '~/core/hooks/use-auth'
import React from 'react'

interface UserMenuContentProps {
    user: User;
}

export function UserMenuContent({user}: UserMenuContentProps) {
    const cleanup = useMobileNavigation()
    const logout = useLogout()

    function handleLogout(e: React.MouseEvent) {
        e.preventDefault()
        cleanup()
        logout()
    }

    return (
        <>
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <UserInfo user={user} showEmail={true} />
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <Link className="block w-full" to="/settings/profile" onClick={cleanup}>
                        <Settings className="mr-2" />
                        Settings
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Link className="block w-full" to="#" onClick={handleLogout}>
                    <LogOut className="mr-2" />
                    Log out
                </Link>
            </DropdownMenuItem>
        </>
    )
}