import { createContext, useContext } from "react";
import type { BreadcrumbItem } from "~/types";

const BreadcrumbContext = createContext<BreadcrumbItem[] | undefined>(undefined);

export function BreadcrumbProvider({
    value,
    children,
}: {
    value: BreadcrumbItem[];
    children: React.ReactNode;
}) {
    return (
        <BreadcrumbContext.Provider value={value}>
            {children}
        </BreadcrumbContext.Provider>
    );
}

export function useBreadcrumbs(): BreadcrumbItem[] | undefined {
    return useContext(BreadcrumbContext);
}