import './App.css';
import {
  Routes,
  Route,  BrowserRouter,
} from "react-router-dom";
import Navbar from './components/Navbar';
import { Home } from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import { Alert } from './components/Alert';
function App() {
  return (
    <>
    <NoteState>
      <BrowserRouter>
        <Navbar />
        <Alert message="Welcome!"/>
        <div className="container">

    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        </Routes>
        </div>
    </BrowserRouter>
      </NoteState>
    </>
    
      
      );
}

      export default App;
