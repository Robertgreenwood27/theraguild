// pages/addSpecies.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../components/AuthProvider';
import HeaderTwo from '@/components/HeaderTwo';
import { SpeciesForm } from '@/components/species/SpeciesForm';

const AddSpeciesPage = () => {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  if (authLoading) {
    return (
      <>
        <HeaderTwo />
        <div className="container mx-auto px-4 py-8">
          <div className="text-white text-center">Loading...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <HeaderTwo />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4 text-white">Add New Species</h1>
        <div className="bg-zinc-900 p-6 rounded-lg shadow-xl">
          <SpeciesForm mode="add" user={user} />
        </div>
      </div>
    </>
  );
};

export default AddSpeciesPage;