import {
  doc,
  setDoc,
  query,
  collection,
  orderBy,
  getDocs,
} from "firebase/firestore";

import { databaseFirebase } from "./firebase.config";

//saving new item to firebase :

export const saveItem = async (data) => {
  await setDoc(doc(databaseFirebase, "foodItems", `${Date.now()}`), data, {
    merge: true,
  });
};

// get items date from database :

export const getItems = async () => {
  const items = await getDocs(
    query(collection(databaseFirebase, "foodItems"), orderBy("id", "desc"))
  );
  //
  return items.docs.map((doc) => doc.data());
};
