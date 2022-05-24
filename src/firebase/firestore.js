import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase.config";

async function registerNewUser(email, password, name, setError) {
  if (name === "" || email === "" || password === "") {
    setError("Name, email and password are mandatory.");
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, email, password).then(async (user) => {
      await setDoc(doc(db, "users", user.user.uid), {
        email: email,
        name: name,
        linked: null,
      });
    });
  } catch (error) {
    setError(error.code);
  }
}

async function loginUser(email, password, setError) {
  if (email === "" || password === "") {
    setError("Email and password are mandatory.");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    setError(error.code);
  }
}

export { registerNewUser, loginUser };
