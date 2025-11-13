"use client";

import { ListMusic, LogOut, Music } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import useSWR from "swr";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { useEffect } from "react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";
import { getPlaylists, logoutAction } from "./actions";

// Menu items
const items = [
  {
    title: "Songs",
    url: "/songs",
    icon: Music,
  },
  {
    title: "Playlists",
    url: "/playlists",
    icon: ListMusic,
  },
];

const logout = async () => {
  await logoutAction();
};

export function AppSidebar() {
  const { data, isLoading, error } = useSWR("playlists", getPlaylists);

  const { trigger } = useSWRMutation("logout", logout);

  useEffect(() => {
    if (error) {
      toast(error.message as string);
    }
  }, [error]);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="-mb-3">
          <SidebarGroupLabel className="text-xl text-muted-foreground font-light">
            <Link href="/">
              <span className="text-chart-4 me-1">MI`</span> Platform
            </Link>
          </SidebarGroupLabel>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Pages</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Recent Playlists</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {isLoading ? (
                new Array(5)
                  .fill(null)
                  .map((_, index) => (
                    <Skeleton key={index} className="w-full h-7" />
                  ))
              ) : data?.length ? (
                <></>
              ) : (
                <span className="ms-2">No playlists!</span>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="mb-2">
        <Button
          type="button"
          variant="secondary"
          size="lg"
          onClick={() => trigger()}
        >
          <LogOut />
          <span>Log out</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
