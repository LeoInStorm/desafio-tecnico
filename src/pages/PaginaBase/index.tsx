import { Outlet } from "react-router-dom"
import Container from "../../components/Container"
import Header from "../../components/Header"
import Footer from "../../components/Footer"

const PaginaBase = () => {
    return (
        <>
            <Header />
            <Container>
                <Outlet />
            </Container>
            <Footer/>
        </>
    )
}

export default PaginaBase