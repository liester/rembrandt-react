import firebase from 'firebase';
const config = {
  apiKey: 'AIzaSyBMqOH3UH86AX4Sx91eb4apmpIB8V0I3IE',
  authDomain: 'jessica-3a11f.firebaseapp.com',
};

const app = firebase.initializeApp(config);
// firebase_ has the auth function on it.
export default app.firebase_;
