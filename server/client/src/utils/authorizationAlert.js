export const AuthorizationAlert = (error) => {
  if(error.response.data === "Unauthorized") {
      alert('Must sign in to perform this action. Your session may have timed out. Please, sign back in and try again.')
    }
}