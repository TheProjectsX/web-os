"use client";

import { OSProvider } from "@/context/OSContext";
import "./globals.css";
import OSWrapper from "@/components/osWrapper";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <OSProvider>
                <body className="font-ubuntu flex justify-center items-start bg-blue-500">
                    <OSWrapper>{children}</OSWrapper>
                </body>
            </OSProvider>
        </html>
    );
}
