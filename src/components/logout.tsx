'use client';

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
    return (
        <Button onClick={() => signOut()} className="peer/menu-button flex w-full items-center gap-2 overflow-hidden px-4 py-6 text-left text-md rounded-none outline-none bg-primary hover:bg-gray-900 text-white uppercase font-semibold"
>
            Sair
        </Button>
    )
}