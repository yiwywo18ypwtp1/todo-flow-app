import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";
import SideNavbar from "@/components/SideNavbar";
import { TooltipProvider } from "@/components/ui/tooltip";


const exo2 = Exo_2({
    subsets: ["latin"],
    weight: ["400", "900"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "TODO Flow",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <TooltipProvider delayDuration={1}>
            <div className="flex flex-row w-full max-h-screen h-screen">
                <SideNavbar />
                {children}
            </div>
        </TooltipProvider>
    );
}
