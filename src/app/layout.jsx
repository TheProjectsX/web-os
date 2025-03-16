import { SettingsProvider } from "@/context/settings";
import "./globals.css";
import OSWrapper from "@/components/OSWrapper";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="">
                <SettingsProvider>
                    <OSWrapper>{children}</OSWrapper>
                </SettingsProvider>
            </body>
        </html>
    );
}
