import { Link } from "react-router-dom"
import PokemonPic from '../assets/pikachu.png'
import LocationPic from '../assets/pointer.png'
import ItemsPic from '../assets/pokeball.png'
import styles from './footer.module.css'

function Footer() {
    return (
        <footer className={styles.footer}>
            {/* Contenedor para los iconos de navegación */}
            <div className={styles.footerNav}>
                <Link className={styles.footerLink} to="/pokemons">
                    <img className={styles.footerIcon} src={PokemonPic} alt="Pokeball" />
                    Pokemons
                </Link>
                <Link className={styles.footerLink} to="/items">
                    <img className={styles.footerIcon} src={ItemsPic} alt="Pokeball" />
                    Items
                </Link>
                <Link className={styles.footerLink} to="/location">
                    <img className={styles.footerIcon} src={LocationPic} alt="Pokeball" />
                    Mapa
                </Link>
            </div>

            {/* Crédito de autor */}
            <div className={styles.signature}>
                Realizado por <strong>Snayder</strong>
            </div>
        </footer>
    )
}

export default Footer