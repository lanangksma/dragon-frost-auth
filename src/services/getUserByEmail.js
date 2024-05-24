const { Firestore } = require('@google-cloud/firestore');

const getUserByEmail = async (email) => {
    const db = new Firestore({
        projectId: 'dragon-frost',
        databaseId: 'users',
    });

    try {
        const usersCollection = db.collection('users');
        const query = usersCollection.where('email', '==', email).limit(1); // Filter berdasarkan email

        const snapshot = await query.get();

        if (snapshot.empty) {
            console.log('No matching documents.');
            return null; // Kembalikan null jika tidak ditemukan pengguna dengan email yang cocok
        }

        // Ambil data pengguna pertama yang cocok dengan email
        const userData = snapshot.docs[0].data();
        const userId = snapshot.docs[0].id;

        return {
            id: userId,
            email: userData.email,
            password: userData.password,
        };
    } catch (error) {
        console.error('Error retrieving user data:', error);
        throw new Error('Failed to retrieve user data');
    }
};

module.exports = getUserByEmail;
