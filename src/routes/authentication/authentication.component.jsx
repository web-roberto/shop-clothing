// to REDIRECT: import {useEffect} from 'react';
// to REDIRECT: import {getRedirectResult} from 'firebase/auth'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import './authentication.styles.scss'
// to REDIRECT:  import {auth,createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils'

const Authentication = () => {
  // to REDIRECT:
  // useEffect(()=>{
  //   const calltoFunction=async()=>{
  //       const response= await getRedirectResult(auth)
  //       console.log(response)
  //       if (response) {
  //           const userDocRef= await createUserDocumentFromAuth(response.user)
  //       }
  //   }
  //   calltoFunction()
  // },[])
  //el logearse con un email es asíncrono
 
  return (
    <div className='authentication-container'>
        <SignInForm />
        <SignUpForm />
    </div>
  )
}

export default Authentication