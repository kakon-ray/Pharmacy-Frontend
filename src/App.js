

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
import UserAuth from './components/RequireAuth/UserAuth';
import MedicineUpdate from './pages/medicine/MedicineUpdate';
import Registration from './pages/auth/registration/Registration';
import { TokenListProvider } from './context/TokenContext';
import PasswordReset from './pages/auth/passwordreset/PasswordReset';
import PasswordResetSubmit from './pages/auth/passwordreset/PasswordResetSubmit';
import ManageUser from './pages/manageAdmin/ManageUser';
import ManageCategory from './pages/Category/ManageCategory';
import AddCategory from './pages/Category/AddCategory';
import UpdateCategory from './pages/Category/UpdateCategory';
import ManageCompany from './pages/company/ManageCompany';
import AddCompany from './pages/company/AddCompany';
import UpdateCompany from './pages/company/UpdateCompany';
import ManageOrder from './pages/order/ManageOrder';




function App() {
  return (
    <TokenListProvider>
     

      <Routes>
      <Route path='registration' element={< Registration />} />
      <Route path='/login' element={< Login />} />
      <Route path='admin/emailverified' element={< EmailVerified />} />
      <Route path='password/reset' element={< PasswordReset />} />
      <Route path='password/reset/submit-form' element={< PasswordResetSubmit />} />

      <Route path="/user" element={<UserAuth><Dashboard /></UserAuth>}>
      <Route path='manage/medicine' element={<UserAuth>< ManageMedicine /></UserAuth>} />
      <Route path='manage/order' element={<UserAuth>< ManageOrder /></UserAuth>} />
      </Route>

        <Route path="/" element={<RequireAuth><Dashboard /></RequireAuth>}>
          <Route index element={<RequireAuth>< Home /></RequireAuth>} />
          <Route path='category' element={<RequireAuth>< ManageCategory /></RequireAuth>} />
          <Route path='category/add' element={<RequireAuth>< AddCategory /></RequireAuth>} />
          <Route path='category/update/:id' element={<RequireAuth>< UpdateCategory /></RequireAuth>} />

          <Route path='company' element={<RequireAuth>< ManageCompany /></RequireAuth>} />
          <Route path='company/add' element={<RequireAuth>< AddCompany /></RequireAuth>} />
          <Route path='company/update/:id' element={<RequireAuth>< UpdateCompany /></RequireAuth>} />


          <Route path='medicine' element={<RequireAuth>< ManageMedicine /></RequireAuth>} />
          <Route path='medicine/add' element={<RequireAuth>< MedicineAdd /></RequireAuth>} />
          <Route path='medicine/update/:id' element={<RequireAuth>< MedicineUpdate /></RequireAuth>} />
          <Route path='manage/user' element={<RequireAuth>< ManageUser /></RequireAuth>} />

          <Route path='manage/order' element={<RequireAuth>< ManageOrder /></RequireAuth>} />
        </Route>

      </Routes>
    </TokenListProvider>
  );
}

export default App;
