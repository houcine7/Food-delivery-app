import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDvSeI28JUTZkmEpjrKMVQubjMYLAxVCXI",
  authDomain: "foodapp-b3768.firebaseapp.com",
  databaseURL: "https://foodapp-b3768-default-rtdb.firebaseio.com",
  projectId: "foodapp-b3768",
  storageBucket: "foodapp-b3768.appspot.com",
  messagingSenderId: "96938462779",
  appId: "1:96938462779:web:009412e3cdba59c8a7d61e",
};

const app = getApps() > 0 ? getApp() : initializeApp(firebaseConfig);

const databaseFirebase = getFirestore(app);

const storage = getStorage(app);

export { app, databaseFirebase, storage };
