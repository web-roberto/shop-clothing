import {signInWithGooglePopup,createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils'

const SignIn = () => {
  //el logearse con un email es asíncrono
  const logGoogleUSer =async ()=>{
    //returns all mi info from Google and even the access_token from Firebase
    const response = await signInWithGooglePopup()
    console.log(response)
    const userDocRef= await createUserDocumentFromAuth(response.user)
  }

  return (
    <div>
        <h1>Sign in</h1>
        <button onClick={logGoogleUSer}>
            Sign in with Google Popup
        </button>
    </div>
  )
}

export default SignIn