
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/mainPage';
import LoginPage from './pages/loginPage';
import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  ${reset}
  /* other styles */
`

function App() {
  return (
    <BrowserRouter>
    <GlobalStyle/>
    <Routes>
      <Route path="/" element={<MainPage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
