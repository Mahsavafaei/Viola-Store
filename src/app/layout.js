
import NavBar from "@/components/layout/NavBar";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import NextAuthProvider from "@/components/layout/NextAuthProvider";






export const metadata = {
  title: "Viola | ",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      
        <NextAuthProvider>
        <body>
        <NavBar/>
        {children}
        <Footer/>
        </body>
        </NextAuthProvider>
      
    </html>
  );
}
