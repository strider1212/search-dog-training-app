import { useNavigate } from "react-router-dom";

const ViewAllLogs = () => {
  const navigate = useNavigate()

  return (
    <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>Go Back</button>
  )
}

export default ViewAllLogs;