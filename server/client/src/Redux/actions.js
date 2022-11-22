export const currentUserToState = (username) => {
  return {
    type: 'currentUserToState',
    payload: username
  }
}