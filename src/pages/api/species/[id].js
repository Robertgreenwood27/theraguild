// pages/api/species/[id].js
import { supabase } from '@/lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { id } = req.query;
    console.log('Updating species with ID:', id);
    console.log('Request body:', req.body);

    try {
      const { data, error } = await supabase
        .from('species')
        .update(req.body)
        .eq('id', id);

      if (error) throw error;

      console.log('Species updated successfully');
      res.status(200).json({ message: 'Species updated successfully' });
    } catch (error) {
      console.error('Error updating species:', error);
      res.status(500).json({ message: 'Error updating species' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

// pages/api/species.js
import { supabase } from '@/lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const { data, error } = await supabase
        .from('species')
        .insert([req.body])
        .select();

      if (error) throw error;

      res.status(201).json({ message: 'Species added successfully', id: data[0].id });
    } catch (error) {
      console.error('Error adding species:', error);
      res.status(500).json({ message: 'Error adding species' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

// pages/api/speciesCache.js
import { supabase } from '@/lib/supabaseClient';
import { getCache } from '@/cacheService';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const cache = getCache();
    const cachedData = await cache.get('allSpecies');
    
    if (cachedData) {
      res.status(200).json(JSON.parse(cachedData));
    } else {
      try {
        const { data: speciesData, error } = await supabase
          .from('species')
          .select('*');

        if (error) throw error;

        await cache.set('allSpecies', JSON.stringify(speciesData), 'EX', 3600);
        res.status(200).json(speciesData);
      } catch (error) {
        console.error('Error fetching species data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  } else if (req.method === 'POST') {
    try {
      const { data: speciesData, error } = await supabase
        .from('species')
        .select('*');

      if (error) throw error;

      const cache = getCache();
      await cache.set('allSpecies', JSON.stringify(speciesData), 'EX', 3600);
      res.status(200).json({ message: 'Species cache updated successfully' });
    } catch (error) {
      console.error('Error updating species cache:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}