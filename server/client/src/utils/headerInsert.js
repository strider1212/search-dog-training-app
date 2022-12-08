export const HeaderInsert = () => {
  return (
    {headers: {authorization: localStorage.getItem('token')}}
  )
}