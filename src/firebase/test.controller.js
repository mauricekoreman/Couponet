import { collection, addDoc, getDocs, setDoc, doc } from "firebase/firestore";
import { db } from "./firebase.config";

async function writeTest() {
  try {
    // const docRef = await addDoc(collection(db, "test"), {
    //   first: "Maurice",
    //   last: "Koreman",
    //   born: 1999,
    // });
    // console.log("Document written with ID: ", docRef.id);
    await setDoc(doc(db, "test", "testName"), {
      email: "dikke koe jonge",
      name: "etienne",
      linked: null,
    });
    console.log("Document written!");
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
