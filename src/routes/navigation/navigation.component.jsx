import { Outlet ,Link} from 'react-router-dom';
import CartIcon from '../../components/cart-icon/cart-icon-component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { Fragment,useContext } from 'react';
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg'
import './navigation.styles.scss'
import { UserContext } from "../../contexts/user.context"
import { CartContext } from "../../contexts/cart.context"

import { signOutUser } from '../../utils/firebase/firebase.utils';

const Navigation=()=>{
  const {currentUser,
    // I uso listener instead: setCurrentUser
  } = useContext(UserContext)
  console.log('--> el currentUser es: ',currentUser)
  const {isCartOpen,  } = useContext(CartContext)

  const signOutHandler =async ()=>{
    await signOutUser();
    // I use listener instead: setCurrentUser(null)
  }

  //todas las rutas serán hijas de la Navegación: todos los hijos se pintan en Outlet
    return (
      <Fragment>
        <div className='navigation'>
            <Link className='logo-container' to='/'>
                <CrwnLogo className='logo' />
            </Link>
            <div className='nav-links-container'>
                <Link className='nav-link' to='/shop'>SHOP</Link>
                {currentUser ?(<span className='nav-link' onClick={signOutHandler}>SIGN OUT</span>):
                (<Link className='nav-link' to='/auth'>SIGN IN</Link>)
                }
                <CartIcon />
            </div>
            {isCartOpen && <CartDropdown />}
        </div>
        <Outlet />
      </Fragment>
    )
   }
export default Navigation;