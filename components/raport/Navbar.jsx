"use client";
import { ChevronsDown,  Menu } from "lucide-react";
import { ImFileText } from "react-icons/im";
import React from "react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";






const routeList = [
    {
        href: "#benefits",
        label: "Benefits",
    },
    {
        href: "#features",
        label: "Fitur",
    },
    {
        href: "#example",
        label: "Contoh Raport",
    },
];



export const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <header className=" bg-opacity-15 top-0 mx-auto sticky border border-secondary z-40  flex justify-between items-center p-2 bg-card">
            <Link href="/raport" className="font-bold text-lg flex items-center">
                <ImFileText className=" w-9 h-9 mr-2 bg-gradient-to-r from-blue-400 to-indigo-900 p-2 rounded-md text-white" />
                RaportID
            </Link>
            {/* <!-- Mobile --> */}
            <div className="flex items-center lg:hidden">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Menu
                            onClick={() => setIsOpen(!isOpen)}
                            className="cursor-pointer lg:hidden"
                        />
                    </SheetTrigger>

                    <SheetContent
                        side="left"
                        className="flex flex-col justify-between rounded-tr-2xl rounded-br-2xl bg-card border-secondary"
                    >
                        <div>
                            <SheetHeader className="mb-4 ml-4">
                                <SheetTitle className="flex items-center">
                                    <Link href="/" className="flex items-center">
                                        <ImFileText className=" w-9 h-9 mr-2 bg-gradient-to-r from-blue-400 to-indigo-900 p-2 rounded-md text-white" />
                                        RaportID
                                    </Link>
                                </SheetTitle>
                            </SheetHeader>

                            <div className="flex flex-col gap-2">
                                {routeList.map(({ href, label }) => (
                                    <Button
                                        key={href}
                                        onClick={() => setIsOpen(false)}
                                        asChild
                                        variant="ghost"
                                        className="justify-start text-base"
                                    >
                                        <Link href={href}>{label}</Link>
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            {/* <!-- Desktop --> */}
            <NavigationMenu className="hidden lg:block mx-auto">
                <NavigationMenuList>
                    

                    <NavigationMenuItem>
                        {routeList.map(({ href, label }) => (
                            <NavigationMenuLink key={href} asChild>
                                <Link href={href} className="text-base px-2">
                                    {label}
                                </Link>
                            </NavigationMenuLink>
                        ))}
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>

            <div className="hidden lg:flex">

                <Button asChild className="bg-blue-600 hover:bg-blue-300">
                    <Link
                        href="#"
                        
                    >
                        Sign In
                    </Link>
                </Button>
            </div>
        </header>
    );
};