import { useForm } from 'react-hook-form';
import { registerUser } from '../../../services/authService';
import { Link, useNavigate } from 'react-router-dom';

export const Register = () => {
    const { register, handleSubmit, setError, formState : {errors} } = useForm();
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
        <form className='Form__estilos'onSubmit={handleSubmit(onSubmit)}>
            <h1 className='Inicio_Titulo'>Registrarse</h1>
            <label>Username</label>
            <input placeholder="Usuario" {...register('username', 
            {required: {
                value : true,
                message : "El campo usuario no puede quedar vacio"
            }})} />
            {
                errors.username && <span className='Errors'>{errors.username.message}</span>
            }
            <label>Contraseña</label>
            <input type="password" placeholder="Contraseña" {...register('password', {required : {
                value : true,
                message : "El campo de contraseña no puede quedar vacio"
            }})} />
            {
                errors.password && <span className='Errors'>{errors.password.message}</span>
            }
            <button type="submit" className='btn-modificador'>Registrar</button>
            <Link to="/login" className='Link__Estilos'>Ya tienes cuenta? Inicia sesion</Link>
        </form>
    );
};