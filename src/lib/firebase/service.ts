import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import app from "./init";

const firestore = getFirestore(app);

export async function retriveData(collectionName: string) {
  const snapshot = await getDocs(collection(firestore, collectionName));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}

export async function retriveDataById(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(firestore, collectionName, id));
  const data = snapshot.data();
  return data;
}

export async function retriveDataByField(
  collectionName: string,
  field: string,
  value: string
) {
  const q = query(
    collection(firestore, collectionName),
    where(field, "==", value)
  );
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}
export async function addData(
  collectionName: string,
  data: any,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  callback: Function
) {
  await addDoc(collection(firestore, collectionName), data)
    .then((res) => {
      callback(true, res);
    })
    .catch((error) => {
      callback(false);
      console.log(error);
    });
}

export async function updateData(
  collectionName: string,
  id: string,
  data: any,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  callback: Function
) {
  const docRef = doc(firestore, collectionName, id);
  await updateDoc(docRef, data)
    .then(() => {
      callback(true);
    })
    .catch((error) => {
      callback(false);
    });
}

export async function deleteData(
  collectionName: string,
  id: string,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  callback: Function
) {
  const docRef = doc(firestore, collectionName, id);
  await deleteDoc(docRef)
    .then(() => {
      callback(true);
    })
    .catch((error) => {
      callback(false);
    });
}
