
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/mainPage';
import LoginPage from './pages/loginPage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
