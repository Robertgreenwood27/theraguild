import { useRouter } from 'next/router';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import HeaderTwo from "@/components/HeaderTwo";

export default function LoginSignupPage() {
  const router = useRouter();
  const auth = getAuth();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // Show success message
      alert('Login successful!');
      // Redirect to the home page
      router.push('/');
    } catch (error) {
      console.error("Google Sign-in Error:", error);
      // Show error message
      alert('Login failed. Please try again.');
    }
  };

  return (
    <>
      <HeaderTwo />
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-900">
        <div className="bg-black p-8 rounded shadow-md w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-center text-white">Sign In / Sign Up</h1>
          <div className="space-y-4">
            <button
              onClick={handleGoogleLogin}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign In / Sign Up with Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
}