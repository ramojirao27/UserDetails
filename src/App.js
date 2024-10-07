import logo from './logo.svg';
import {Routes,Route} from "react-router-dom";
import Home from './pages/Home';
import UserDetail from './pages/UserDetail';
import Navbar from './components/Navbar';
import UserContextProvider from './context/userContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <UserContextProvider>
   
     <Navbar />
     <ToastContainer/>
    <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='/user/:id' element={<UserDetail/>}/>
    </Routes>
   
   </UserContextProvider>
  );
}

export default App;
