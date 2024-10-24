import { Link } from "react-router-dom"


export const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
            <main className="text-center">
                <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
                <p className="text-xl mb-8">Oops! The page you're looking for doesn't exist.</p>
                <button>
                    <Link to="/">Return to Home</Link>
                </button>
            </main>
        </div>
    )
}
