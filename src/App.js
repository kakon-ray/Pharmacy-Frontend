

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
import Registration from './pages/auth/registration/Registration';
import { TokenListProvider } from './context/TokenContext';
import PasswordReset from './pages/auth/passwordreset/PasswordReset';
import PasswordResetSubmit from './pages/auth/passwordreset/PasswordResetSubmit';
import ManageUser from './pages/manageAdmin/ManageUser';
import ManageCategory from './pages/Category/ManageCategory';
import AddCategory from './pages/Category/AddCategory';
import UpdateCategory from './pages/Category/UpdateCategory';




function App() {
  return (
    <TokenListProvider>
      <Navbar />

      <Routes>
      <Route path='registration' element={< Registration />} />
      <Route path='/' element={< Login />} />
      <Route path='admin/emailverified' element={< EmailVerified />} />
      <Route path='password/reset' element={< PasswordReset />} />
      <Route path='password/reset/submit-form' element={< PasswordResetSubmit />} />

        <Route path="/admin" element={<RequireAuth><Dashboard /></RequireAuth>}>
          <Route index element={< Home />} />

          <Route path='category' element={<RequireAuth>< ManageCategory /></RequireAuth>} />
          <Route path='category/add' element={<RequireAuth>< AddCategory /></RequireAuth>} />
          <Route path='category/update/:id' element={<RequireAuth>< UpdateCategory /></RequireAuth>} />

          <Route path='medicine' element={<RequireAuth>< ManageMedicine /></RequireAuth>} />
          <Route path='medicine/add' element={<RequireAuth>< MedicineAdd /></RequireAuth>} />
          <Route path='medicine/update/:id' element={<RequireAuth>< MedicineUpdate /></RequireAuth>} />
          <Route path='manage/user' element={<RequireAuth>< ManageUser /></RequireAuth>} />
        </Route>

      </Routes>
    </TokenListProvider>
  );
}

export default App;
