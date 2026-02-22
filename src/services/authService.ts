import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export async function register(email:string,password:string){

 const res = await createUserWithEmailAndPassword(auth,email,password);

 await setDoc(doc(db,"users",res.user.uid),{
   email,
   role:"user"
 });

}

export async function login(email:string,password:string){
 return signInWithEmailAndPassword(auth,email,password);
}