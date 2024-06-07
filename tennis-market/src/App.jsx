
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
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
import RegistProductPage from './pages/seller/registProductPage';
import EditPage from './pages/seller/editPage';
import ErrorPage from './pages/errorPage';
import DetailPage from './pages/detailPage';

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
                <Route path="/product/:pid" element={<DetailPage />}></Route>
                <Route path="/seller_center" element={<SellerCenterPage />}></Route>
                <Route path="/regist_product" element={<RegistProductPage />}></Route>
                <Route path="/edit/:pid" element={<EditPage />}></Route>
                <Route path="/*" element={<ErrorPage />}></Route>
              </Routes>
            </ThemeProvider>
          </BrowserRouter>
        </RecoilRoot>
      </ResetRecoilContext.Provider>
    </QueryClientProvider>

  )
}

export default App
