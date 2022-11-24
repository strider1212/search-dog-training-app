import jwt_decode from "jwt-decode";

export const RetrieveCurrentUsernameFromToken = () => {
  const token = localStorage.getItem('token')
  const decoded = jwt_decode(token);
  const decodedUsername = decoded.username
  return decodedUsername
}