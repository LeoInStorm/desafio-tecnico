import { Link } from 'react-router-dom'
import styles from './Header.module.css'

const Header = () => {
    return(
       <header className={styles.cabecalho}>
        <Link to='./' className={styles.link}>
            <img src='https://links.papareact.com/c2cdd5' alt='Logo Trello' className={styles.imagem}/>
        </Link>
       </header>
    )

}

export default Header