import './App.css'
import {Route, Routes} from 'react-router-dom';
import MainPage from './components/MainPage/MainPage.tsx';
import ProductCardPage from './components/ProductCardPage/ProductCardPage.tsx';

function App() {

    return (
        <div>
            <Routes>
                <Route path={'/'} element={<MainPage/>}/>
                <Route path={'/product/:id'} element={<ProductCardPage/>}/>
            </Routes>
       </div>
  )
}

export default App
