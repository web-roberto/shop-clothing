import {initializeApp} from 'firebase/app'// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getAuth, signInWithRedirect, signInWithPopup,GoogleAuthProvider,createUserWithEmailAndPassword } from 'firebase/auth'
// Your web app's Firebase configuration

//The DATABASE
import {
 getFirestore, doc, getDoc, setDoc
} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyD2dbbICrfZrpoLwC8Th_cQgZmpItI0RzI",
  authDomain: "shop-clothing-db-f5414.firebaseapp.com",
  projectId: "shop-clothing-db-f5414",
  storageBucket: "shop-clothing-db-f5414.appspot.com",
  messagingSenderId: "405088538658",
  appId: "1:405088538658:web:7e87d245cb058d8428ba7b"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const googleProvider= new GoogleAuthProvider();

//obligo a selecciona una cuenta:
googleProvider.setCustomParameters({
    prompt: "select_account"
})

export const auth=getAuth()
export const signInWithGooglePopup=() =>signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect=()=> signInWithRedirect(auth, googleProvider)
//The DataBase
export const db= getFirestore()
//userAuth es el resultado de autenticarme con Google con mi email y tiene toda mi información
export const createUserDocumentFromAuth = async(userAuth,additionalInformation={}) =>{  

    if (!userAuth) return;
    //1st I get de Ref (id of the Document)
    const userDocRef =doc(db,'users/'.concat('',userAuth.uid.toString())) //Firebase v9.22
    //2nd after getting the id of the Document, I read the document
    const userSnapshot = await getDoc(userDocRef)
    //To know if a document exists:

    if (!userSnapshot.exists()) {
        const {displayName, email} =userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef,{
                // if displayName is empty, it won't be empty inside additionalInformation (coming from SignUpForm)
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        } catch (error) {
            console.log('--> Error creating the user',error.message)
        }
    }
    return userDocRef; //if the users exists, do not create it
}

export const createAuthUserWithEmailAndPassword=async(email, password)=>{
    if (!email||!password) return;
    return await createUserWithEmailAndPassword(auth, email, password)
}