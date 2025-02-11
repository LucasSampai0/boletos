import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import Provider from "../provider"

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession()

  if (!session) {
    redirect("/login")
  } else {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-24 shrink-0 items-center justify-between gap-2 border-b px-4">
            <div>
              <h1 className="font-semibold text-slate-600">Olá! {session.user?.name}</h1>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-8 bg-neutral-100/50">
            <Provider>
              {children}
            </Provider>
          </div>
        </SidebarInset>
      </SidebarProvider>
    )
  }
}
