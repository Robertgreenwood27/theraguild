import "@/styles/globals.css";
import { AuthProvider } from '../components/AuthProvider';
import { Analytics } from "@vercel/analytics/react";

export default function App({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
      <Analytics />
    </>
  );
}