import { useLocation } from 'react-router-dom';
import styles from './header.module.css';

type HeaderProps = {
    query: string;
    setQuery: (query: string) => void;
}

function Header({ query, setQuery }: HeaderProps) {
    const location = useLocation();

    // Lógica para determinar el placeholder basado en la ruta actual
    const getPlaceholder = () => {
        const path = location.pathname;
        
        if (path.includes('/items')) return "Search an Item...";
        if (path.includes('/location')) return "Search a Location...";
        
        // Default para la página principal / pokemons
        return "Search a Pokemon...";
    };

    return (
        <header className={styles.header}>
            <input 
                className={styles.input} 
                placeholder={getPlaceholder()} 
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
        </header>
    );
}

export default Header;
