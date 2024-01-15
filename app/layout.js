"use client";
import { Nunito } from "next/font/google";
import "./globals.css";

const inter = Nunito({ subsets: ["latin"], variable: "--Nunito" });

import { Provider } from "react-redux";
import { store } from "./redux/store";

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <html lang="en" className={`${inter.variable}`}>
        <body className="font-Nunito">{children}</body>
      </html>
    </Provider>
  );
}
