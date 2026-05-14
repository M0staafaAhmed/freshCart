"use client"
import { SessionProvider } from 'next-auth/react'
import React from 'react'

export default function MySissionProvider({ children }: any) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}
