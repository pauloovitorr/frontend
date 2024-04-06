import logo from './logo.svg';
import './App.css';
import Professor from './componentes/cad_professor';
import CadastroDisciplina from './componentes/cad_disciplina';
import Aluno from './componentes/cad_aluno';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">

      <Router>
          <Routes>
              <Route path='/disciplina' element={<CadastroDisciplina></CadastroDisciplina>} ></Route>
              <Route path='/professor' element={<Professor></Professor>} ></Route>
              <Route path='/' element={<Aluno></Aluno>} ></Route>
          </Routes>
      </Router>
      
    </div>
  );
}

export default App;
