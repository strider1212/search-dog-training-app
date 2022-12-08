import axios from 'axios';
import { HeaderInsert } from '../utils/headerInsert';
export const HomePageAuthenticater = () => {
  const authenticationStatus = axios.post('http://localhost:3000/logs/defaultAutRequest', {something: 'something'}, HeaderInsert())
  
  let holder = []
  
  authenticationStatus
  .then(res => holder.push(res.status))
  .then(console.log(holder[0]))
}