import { collection, doc } from "firebase/firestore";
import { auth, db } from "./firebase.config";
import { getAuth } from "firebase/auth";

console.log("collections 1!");
console.log(getAuth());

const userDocRef = doc(db, "users", auth.currentUser.uid);

console.log("collections!");

export const couponsGivenRef = collection(userDocRef, "coupons_given");
export const couponsReceivedRef = collection(userDocRef, "coupons_given");
