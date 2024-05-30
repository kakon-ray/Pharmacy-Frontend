

import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './components/sidebar/Sidebar';
import Dashboard from './pages/Dashboard/Dashboard';
import Navbar from './components/navbar/Navbar';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import ManageMedicine from './pages/medicine/ManageMedicine';
import Home from './pages/home/Home';
import MedicineAdd from './pages/medicine/MedicineAdd';




function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={< Home />} />
          <Route path='medicine' element={< ManageMedicine />} />
          <Route path='medicine/add' element={< MedicineAdd />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
