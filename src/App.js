

import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './components/sidebar/Sidebar';
import Dashboard from './pages/Dashboard/Dashboard';
import Navbar from './components/navbar/Navbar';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import ManageMedicine from './pages/medicine/ManageMedicine';
import Home from './pages/home/Home';
import MedicineAdd from './pages/medicine/MedicineAdd';
import EmailVerified from './pages/auth/emailverified/EmailVerified';
import Login from './pages/auth/login/Login';
import RequireAuth from './components/RequireAuth/RequireAuth';
import MedicineUpdate from './pages/medicine/MedicineUpdate';



function App() {
  return (
    <>
      <Navbar />

      <Routes>
      <Route path='login' element={< Login />} />
      <Route path='admin/emailverified' element={< EmailVerified />} />

        <Route path="/" element={<RequireAuth><Dashboard /></RequireAuth>}>
          <Route index element={< Home />} />
          <Route path='medicine' element={<RequireAuth>< ManageMedicine /></RequireAuth>} />
          <Route path='medicine/add' element={<RequireAuth>< MedicineAdd /></RequireAuth>} />
          <Route path='medicine/update/:id' element={<RequireAuth>< MedicineUpdate /></RequireAuth>} />
        </Route>

      </Routes>
    </>
  );
}

export default App;
