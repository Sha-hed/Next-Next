import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import AuthProvider from "@/services/AuthProvider";
import { ToastContainer } from "react-toastify";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Car Doctor",
    template: "%s | Car Doctor",
  },
  description: "Car Repearing Workshop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="carDoctorTheme">
      <body className={inter.className}>
        <AuthProvider>
          <ToastContainer />
          <Suspense>
            <div className="max-w-7xl mx-auto">
              <Navbar></Navbar>

              {children}
              <Footer></Footer>
            </div>
          </Suspense>
        </AuthProvider>
      </body>
    </html>
  );
}
