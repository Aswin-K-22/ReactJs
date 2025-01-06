import Main from "./components/Main"
import Details from './components/Details'
import {Routes , Route} from 'react-router-dom'
import Sell from "./components/Sell"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <>
    <Routes>
      <Route path ='/' element={<Main/>}/>
      <Route path = '/details' element={<Details/>}/>
      <Route path = '/sell' element = {<Sell/>}/>
      
      
    </Routes>
    <ToastContainer/>
    </>
   
  )
}

export default App