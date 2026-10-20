import type { Metadata, Viewport } from "next";
import "@fontsource-variable/playfair-display/wght.css";
import "@fontsource-variable/playfair-display/wght-italic.css";
import "@fontsource-variable/inter";
import "./globals.css";
import EnquiryProvider from "@/components/common/EnquiryProvider";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export const metadata: Metadata = {
  title: "Acumen Interiors | Premium Interior Design & Turnkey Interiors in Gurugram",
  description:
    "Acumen Interiors crafts beautiful, functional and timeless homes and workspaces in Gurugram — from concept to handover.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f8f6f1",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <EnquiryProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </EnquiryProvider>
      </body>
    </html>
  );
}
