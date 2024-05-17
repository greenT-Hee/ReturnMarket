import styled from 'styled-components';
import logo from '../assets/images/logo.png';
import { useState } from 'react';
import SellerForm from '../components/signup/SellerForm';
import ConsumerForm from '../components/signup/ConsumerForm';
import { Tab_active_btn, Tab_disable_btn } from '../components/buttons';

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

// from 테두리
const FormRound = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 36px 35px;
  border: 1px solid ${({theme}) => theme.gray2};
  border-radius: 16px;
`

// checkbox style
const AliginCheckboxInputDiv =styled.div`
  display: flex;
  gap: 14px;
  align-items: center;
  max-width: 460px;
  margin: 34px auto;
`

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  display: block;
`

const CheckCont = styled.span`
  color: ${({theme}) => theme.gray3};
  line-height: 1.2;
`
const AgreementTitle = styled.span`
  color: ${({theme}) => theme.gray3};
  font-weight: 700;
  text-decoration: underline;
  cursor: pointer;
`

const SignupBtn = styled.button`
display: block;
width: 460px;
max-width: 100%;
color: ${({theme}) => theme.w};
background: ${({theme}) => theme.gray2};
border: 0;
font-weight: 700;
margin: 0 auto;
padding: 20px 0;
border-radius: 6px;
`

function SignupPage() {
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
  }

  return (
    <Section>
        <LgooStyle src={logo} alt="메인로고" />
        <UL>
            <Li onClick={handleSort}>
                {consumer ? <Tab_active_btn type='button' >구매회원가입</Tab_active_btn> : <Tab_disable_btn type='button' >구매회원가입</Tab_disable_btn>}
            </Li>
            <Li onClick={handleSort}>
                {seller ? <Tab_active_btn type='button'>판매회원가입</Tab_active_btn> : <Tab_disable_btn type='button'>판매회원가입</Tab_disable_btn>}
            </Li>
        </UL>
        {/* 구매회원가입 */}
        <form>
            <FormRound>
                {consumer ? <ConsumerForm /> : <SellerForm />}
            </FormRound>
            <AliginCheckboxInputDiv>
                <Checkbox type='checkbox' id={'agree_signup'}/>
                <CheckCont htmlFor={'agree_signup'}>탱글탱글마켓의 <AgreementTitle>이용약관</AgreementTitle> 및 <AgreementTitle>개인정보처리방침</AgreementTitle>에 대한 내용을 확인하였고 동의합니다.</CheckCont>
            </AliginCheckboxInputDiv> 
            <SignupBtn type='submit'>가입하기</SignupBtn>
        </form>
    </Section>
  ) 
}

export default SignupPage