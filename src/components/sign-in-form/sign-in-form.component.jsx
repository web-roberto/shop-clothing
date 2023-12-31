import { useState,
//I use Listener instead:    useContext 
} from "react"
import FormInput from "../form-input/form-input.component"
import { 
    // to REDIRECT: createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    // to REDIRECT: signInWithGoogleRedirect,
    signInAuthUserWithEmailAndPassword} from "../../utils/firebase/firebase.utils" 

import './sign-in-form.styles.scss'
import Button from "../button/button.component"
//I use Listener instead: import { UserContext } from "../../contexts/user.context"

const defaultFormFields={
    email:'',
    password:'',
}


const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const {email,password}=formFields;
    //I use Listener instead: const {setCurrentUser} = useContext(UserContext)
    //console.log('--> SignUpForm', formFields)

    const resetFormFields=()=>{
        setFormFields(defaultFormFields)
    }
    const signInWithGoogle =async ()=>{
        //returns all mi info from Google and even the access_token from Firebase
        const {user} = await signInWithGooglePopup()
        //I use Listener instead: setCurrentUser(user)
        //console.log(response)
        //I use Listener instead I put it in user.context.jsx:  await createUserDocumentFromAuth({user})
      }
 
    //to REDIRECT:  <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button>
      

    const handleSubmmit=async(event)=>{
        event.preventDefault()
      
        try {
            const {user}= await signInAuthUserWithEmailAndPassword(email,password)
            //console.log('--> response', response)
           //I use Listener instead: setCurrentUser(user)
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                      alert('Incorrect password')
                    break;
                case 'auth/user-not-found':
                      alert('No user associated with this email')
                    break;
                default:
                    console.log('User sign in encountered an error: ',error)
                    break;
            }

        }

    }

    const handleChange =(event) =>{
        const {name,value} = event.target;
        setFormFields({...formFields,[name]:value})

    }
  return (
    <div className="sign-up-container">
        <h2>Already have an account?</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={handleSubmmit}> 
            <FormInput label="Email"
            name="email"type="email"required onChange={handleChange}  value={email}/>
            <FormInput label="Password"
            name="password" type="password"required onChange={handleChange}  value={password}/>
           <div className="buttons-container">
            <Button type="submit">Sign In</Button>
            <Button type='button' buttonType="google" onClick={signInWithGoogle}>Google Sign In</Button>
           </div>
        
        </form>
    </div>
  )
}

export default SignInForm