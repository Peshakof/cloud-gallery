import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function signInValidator(username, password) {
  if(username === '') {
    toast.error('You must fill the username field!');
    return false;
  }
  
  if(password === '') {
    toast.error('You must fill the password field!');
    return false;
  }
  return true;
}

export default signInValidator;