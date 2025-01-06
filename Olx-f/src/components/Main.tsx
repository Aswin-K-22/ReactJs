import Footer from "./Footer"
import Home from "./Home"
import Menubar from "./Menubar"
import Navbar from "./Navbar"
import {useEffect , useState} from 'react'

const Main = () => {

    const [prod , setProd] = useState([])
    const [search , setSearch] = useState('')
    const [menu , setMenu] = useState('')

    const getProducts =()=>{
        fetch('https://fakestoreapi.com/products/')
            .then(res=>res.json())
            .then(json=>setProd(json))
    }
console.log('csdmklfmksdf');

    useEffect(()=>{
        getProducts()
    },[])

  return (
    <div>
      <Navbar setSearch={setSearch}/>
      <Menubar setMenu={setMenu}/>
      <Home products = {prod} search={search} menu={menu}/>
      <Footer/>
    </div>
  )
}

export default Main
