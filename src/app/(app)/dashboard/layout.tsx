import { AppSidebar } from "@/components/layout/dashboard/app-sidebar";
import { DashboardHeader } from "@/components/layout/dashboard/header";

import {
  SidebarInset,
  SidebarProvider
} from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />
        <div className="flex flex-1 flex-col gap-4 px-4 py-10">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
