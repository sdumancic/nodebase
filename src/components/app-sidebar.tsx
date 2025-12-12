"use client"

import {
    CreditCardIcon, FolderOpenIcon, HistoryIcon, KeyIcon, LogOutIcon, StarIcon
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    Sidebar, SidebarContent, SidebarFooter, SidebarGroup,
    SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel,
    SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";

const menuItems = [
    {
        title: "Workflows",
        items: [
            {
                title: "Workflows",
                url: "/workflows",
                icon: FolderOpenIcon
            },
            {
                title: "Credentials",
                url: "/credentials",
                icon: KeyIcon
            },
            {
                title: "Executions",
                url: "/executions",
                icon: HistoryIcon
            }
        ]
    }
]

const AppSidebar = () => {

    const router = useRouter();
    const pathname = usePathname();

    return (<Sidebar collapsible="icon">
        <SidebarHeader>
            <SidebarMenuItem>
                <SidebarMenuButton className="gap-x-4 h-10 px-4" isActive={false} asChild>
                    <Link href="/" prefetch="auto">
                        <Image src="/logos/logo.svg" alt="Nodebase" width={30} height={30} />
                        <span className="text-sm font-semibold">Nodebase</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarHeader>
        <SidebarContent>
            {menuItems.map((group) => (
                <SidebarGroup key={group.title}>
                    <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {group.items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton tooltip={item.title}
                                        isActive={item.url === "/" ? pathname === "/" : pathname.startsWith(item.url)} asChild
                                        className="gap-x-4 h-10 px-4">
                                        <Link href={item.url} prefetch="auto">
                                            <item.icon className="size-4" />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            ))}
        </SidebarContent>

        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Upgrade to PRO"
                        className="gap-x-4 h-10 px-4"
                        onClick={() => { }}>
                        <StarIcon className="h-4 w-4" />
                        <span>Upgrade to PRO</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Billing Portal"
                        className="gap-x-4 h-10 px-4"
                        onClick={() => { }}>
                        <CreditCardIcon className="h-4 w-4" />
                        <span>Billing Portal</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Billing Portal"
                        className="gap-x-4 h-10 px-4"
                        onClick={() => authClient.signOut({
                            fetchOptions: {
                                onSuccess: () => {
                                    router.push("/login");
                                }
                            }
                        })}>
                        <LogOutIcon className="h-4 w-4" />
                        <span>Logout</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>

    </Sidebar>
    );
};

export default AppSidebar;