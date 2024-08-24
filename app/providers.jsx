'use client'
import { SessionProvider } from "next-auth/react"
import {
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'


export default function Providers({ session, children }) {
    const queryClient = new QueryClient()
    return (
        <SessionProvider session={session}>
            <QueryClientProvider client={queryClient}>

            {children}
            </QueryClientProvider>
        </SessionProvider>
    )
}