export const HeaderInsert = () => {
  return (
    {headers: {Authorization: localStorage.getItem('token')}}
  )
}