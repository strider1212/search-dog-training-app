export const PassTokenFromLocalStorageInHeaders = () => {
  const tokenFromLocalStorage = localStorage.getItem('token')

  return {
    headers: {
      authorization: tokenFromLocalStorage
    }
  }
}