import firebase from 'firebase/app';
import 'firebase/firestore';

import config from './firebaseConfig';

firebase.initializeApp(config);
const db = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true };
db.settings(settings);

export const listenForItemChanges = callback => {
  return db.collection('items').onSnapshot(querySnapshot => {
    const items = [];
    querySnapshot.forEach(function(doc) {
      items.push({ id: doc.id, ...doc.data() });
    });
    callback(items);
  });
};
