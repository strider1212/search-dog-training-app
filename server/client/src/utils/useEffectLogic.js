import axios from 'axios';

export const useEffectLogic = (useRefState, errorState, path, postObject, thenFunc) => {
  if(useRefState.current) {
    useRefState.current = false;
  } else if (Object.keys(errorState).length > 0) {
    alert('One or more of the request categories was not filled in. Please fill in any missing categories.')
  } else {
    const postForm = async () => {
      await axios.post(`http://localhost:3000${path}`, postObject)
      .then(thenFunc)
      .catch(error => {
        if (error.response) {
          console.log('error.response.data', error.response.data);
          console.log('error.response.status', error.response.status);
          console.log('error.response.headers', error.response.headers);
        } else if (error.request) {
          console.log('error.request', error.request);
        } else {
          console.log('error.message', error.message);
        }
        console.log('error.config', error.config);
      })
  
      console.log('Log submitted')
    }
    postForm()
  }
}