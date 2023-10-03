import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ReactQueryProvider from "@/utils/ReactQueryProvider";
import { ThemeProvider } from "@/_components/ThemeProvide";
import NextAuthSessionProvider from "@/utils/AuthProvider";
import { getServerSession } from "next-auth";
import SessionProvider from "@/utils/SessionProvider";
import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VSE Solar Panel",
  description: "Beyond ",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html
      lang="en"
      style={{ colorScheme: "light" }}
      suppressHydrationWarning
      // className={classNames(fontSans.variable, "light")}
    >
      <body className={inter.className}>
        <ReactQueryProvider>
          {/* <NextAuthSessionProvider> */}
          <SessionProvider session={session}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {children}
              <Toaster />
            </ThemeProvider>
          </SessionProvider>
          {/* </NextAuthSessionProvider> */}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
