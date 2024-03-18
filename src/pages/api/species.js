// pages/api/species.js
import { initAdmin } from '../../../firebaseAdmin';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authorization.split('Bearer ')[1];

    try {
      const app = await initAdmin();
      const db = app.firestore();

      const decodedToken = await app.auth().verifyIdToken(token);
      const userId = decodedToken.uid;

      const {
        genus,
        species,
        description,
        altName,
        maxBodyLength,
        maxLegSpan,
        lifespan,
        distribution,
        habitat,
        temperament,
        urticatingSetae,
        venomPotency,
        keepingDifficulty,
        images,
        image,
        slug,
      } = req.body;

      const newSpecies = {
        genus,
        species,
        description,
        altName,
        maxBodyLength,
        maxLegSpan,
        lifespan,
        distribution,
        habitat,
        temperament,
        urticatingSetae,
        venomPotency,
        keepingDifficulty,
        images,
        image,
        slug,
        userId, // Add the user ID to the species document
      };

      // Add the new species to Firestore
      const docRef = await db.collection('species').add(newSpecies);
      res.status(201).json({ message: 'Species added successfully', id: docRef.id });
    } catch (error) {
      console.error('Error adding species:', error);
      if (error.code === 'auth/id-token-expired' || error.code === 'auth/argument-error') {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      res.status(500).json({ message: 'Error adding species' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}