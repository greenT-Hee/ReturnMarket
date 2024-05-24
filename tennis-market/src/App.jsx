
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import reset from 'styled-reset';
import { createGlobalStyle, ThemeProvider} from 'styled-components';
import { lightTheme } from './styles/colorPalette';
import { useState } from 'react';
import './styles/global.css';
import MainPage from './pages/mainPage';
import LoginPage from './pages/auth/loginPage';
import SignupPage from './pages/auth/signupPage';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

const GlobalStyle = createGlobalStyle`
  ${reset};
  /* other styles */
`

function App() {
  const [theme, setTheme] = useState(lightTheme);
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>

  )
}

export default App
