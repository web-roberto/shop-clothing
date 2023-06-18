import {useEffect} from 'react';
import {getRedirectResult} from 'firebase/auth'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

import {auth, signInWithGooglePopup,signInWithGoogleRedirect, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils'

const SignIn = () => {
  useEffect(()=>{
    const calltoFunction=async()=>{
        const response= await getRedirectResult(auth)
        console.log(response)
        if (response) {
            const userDocRef= await createUserDocumentFromAuth(response.user)
        }
    }
    calltoFunction()
  },[])
  //el logearse con un email es asíncrono
  const logGoogleUser =async ()=>{
    //returns all mi info from Google and even the access_token from Firebase
    const response = await signInWithGooglePopup()
    //console.log(response)
    const userDocRef= await createUserDocumentFromAuth(response.user)
  }

  return (
    <div>
        <h1>Sign in</h1>
        <button onClick={logGoogleUser}>Sign in with Google Popup</button>
        <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button>
        <SignUpForm />

    </div>
  )
}

export default SignIn