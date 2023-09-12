require('dotenv').config();

const FIREBASE_ADMIN_PRIVATE_KEY=process.env.FIREBASE_ADMIN_PRIVATE_KEY;
const FIREBASE_ADMIN_CLIENT_EMAIL=process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
const FIREBASE_PROJECT_ID=process.env.FIREBASE_PROJECT_ID;
const PORT=process.env.PORT;

const admin = require('firebase-admin');
const firebase = admin.initializeApp({
    credential: admin.credential.cert({
        privateKey: FIREBASE_ADMIN_PRIVATE_KEY,
        clientEmail: FIREBASE_ADMIN_CLIENT_EMAIL,
        projectId: FIREBASE_PROJECT_ID
    }),
    databaseURL: `https://${FIREBASE_PROJECT_ID}.firebaseio.com`
});

const express = require('express');
const app = express();

app.use(express.json());

app.post('/verifyToken', async (req, res) => {
    const idToken = req.body.token;
    try {
        const decodedToken = await firebase.auth().verifyIdToken(idToken);
        res.json(decodedToken);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});