
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import reset from 'styled-reset';
import { createGlobalStyle, ThemeProvider} from 'styled-components';
import { lightTheme } from './styles/colorPalette';
import { useState } from 'react';
import './styles/global.css';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import ResetRecoilContext from './ResetRecoilContext';
import MainPage from './pages/mainPage';
import LoginPage from './pages/auth/loginPage';
import SignupPage from './pages/auth/signupPage';
import SellerCenterPage from './pages/seller/sellerCenterPage';

const queryClient = new QueryClient();
const GlobalStyle = createGlobalStyle`
  ${reset};
  /* other styles */
`

function App() {
  const [theme, setTheme] = useState(lightTheme);
  const [recoilKey, setRecoilKey] = useState(0);
  const resetRecoil = () => {
		setRecoilKey(prev => prev + 1);
	};
  return (
    <QueryClientProvider client={queryClient}>
      <ResetRecoilContext.Provider value={resetRecoil}>
        <RecoilRoot key={recoilKey}>
          <BrowserRouter>
            <ThemeProvider theme={theme}>
              <GlobalStyle/>
              <Routes>
                <Route path="/" element={<MainPage />}></Route>
                <Route path="/signup" element={<SignupPage />}></Route>
                <Route path="/login" element={<LoginPage />}></Route>
                <Route path="/seller_center" element={<SellerCenterPage />}></Route>
              </Routes>
            </ThemeProvider>
          </BrowserRouter>
        </RecoilRoot>
      </ResetRecoilContext.Provider>
    </QueryClientProvider>

  )
}

export default App
