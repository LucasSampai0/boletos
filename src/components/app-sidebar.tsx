import * as React from "react"
import Image from "next/image"
import {
  Sidebar,
  SidebarContent,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

import LogoutButton from "./logout"
import Link from "next/link"

const data = {
  navMain: [
    {
      items: [
        {
          key: "boletos",
          title: "Boletos",
          url: "/dashboard/boletos",
        },
        {
          key: "comunicado-de-desocupacao",
          title: "Comunicado de desocupação",
          url: "/dashboard/comunicado-de-desocupacao",
        },
        {
          key: "solicitacao-de-manutencao",
          title: "Solicitação de Manutenção",
          url: "/dashboard/solicitacao-de-manutencao",
        }
      ],
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link href={"/dashboard"}>
          <Image src={"/images/logo-preto-laranja.png"} width={160} height={96} alt="logo" className="mx-auto" />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((group, groupIndex) => (
          <SidebarGroupContent key={groupIndex}>
            <SidebarMenu>
              {group.items.map((item) => (
                <SidebarMenuItem key={item.title} >
                  <SidebarMenuButton asChild size={"md"} isActive={item.isActive}>
                    <a href={item.url}>{item.title}</a>
                  </SidebarMenuButton>
                  <hr className="mx-4" />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>

        ))}
        <LogoutButton />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
