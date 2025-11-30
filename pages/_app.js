import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Navbar />
      <main className="max-w-4xl mx-auto p-6">
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
}
