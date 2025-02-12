import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import PaginaBase from './pages/PaginaBase';
import NaoEncontrada from './pages/NaoEncontrada';
import Board from './pages/Board';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaginaBase />} >
        <Route index element={<Board/>}/>
        <Route path="*" element={<NaoEncontrada/>}/>

        </Route>
      </Routes >
    </Router>
  )

}
export default AppRoutes
