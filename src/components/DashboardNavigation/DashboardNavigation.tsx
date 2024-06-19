'use client';
import Link from "next/link";
import {Cog, Home, MessagesSquare, Search} from "lucide-react";
import {atom, useAtom} from 'jotai';
import {DashboardNavigationSelection} from "@/enum/DashboardNavigationSelection";
import {usePathname} from "next/navigation";
import {useEffect} from "react";

const selectionAtom = atom('')
const DashboardNavigation = () => {
    const pathName = usePathname();
    const [selection, setSelection] = useAtom(selectionAtom);

    useEffect(() => {
        switch (pathName) {
            case '/dashboard':
                setSelection(DashboardNavigationSelection.HOME)
                break;
            case '/messages':
                setSelection(DashboardNavigationSelection.MESSAGES)
                break;
            case '/search':
                setSelection(DashboardNavigationSelection.SEARCH)
                break;
            case '/settings':
                setSelection(DashboardNavigationSelection.SETTINGS)
                break;
            default:
                setSelection(DashboardNavigationSelection.HOME)
                break;
        }
    },[])

    const onNavigationClick = (event: React.MouseEvent ) => {
        const element = (event.target as HTMLElement).closest('a')
        if (!element) return
        setSelection(element?.dataset.type as DashboardNavigationSelection)
    }
    return (
        <nav onClick={onNavigationClick} className="col-start-1 row-start-2 flex gap-8 items-center justify-center bg-primary">
            <Link className={`${selection !== DashboardNavigationSelection.HOME && 'opacity-50 block shadow-sm'} `} data-type={DashboardNavigationSelection.HOME} href="/dashboard">
                <Home color="#f8fafc"/>
            </Link>
            <Link className={`${selection !== DashboardNavigationSelection.MESSAGES && 'opacity-50 block shadow-sm'}`} data-type={DashboardNavigationSelection.MESSAGES} href="/messages">
                <MessagesSquare color="#f8fafc"/>
            </Link>
            <Link className={`${selection !== DashboardNavigationSelection.SEARCH && 'opacity-50 block shadow-sm'}`} data-type={DashboardNavigationSelection.SEARCH} href="/search">
                <Search color="#f8fafc"/>
            </Link>
            <Link className={`${selection !== DashboardNavigationSelection.SETTINGS && 'opacity-50 block shadow-sm'}`} data-type={DashboardNavigationSelection.SETTINGS} href="/settings">
                <Cog color="#f8fafc"/>
            </Link>
        </nav>
    );
};

export default DashboardNavigation;