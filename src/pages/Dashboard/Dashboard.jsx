import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/authService";


export const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser(); // Llamar a la función de logout
        navigate('/'); // Redirigir al login después de cerrar sesión
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}
