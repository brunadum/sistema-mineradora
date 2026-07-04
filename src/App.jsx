import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Inicio from './pages/Inicio';
import Equipamentos from './pages/Equipamentos';
import Cidades from './pages/Cidades';
import Funcionarios from './pages/Funcionarios';
import Servicos from './pages/Servicos';

export default function App() {
  return (
    <Router>
      {/* O Menu fica fora das Rotas para aparecer em todas as páginas */}
      <Menu />
      
      {/* Aqui o React decide qual página mostrar dependendo do link */}
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/equipamentos" element={<Equipamentos />} />
        <Route path="/cidades" element={<Cidades />} />
        <Route path="/funcionarios" element={<Funcionarios />} />
        <Route path="/servicos" element={<Servicos />} />
      </Routes>
    </Router>
  );
}