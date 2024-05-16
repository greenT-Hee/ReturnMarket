
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import reset from 'styled-reset';
import { createGlobalStyle, ThemeProvider} from 'styled-components';
import { lightTheme } from './styles/colorPalette';
import { useState } from 'react';
import './styles/global.css';
import MainPage from './pages/mainPage';
import LoginPage from './pages/loginPage';
import SignupPage from './pages/signupPage';

const GlobalStyle = createGlobalStyle`;
  ${reset},
  /* other styles */
`

function App() {
  const [theme, setTheme] = useState(lightTheme);
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle/>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/signup" element={<SignupPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
