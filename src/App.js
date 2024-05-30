

import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './components/sidebar/Sidebar';
import Home from './pages/home/Home';
import Navbar from './components/navbar/Navbar';
import './App.css';

function App() {
  return (
    <>
    <Navbar/>
      <Home/>
    </>
  );
}

export default App;
