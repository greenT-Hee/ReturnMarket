import styled from 'styled-components';
import logo from '../../assets/images/logo.png';
import { useState } from 'react';
import SellerForm from '../../components/signup/SellerForm';
import ConsumerForm from '../../components/signup/ConsumerForm';
import { M_btn_disable, Tab_active_btn, Tab_disable_btn } from '../../components/buttons';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ComfirmModal } from '../../components/modal/comfirmModals';

const Section = styled.section`
    width: 570px;
    max-width: 100%;
    margin: 70px auto;
    padding: 20px;
    box-sizing: border-box;
`
const LgooStyle = styled.img`
    display: block;
    width: 250px;
    max-width: 100%;
    margin: 0 auto 40px;
`
const UL = styled.ul`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    gap: 30px;
    margin-bottom: 30px;
`
const Li = styled.li`
    width: calc(100% / 2);
    `

const SortBtn = styled.button`
    display: block;
    width: 100%;
    background: 0;
    border: 0;
    border: 1px solid ${({theme}) => theme.sub};
    padding: 16px;
    border-radius: 8px;
    font-size: 18px;
    color: ${({theme}) => theme.w};
    background:  ${({theme}) => theme.sub};
    cursor: pointer;
    `
const UnSortBtn = styled.button`
  display: block;
  width: 100%;
  background: 0;
  border: 0;
  border: 1px solid ${({theme}) => theme.gray2};
  padding: 16px;
  border-radius: 8px;
  font-size: 18px;
  color: ${({theme}) => theme.gray1};
  background:  ${({theme}) => theme.w};
  cursor: pointer;
`

function SignupPage() {
  const navigate = useNavigate();
  const [consumer, setConsumer] = useState(true);
  const [seller, setSeller] = useState(false);
  const handleSort = (e) => {
    console.log(e.target.innerText)
    if(e.target.innerText === '구매회원가입') {
        setConsumer(true);
        setSeller(false);
    } else {
        setConsumer(false);
        setSeller(true);
    }
  };


  return (
    <Section>
        <LgooStyle src={logo} alt="메인로고" onClick={() => navigate('/')}/>
        <UL>
            <Li onClick={handleSort}>
                {consumer ? <Tab_active_btn type='button' >구매회원가입</Tab_active_btn> : <Tab_disable_btn type='button' >구매회원가입</Tab_disable_btn>}
            </Li>
            <Li onClick={handleSort}>
                {seller ? <Tab_active_btn type='button'>판매회원가입</Tab_active_btn> : <Tab_disable_btn type='button'>판매회원가입</Tab_disable_btn>}
            </Li>
        </UL>
        {consumer ? <ConsumerForm /> :<SellerForm /> }
        <ComfirmModal content={'💚 회원가입이 완료됐습니다 💚\n로그인 페이지로 이동할까요?'}/>
    </Section>
  ) 
}

export default SignupPage