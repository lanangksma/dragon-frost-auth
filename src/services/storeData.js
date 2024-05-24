const {Firestore} = require('@google-cloud/firestore');

async function storeData(id, data) {
    const db = new Firestore({
      projectId: 'dragon-frost',
      databaseId: 'users',
    });
   
    const usersCollection = db.collection('users');
    return usersCollection.doc(id).set(data);
  }
   
  module.exports = storeData;