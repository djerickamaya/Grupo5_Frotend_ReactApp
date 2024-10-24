import { useForm } from 'react-hook-form';
import { registerUser } from '../../../services/authService';
import { Link, useNavigate } from 'react-router-dom';

export const Register = () => {
    const { register, handleSubmit, setError } = useForm();
    const navigate = useNavigate(); // Hook para navegar

    const onSubmit = async (data) => {
        try {
            await registerUser(data);
            alert('Usuario registrado correctamente');
            navigate('/login'); // Cambia a useNavigate
        } catch (error) {
            console.error('Error en el registro', error);
            setError('username', { type: 'manual', message: 'El usuario ya existe' });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('username')} placeholder="Usuario" required />
            <input {...register('password')} type="password" placeholder="Contraseña" required />
            <button type="submit">Registrar</button>
            <Link to="/login">Ya tienes cuenta? Inicia sesion</Link>
        </form>
    );
};