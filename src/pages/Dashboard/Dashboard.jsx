import React, { useEffect, useState } from 'react';
import { getBootcamps, createBootcamp, updateBootcamp, deleteBootcamp } from '../../services/bootcampService';
import '../../assets/css/Dashboard.css'; // Estilos para tu Dashboard

const Dashboard = () => {
    const [bootcamps, setBootcamps] = useState([]);
    const [error, setError] = useState(null);
    const [currentBootcamp, setCurrentBootcamp] = useState({ id: null, name: '', description: '', technologies: '' });

    const fetchBootcamps = async () => {
        try {
            const data = await getBootcamps();
            console.log('Bootcamps data:', data);
            const activeBootcamps = data.filter(bootcamp => bootcamp.active); // Filtrar solo los activos
            setBootcamps(activeBootcamps);
        } catch (error) {
            console.error('Error fetching bootcamps', error);
            setError(error.message || 'Error en la solicitud');
        }
    };

    useEffect(() => {
        fetchBootcamps();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentBootcamp((prevBootcamp) => ({
            ...prevBootcamp,
            [name]: value
        }));
    };

    const handleCreateBootcamp = async () => {
        try {
            const createdBootcamp = await createBootcamp({
                ...currentBootcamp,
                technologies: currentBootcamp.technologies.split(',').map((tech) => tech.trim())
            });
            setBootcamps((prevBootcamps) => [...prevBootcamps, createdBootcamp]); // Agregar el nuevo bootcamp a la lista
            setCurrentBootcamp({ id: null, name: '', description: '', technologies: '' });
            fetchBootcamps(); // Refrescar los datos después de la creación
        } catch (error) {
            setError(error.message || 'Error creando bootcamp');
        }
    };

    const handleUpdateBootcamp = async () => {
        try {
            const updatedBootcamp = await updateBootcamp(currentBootcamp.id, {
                name: currentBootcamp.name,
                description: currentBootcamp.description,
                technologies: currentBootcamp.technologies.split(',').map((tech) => tech.trim()),
                active: true // Asegurar que se mantiene activo
            });
            fetchBootcamps(); // Refrescar los datos después de la actualización
            setCurrentBootcamp({ id: null, name: '', description: '', technologies: '' });
        } catch (error) {
            setError(error.message || 'Error actualizando bootcamp');
        }
    };

    const handleEditBootcamp = (bootcamp) => {
        setCurrentBootcamp({
            id: bootcamp.id,
            name: bootcamp.name,
            description: bootcamp.description,
            technologies: bootcamp.technologies.join(', '),
            active: bootcamp.active // Asegurar que el estado activo se mantiene
        });
    };

    const handleDeleteBootcamp = async (id) => {
        try {
            await deleteBootcamp(id);
            setBootcamps((prevBootcamps) => prevBootcamps.filter((bootcamp) => bootcamp.id !== id)); // Eliminar el bootcamp de la lista
        } catch (error) {
            setError(error.message || 'Error eliminando bootcamp');
        }
    };

    return (
        <div>
            <h1>Bootcamps</h1>
            {error ? <p>{error}</p> : null}

            <div className="create-bootcamp-form">
                <h2>{currentBootcamp.id ? 'Editar Bootcamp' : 'Agregar Nuevo Bootcamp'}</h2>
                <input
                    type="text"
                    name="name"
                    value={currentBootcamp.name}
                    onChange={handleInputChange}
                    placeholder="Nombre del Bootcamp"
                />
                <textarea
                    name="description"
                    value={currentBootcamp.description}
                    onChange={handleInputChange}
                    placeholder="Descripción"
                ></textarea>
                <input
                    type="text"
                    name="technologies"
                    value={currentBootcamp.technologies}
                    onChange={handleInputChange}
                    placeholder="Tecnologías (separadas por comas)"
                />
                <button onClick={currentBootcamp.id ? handleUpdateBootcamp : handleCreateBootcamp}>
                    {currentBootcamp.id ? 'Actualizar Bootcamp' : 'Crear Bootcamp'}
                </button>
            </div>

            <table className="bootcamp-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Tecnologías</th>
                        <th>Acciones</th>

                    </tr>
                </thead>
                <tbody>
                    {bootcamps.map((bootcamp) => (
                        <tr key={bootcamp.id}>
                            <td>{bootcamp.name}</td>
                            <td>{bootcamp.description}</td>
                            <td>
                                <ul>
                                    {bootcamp.technologies && bootcamp.technologies.map((tech, index) => (
                                        <li key={`${bootcamp.id}-${index}`}>{tech}</li>
                                    ))}
                                </ul>
                            </td>
                            <td>
                                <button onClick={() => handleEditBootcamp(bootcamp)}>Editar</button>
                                <button onClick={() => handleDeleteBootcamp(bootcamp.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
