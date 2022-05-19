import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase.config";

async function writeTest() {
  try {
    const docRef = await addDoc(collection(db, "test"), {
      first: "Maurice",
      last: "Koreman",
      born: 1999,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function readTests() {
  const querySnapshot = await getDocs(collection(db, "test"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data}`);
  });
}

export { writeTest, readTests };
