import "@/styles/globals.css";
import { AuthProvider } from '../components/AuthProvider'; // Update this path with the path to your AuthProvider component

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}


