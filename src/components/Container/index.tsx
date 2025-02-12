import { ReactElement } from 'react'
import styles from './Container.module.css'

 interface ContainerProps {
    children: ReactElement | string
 }
const Container = ({children}:ContainerProps) => {
    return(
        <section className={styles.container}>
            {children}
        </section>
    )
}

export default Container