import { useLocation } from 'react-router';

export function useQueryParam(key: string): string | null {
    const { search } = useLocation();
    return new URLSearchParams(search).get(key);
}