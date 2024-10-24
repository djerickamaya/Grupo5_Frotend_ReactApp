import { Link } from "react-router-dom"


export const Home = () => {
  return (
    <div>
        <h1>Home</h1>
        <button><Link to="/login">Login</Link></button>
        <button><Link to="/register">Register</Link></button>
    </div>

  )
}

