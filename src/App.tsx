import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Contacts } from './pages/Contacts'
import { Header } from "./components/Header";
import { Footer } from './components/Footer';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="d-flex flex-column">
      <Header />
      <Contacts />
      <Footer />
    </div>
  )
}

export default App
