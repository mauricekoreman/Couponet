import { collection } from "firebase/firestore";
import { db } from "./firebase.config";

export const coupons = collection(db, "coupons");
export const stickersCol = collection(db, "stickers"); 