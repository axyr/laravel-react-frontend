import { CirclePlay, LayoutGrid, SquareCode, Tractor } from 'lucide-react'
import type { NavItem } from '~/types'

export const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        to: '/dashboard',
        icon: LayoutGrid,
    },
];

export const footerNavItems: NavItem[] = [
    {
        title: 'React Frontend',
        to: 'https://github.com/axyr/laravel-react-frontend',
        icon: SquareCode,
    },
    {
        title: 'Laravel Starter Kit',
        to: 'https://github.com/axyr/laravel-react-starter-kit',
        icon: CirclePlay,
    },
    {
        title: 'Laravel Tractor',
        to: 'https://github.com/axyr/laravel-tractor',
        icon: Tractor,
    },
]