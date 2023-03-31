import './App.css'
import { Cart } from './components/Cart'
import { NavBar } from './components/NavBar'
import { Products } from './components/Products'

function App(){
  return(
    <main className='cartApp'>
    <NavBar/>
    <Products/>
    <Cart/>
    </main>
  )
}

export default App
