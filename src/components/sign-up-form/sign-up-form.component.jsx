import { useState } from "react"
import FormInput from "../form-input/form-input.component"
import { createAuthUserWithEmailAndPassword,createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils" 
import './sign-up-form.styles.scss'
import Button from "../button/button.component"

const defaultFormFields={
    displayName:'',
    email:'',
    password:'',
    confirmPassword:''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const {displayName,email,password,confirmPassword}=formFields;
    console.log('--> SignUpForm', formFields)

    const resetFormFields=()=>{
        setFormFields(defaultFormFields)
    }

    const handleSubmmit=async(event)=>{
        event.preventDefault()
        if(password !==confirmPassword) {
            alert('passwords do not match'); 
            return;
        }
        try {
            //Firebase returns always the same structure no matters the authentication method
            const {user} = await createAuthUserWithEmailAndPassword(email, password)
            console.log('--> handleSubmmit: user is: ',user)
            await createUserDocumentFromAuth(user,{displayName})
            resetFormFields()

        } catch (error) {
            if (error.code==='auth/email-already-in-use') {
                alert('Cannot create user, email already in use')
            } else {
                console.log('User creation encountered an error: ',error)
            }
        }

    }

    const handleChange =(event) =>{
        const {name,value} = event.target;
        setFormFields({...formFields,[name]:value})

    }
  return (
    <div className="sign-up-container">
        <h2>Don't have an account?</h2>
        <span>Sign up with your email and password</span>
        <form onSubmit={handleSubmmit}> 
            <FormInput label="Display Name"
            name="displayName" type="text" required onChange={handleChange}  value={displayName}/>
            <FormInput label="Email"
            name="email"type="email"required onChange={handleChange}  value={email}/>
            <FormInput label="Password"
            name="password" type="password"required onChange={handleChange}  value={password}/>
            <FormInput label="Confirm Password"
            name="confirmPassword"  type="password"required onChange={handleChange} value={confirmPassword}/>
            <Button buttonType="google" type="submit">Sign Up</Button>
        </form>
    </div>
  )
}

export default SignUpForm