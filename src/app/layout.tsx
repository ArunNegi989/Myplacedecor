import type { Metadata, Viewport } from "next";
import "@fontsource-variable/playfair-display/wght.css";
import "@fontsource-variable/playfair-display/wght-italic.css";
import "@fontsource-variable/inter";
import "./globals.css";
import EnquiryProvider from "@/components/common/EnquiryProvider";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import RouteScrollReset from "@/components/common/RouteScrollReset";

export const metadata: Metadata = {
  title: "MyPlaceDecore | Premium Interior Design & Home Decor",
  description:
    "MyPlaceDecore transforms homes and workspaces with elegant interior design, stylish home decor, and thoughtfully designed spaces tailored to your lifestyle.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f8f6f1",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // data-scroll-behavior: lets Next disable the global smooth scrolling during
    // route changes (Next 16 no longer does this by default), so in-page anchors stay smooth
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <EnquiryProvider>
          <Header />
          <main>{children}</main>
          <RouteScrollReset />
          <Footer />
          <WhatsAppButton />
        </EnquiryProvider>
      </body>
    </html>
  );
}
