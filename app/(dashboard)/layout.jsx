import Link from "next/link"
import {
  Home,
  Package2,
  PanelLeft,
  Search,

} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip"

import NavbarProfile from "@/components/dashboard/NavbarProfile"
import DynamicBreadcrumb from "@/components/dashboard/DynamicBreadcrumb"
import { getSession } from "../../utils/auth"
import { createClient } from "@/utils/supabase/server"
import CompleteProfileData from "@/components/dashboard/profile/CompleteProfileData"
import { BsPencilSquare } from "react-icons/bs";

import { Toaster } from "@/components/ui/sonner"
import { Inter } from "next/font/google"
const inter = Inter({ subsets: ["latin"] });
import "../globals.css";
import { HiDocumentReport } from "react-icons/hi";
import Providers from "../../utils/providers";


export default async function RootLayout({ children }) {
  const session =  await getSession()
  
 
  const supabase = await createClient()
  const { data,error } = await supabase.from('detail_user').select('id').eq('id', session.user.id).single()
  


  return (
   
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
          <Providers session={session}>
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
              <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                <Link
                  href="/dashboard"
                  className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                >
                  <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
                  <span className="sr-only">Eqoce</span>
                </Link>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href="/dashboard"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                      >
                        <Home className="h-5 w-5" />
                        <span className="sr-only">Dashboard</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Dashboard</TooltipContent>
                  </Tooltip>
                </TooltipProvider>



                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href="/dashboard/write"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                      >
                        <BsPencilSquare className="h-5 w-5" />
                        <span className="sr-only">Write</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Write</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href="/dashboard/raport"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                      >
                        <HiDocumentReport className="h-5 w-5" />
                        <span className="sr-only">Raport</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Raport</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </nav>
             
             
            </aside>
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
              <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button size="icon" variant="outline" className="sm:hidden">
                      <PanelLeft className="h-5 w-5" />
                      <span className="sr-only">Toggle Menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="sm:max-w-xs">
                    <nav className="grid gap-6 text-lg font-medium">
                      <Link
                        href="#"
                        className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                      >
                        <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                        <span className="sr-only">E-qode</span>
                      </Link>
                      <Link
                        href="#"
                        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                      >
                        <Home className="h-5 w-5" />
                        Dashboard
                      </Link>



                      {/* <Link
                        href="/dashboard/write"
                        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                      >
                        <BsPencilSquare className="h-5 w-5" />
                        Write
                      </Link>
                      <Link
                        href="/dashboard/raport"
                        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                      >
                        <HiDocumentReport className="h-5 w-5" />
                        Raport
                      </Link> */}
                    </nav>
                  </SheetContent>
                </Sheet>
                <DynamicBreadcrumb />
                <div className="relative ml-auto flex-1 md:grow-0">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                  />
                </div>
                <NavbarProfile />
              </header>
              <main className="p-2">
                <div className="w-full">
                  {data ?
                    <>
                      {children}
                    </>
                    : (
                      <div>
                        <CompleteProfileData />
                      </div>
                    )}
                </div>
                <Toaster />
              </main>
            </div>
          </Providers>
        </div>
     

  )
}
