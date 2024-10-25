import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../../../services/authService';
import '../../../assets/css/Login.css'

export const Login = () => {

    const { register, handleSubmit, setError, formState : {errors} } = useForm();
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
            <form className='Form__estilos' onSubmit={handleSubmit(onSubmit)}>
                <h1 className='Inicio_Titulo'>Iniciar sesion</h1>
                <label className='estilos__label'>Username</label>
                <input placeholder="Usuario"{...register('username', 
                {required : {
                    value : true,
                    message : "El campo de usuario no puede quedar vacio"
                }})}/>
                {
                    errors.username && <span className='Errors'>{errors.username.message}</span>
                }
                <label htmlFor="">Contraseña</label>
                <input type="password" placeholder="Contraseña" {...register('password', 
                {required : {
                    value : true,
                    message : "El campo de contraseña no puede quedar vacio"   
                }})}/>
                {
                    errors.password && <span className='Errors'>{errors.password.message}</span>
                }
                <button type="submit" className='btn-modificador'>Iniciar Sesión</button>
                <Link to="/register" className='Link__Estilos'>No tienes cuenta? Registrate</Link>
            </form>
        </>
    )
}
