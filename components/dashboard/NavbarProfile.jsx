'use client'
import Image from "next/image"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { signOut, useSession } from "next-auth/react"
import { Button } from "../ui/button"
import Link from "next/link"

const NavbarProfile = () => {
    const {data:{user}} = useSession()
   
    
    return (
        <><DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="overflow-hidden rounded-full"
                >
                    <Image
                        src={user.image}
                        width={36}
                        height={36}
                        alt={user.name}
                        className="overflow-hidden rounded-full"
                       
                    />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuLabel><Link href={"/dashboard/story"}>Story</Link></DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu></ >
    )
}

export default NavbarProfile