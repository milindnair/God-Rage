import { Inter,Nunito_Sans,Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Simplify.IO",
  description: "Generated by create next app",
};

export const poppins_init = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: '--font-poppins',
  weight: ['300','600']

})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins_init.variable}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
