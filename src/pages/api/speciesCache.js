// pages/api/speciesCache.js
import { initAdmin } from '../../../firebaseAdmin';

let speciesData = null;

export default async function handler(req, res) {
  if (req.method === 'GET') {
    if (speciesData) {
      res.status(200).json(speciesData);
    } else {
      try {
        const app = await initAdmin();
        const db = app.firestore();
        const speciesSnapshot = await db.collection('species').get();
        speciesData = speciesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        res.status(200).json(speciesData);
      } catch (error) {
        console.error('Error fetching species data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  } else if (req.method === 'POST') {
    try {
      const app = await initAdmin();
      const db = app.firestore();
      const speciesSnapshot = await db.collection('species').get();
      speciesData = speciesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      res.status(200).json({ message: 'Species cache updated successfully' });
    } catch (error) {
      console.error('Error updating species cache:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}