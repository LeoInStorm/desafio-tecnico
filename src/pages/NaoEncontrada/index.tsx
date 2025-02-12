import styles from './NaoEncontrada.module.css';
import imagem from './naoencontrado.png'
const NaoEncontrada = () => {
    return (
        <>
        <section className={styles.container}>
            <h2>Ops!O conteúdo que você procura não foi encontrado!</h2>
        </section>
        <div className={styles.imagem}>
            <img src={imagem} alt='personagem com uma lupa procurando algo'/>
        </div>
        </>
    )
}

export default NaoEncontrada;