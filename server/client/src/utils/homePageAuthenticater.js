import axios from 'axios';
import { HeaderInsert } from '../utils/headerInsert';
import { AuthorizationAlert } from '../utils/authorizationAlert';
export const HomePageAuthenticater = () => {
  const authenticationStatus = axios.post('http://localhost:3000/logs/defaultAutRequest', {something: 'something'}, HeaderInsert())
  
  let holder = []
  
  authenticationStatus
  .then(res => holder.push(res.status))
  .then(console.log(holder[0]))

  

  // .then(() => console.log('authenticated through HomePageAuthenticater')) 
  // .catch(error => {
  //   AuthorizationAlert(error)
  //   if (error.response) {
  //     console.log('error.response.data', error.response.data);
  //     console.log('error.response.status', error.response.status);
  //     console.log('error.response.headers', error.response.headers);
  //   } else if (error.request) {
  //     console.log('error.request', error.request);
  //   } else {
  //     console.log('error.message', error.message);
  //   }
  //   console.log('error.config', error.config);
  // })
}