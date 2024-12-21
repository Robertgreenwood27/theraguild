import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/lib/supabaseClient';
import HeaderTwo from '@/components/HeaderTwo';
import { SpeciesForm } from '@/components/species/SpeciesForm';

export async function getServerSideProps(context) {
  const { slug } = context.params;

  try {
    const { data: speciesData, error } = await supabase
      .from('species')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;

    if (!speciesData) {
      return { notFound: true };
    }

    return {
      props: {
        species: speciesData,
      },
    };
  } catch (error) {
    console.error('Error fetching species data:', error);
    return { notFound: true };
  }
}

const EditSpeciesPage = ({ species }) => {
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
        <h1 className="text-2xl font-bold mb-4 text-white">Edit Species</h1>
        <div className="bg-zinc-900 p-6 rounded-lg shadow-xl">
          <SpeciesForm 
            mode="edit" 
            initialData={species} 
          />
        </div>
      </div>
    </>
  );
};

export default EditSpeciesPage;
