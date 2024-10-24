import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../../../services/authService';

export const Login = () => {

    const { register, handleSubmit, setError } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            await loginUser(data);
            navigate('/dashboard'); // Cambia a useNavigate
        } catch (error) {
            console.error('Error en el inicio de sesión', error);
            setError('username', { type: 'manual', message: 'Credenciales inválidas' });
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('username')} placeholder="Usuario" required />
                <input {...register('password')} type="password" placeholder="Contraseña" required />
                <button type="submit">Iniciar Sesión</button>
                <Link to="/register">No tienes cuenta? Registrate</Link>
            </form>
        </>
    )
}
