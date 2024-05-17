import styled from 'styled-components';
import { EmailInput, NormalInput } from '../inputs';
import { MS_btn, S_btn } from '../buttons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../axios';
import axios from 'axios';
import { useState } from 'react';


const FlexInputDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  @media only screen and (max-width: 500px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

function SellerForm() {
  // ---- 아이디 인증 ---
  const checkId = useMutation({
    mutationFn: (username) => {
      console.log(username);
      return axiosInstance.post('/accounts/signup/valid/username/', username)
      
    }
  })
  const validUserName = (e) => {
    e.preventDefault();
    checkId.mutate({username : 'kth'})
  }

  // --- 회원가입 ---
  const [sellerInputs, setInputs] = useState({
    "username": "", // 아이디
		"password": "",
		"password2": "",
		"phone_number": "", // 전화번호는 010으로 시작하는 10~11자리 숫자
		"name": "", // 이름
		"company_registration_number": "",
		"store_name": "",
  });

  const { username, password, password2, phone_number, name, company_registration_number,store_name } = sellerInputs;
  const [validPwd, setValidPwd] = useState(false);
  const [checkCorrectPwd, setCheckCorrectPwd] = useState(false);
  const [validPhone, setValidPhone] = useState(false);
  function handleInputValue(e) {
    const { value, name } = e.target;
    const pwdReg = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{8,12}$/gm;
    const phoneReg = /010\d{7,8}/gm;
    const registrationReg = /\d{10}/gm;
    if(e.target.name === 'password') pwdReg.test(e.target.value) ? setValidPwd(true) : setValidPwd(false);
    if(e.target.name === 'password2') e.target.value === password && validPwd ? setCheckCorrectPwd(true) : setCheckCorrectPwd(false);
    if(e.target.name === 'phone_number') {
      e.target.value =e.target.value.replace(/[^0-9]/g, "");
      phoneReg.test(e.target.value) ? setValidPhone(true) : setValidPhone(false);
    } 
    if(e.target.name === 'company_registration_number') {
      registrationReg.test(e.target.value) ? setValidPhone(true) : setValidPhone(false);
    } 

    setInputs({
      ...sellerInputs,
      [name]: value,
    });
    console.log(sellerInputs);
  }


  const signupMutate = useMutation({
    mutationFn: (signdata) => {
      return axiosInstance.post('/accounts/signup_seller/', signdata)
    }
  })
  const signup = (e) => {
    e.preventDefault();
    signupMutate.mutate(sellerInputs);
  }

  

  return (
    <>
      <FlexInputDiv>
        <div style={{width:'310px', maxWidth: '100%'}}>
          <NormalInput type={'text'} id={'username'} label={'아이디'} setValue={handleInputValue} maxlength={25}/>
        </div>
        <S_btn type='button' btnFn={validUserName}>중복확인</S_btn>
      </FlexInputDiv>
        <NormalInput type={'password'} id={'password'} label={'비밀번호'} setValue={handleInputValue}/>
      <div>
      </div>
      <div>
        <NormalInput type={'password'} id={'password2'} label={'비밀번호 확인'} setValue={handleInputValue}/>
      </div>
      <div>
        <NormalInput type={'text'} id={'name'} label={'이름'} setValue={handleInputValue}/>
      </div>
      <div>
        <NormalInput type={'number'} id={'phone'} label={'휴대폰번호'} setValue={handleInputValue}/>
      </div>
      <FlexInputDiv>
        <div style={{width:'310px', maxWidth: '100%'}}>
            <NormalInput type={'number'} id={'company_registration_number'} label={'사업자등록번호'} maxlength={10} setValue={handleInputValue}/>
        </div>
        <S_btn type='button'>인증</S_btn>
      </FlexInputDiv>
      <div>
        <NormalInput type={'text'} id={'store_name'} label={'스토어 이름'} setValue={handleInputValue}/>
      </div>
    </>
  )
}

export default SellerForm