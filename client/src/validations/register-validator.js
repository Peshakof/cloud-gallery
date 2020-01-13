import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function registerValidator(username, password, confirmPass) {
  
  if(username === '' || username.length < 4) {
    toast.error('Username must be at least 4 characters long!');
    return false;
  }
  
  if(password.length < 6) {
    toast.error('Password must be at least 6 characters long!');
    return false;
  }
  
  if(password !== confirmPass) {
    toast.error('Passwords do not match!');
    return false;
  }

  // if(image === '') {
  //   toast.error('avatar is required');
  //   return false;
  // }

  return true;
}

export default registerValidator;
