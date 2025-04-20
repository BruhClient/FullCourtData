import type { Metadata } from "next";
import { Geist_Mono, Sofia_Sans } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from 'react-hot-toast';
import Navbar from "@/components/common/Navbar";
import ReactQueryProvider from "@/components/ReactQueryProvider";

const sofiaSans = Sofia_Sans({
  variable: "--font-sofia-sans",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "Full Court Data",
  description: "NBA Dashboard for Geeks",
  icons :{
    icon : "/icon.svg"
  },
  keywords : ["NextJs" , "TypeScript","JavaScript"], 
  metadataBase : new URL("https://www.maniacalai.com"), 
  twitter : { 
    card: "summary_large_image", 
    creator : "@TravisAng", 
    title : "Full Court Data | NBA Dashboard for Geeks", 
    description : "View NBA differently", 
    
  }, 
  openGraph : { 
    title : "Full Court Data | NBA Dashboard for Geeks", 
    description : "View NBA differently", 
    siteName :"Recursion Error",
  

  }
};

export default function RootLayout({
  children,
  authModal 
}: Readonly<{
  children: React.ReactNode;
  authModal : React.ReactNode,
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      
      <body
        className={`${sofiaSans.variable} font-sans antialiased`}
      >
        <ThemeProvider 
        attribute="class"
        defaultTheme="light"
        
        
        >
          <ReactQueryProvider>

          
          
        <SessionProvider>
          <Navbar />
          {authModal}
          {children}
          <Toaster />
  
        </SessionProvider>

        </ReactQueryProvider>

        
        </ThemeProvider>
      </body>

      
    </html>
  );
}
