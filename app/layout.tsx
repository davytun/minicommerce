import { Providers } from "./providers";
import Header from "@/components/Header";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <main className="pt-24 pb-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
