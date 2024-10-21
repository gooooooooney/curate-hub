import { SidebarFooter as SidebarFooterUI } from "@/components/ui/sidebar";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export function UserInfo() {
  return (
    <SidebarFooterUI>
      <SignedIn>
        <UserButton
        />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </SidebarFooterUI>
  )
}
