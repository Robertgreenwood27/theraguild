// pages/api/species/[id].js
import { initAdmin } from '../../../../firebaseAdmin';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { id } = req.query;
    console.log('Updating species with ID:', id);
    console.log('Request body:', req.body);

    try {
      const app = await initAdmin();
      const db = app.firestore();

      const speciesRef = db.collection('species').doc(id);
      await speciesRef.update(req.body);

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