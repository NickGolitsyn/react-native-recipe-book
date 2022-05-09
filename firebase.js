import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore, serverTimestamp} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAJ3Anciji7zVI4hap-HKXNu599rj6TCwU",
  authDomain: "nuxtrn.firebaseapp.com",
  projectId: "nuxtrn",
  storageBucket: "nuxtrn.appspot.com",
  messagingSenderId: "484891377579",
  appId: "1:484891377579:web:cb21e5d39f338239239cee"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const db = getFirestore(app);

const timestamp = serverTimestamp()
// const timestamp = Timestamp

export { auth, db, timestamp }