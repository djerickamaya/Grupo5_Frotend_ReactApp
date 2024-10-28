import { Link } from "react-router-dom"

const courses = [
  {
    id: 1,
    name: "Java Developer",
    description: "Aprende Java desde cero hasta un nivel avanzado, incluyendo el desarrollo de aplicaciones backend robustas.",
    technologies: ["Java", "Spring Boot", "MySQL"],
    active: true,
  },
  {
    id: 2,
    name: "Fullstack Jr",
    description: "Curso orientado a aprender desarrollo Fullstack con ReactJS, Laravel y MySQL.",
    technologies: ["ReactJS", "Laravel", "MySQL"],
    active: true,
  },
  {
    id: 3,
    name: "Data Analytics",
    description: "Curso de análisis de datos con enfoque en Python, PowerBI y R para generar insights y visualización de datos.",
    technologies: ["Python", "PowerBI", "R"],
    active: true,
  },
];

export const Home = () => {
  return (
    <div>
      {/* Navbar */}
      <nav style={{ padding: "1rem", color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Home</h1>
        <div>
          <button style={{ margin: "0 5px" }}><Link to="/login">Login</Link></button>
          <button style={{ margin: "0 5px" }}><Link to="/register">Register</Link></button>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Explora Nuestros Bootcamps</h2>
        <p>Descubre cursos diseñados para impulsarte en tu carrera. Inicia sesión para conocer más detalles y unirte a la comunidad.</p>
        <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
          {courses.map((course) => (
            <div key={course.id} style={{ border: "1px solid #ddd", padding: "1rem", borderRadius: "8px", margin: "10px", width: "300px" }}>
              <h3>{course.name}</h3>
              <p>{course.description}</p>
              <h4>Tecnologías:</h4>
              <ul>
                {course.technologies.map((tech, index) => (
                  <li key={index}>{tech}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

