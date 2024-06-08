import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { EmailInput, NormalInput } from '../inputs';
import { MS_btn, M_btn, M_btn_disable, S_btn } from '../buttons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { normalAxios } from '../../axios';
import { useState } from 'react';
import iconCheck from '../../assets/images/ico-check.svg'
import AgreeModal from '../modal/AgreementModal'
import { AlertOpen, ConfirmOpen, ModalOpen } from '../../atom/Atom';
import { useRecoilState } from 'recoil';
// from 테두리
const FormRound = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 24px 35px 35px;
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

const AlignBtn = styled.div`
  display: flex;
  justify-content: center;
`
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
const CheckRound = styled.div`
  width: 24px;
  height : 24px;
  position: absolute;
  right: 10px;
  bottom: 8px;
  border-radius: 60px;
  background: ${(props) => props.$pass ?  `url(${iconCheck}) ${props.theme.sub} center no-repeat` : `url(${iconCheck}) ${props.theme.gray1} center no-repeat`};
`

function ConsumerForm() {
  const [openConfrim, setOpenConfirm] = useRecoilState(AlertOpen);
  const [alertOpen, setAlertOpen] = useRecoilState(ModalOpen);
  const [agreeType, setAgreeType] = useState('');
  const [isAgreeCheck, setIsAgreeCheck] = useState(false)
  const navigate = useNavigate();
  const [consumerInputs, setConsumerInputs] = useState({
    "username": "", // 아이디
		"password": "",
		"password2": "",
		"phone_number": "", // 전화번호는 010으로 시작하는 10~11자리 숫자
		"name": "", // 이름
  });
  const [errorMsg, setErrMsg] = useState({
    "username_err": "", // 아이디
		"password_err": "",
		"phone_number_err": "", // 전화번호는 010으로 시작하는 10~11자리 숫자
		"name_err": "", // 이름
  })
  let { username_err, password_err, password2_err, phone_number_err, name_err } = errorMsg;
  const { username, password, password2, phone_number, name} = consumerInputs;

  // ---- 아이디 인증 ---
  const [isIdValid, setIsIdValid] = useState(false);
  const checkId = useMutation({
    mutationFn: (username) => {
      return normalAxios.post('/accounts/signup/valid/username/', username);
    },
    onSuccess : (data) => {
      if(data.status === 202) {
        setErrMsg({...errorMsg, username_err : data.data.Success});
        setIsIdValid(true);
      } else if(data.status === 400) {
        setErrMsg({...errorMsg, username_err : data.data.FAIL_Message});
        setIsIdValid(false);
      }
    },
    onError : (e) => {console.log(e.message)},
  })

  // --- 회원가입 ---
  const [validPwd, setValidPwd] = useState(false);
  const [checkCorrectPwd, setCheckCorrectPwd] = useState(false);
  const [validPhone, setValidPhone] = useState(false);
  function handleInputValue(e) {
    const { value, name } = e.target;
    const pwdReg = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{8,12}$/gm;
    const phoneReg = /^(01[0]{1})?[0-9]{3,4}?[0-9]{4}$/gm;
    const registrationReg = /\d{10}/gm;
    if(e.target.name === 'password') pwdReg.test(e.target.value) ? setValidPwd(true) : setValidPwd(false);
    if(e.target.name === 'password2') e.target.value === password && validPwd ? setCheckCorrectPwd(true) : setCheckCorrectPwd(false);
    if(e.target.name === 'phone_number') {
      e.target.value =e.target.value.replace(/[^0-9]/g, "");
      phoneReg.test(e.target.value) ? setValidPhone(true) : setValidPhone(false);
    } 

    setConsumerInputs({
      ...consumerInputs,
      [name]: value,
    });
  }

  const signupMutate = useMutation({
    mutationFn: (signdata) => {
      setErrMsg({
        "username_err": "", // 아이디
        "password_err": "",
        "phone_number_err": "", // 전화번호는 010으로 시작하는 10~11자리 숫자
        "name_err": "", // 이름
      })
      return normalAxios.post('/accounts/signup/', signdata);
    },
    onSuccess : (data) => {
      if(data.status === 201) {
        setOpenConfirm(true);
      } else if(data.status === 400) {
        if(data.data.username) {
          setIsIdValid(false);
          setErrMsg({...errorMsg, username_err :data.data.username[0] });
        };
        if(data.data.password) setErrMsg({...errorMsg, password_err :data.data.password[0] });
        if(data.data.phone_number) setErrMsg({...errorMsg, phone_number_err : data.data.phone_number[0] });
        if(data.data.name) name_err = setErrMsg({...errorMsg, name_err :data.data.name[0] });
      }
    },
    onError : (e) => {console.log(e.message)},
  })

  const openAgreement = (e) => {
    e.preventDefault();
    if(e.target.id === 'agree_use') {
      setAlertOpen(true);
      setAgreeType('use');
    }
    if(e.target.id === 'agree_info') {
      setAlertOpen(true);
      setAgreeType('info');
    }
  }

  return (
    <form>
      <FormRound>
        <FlexInputDiv>
          <div style={{width:'310px', maxWidth: '100%'}}>
            <NormalInput errStatus={isIdValid} errMsg={username_err} type={'text'} id={'username'} label={'아이디'} setValue={handleInputValue} maxlength={20} placeholder={'20자 이내의 영어 소문자, 대문자, 숫자'}/>
          </div>
          <S_btn type='button' btnFn={() => (checkId.mutate({username : username}))}>중복확인</S_btn>
        </FlexInputDiv>
        <div style={{position: 'relative'}}>
          <NormalInput type={'password'} id={'password'} label={'비밀번호'} setValue={handleInputValue} errMsg={password_err} placeholder={'8자 이상, 영소문자/숫자/특수기호 필수'}/>
          {validPwd ? <CheckRound $pass></CheckRound> : <CheckRound></CheckRound>}
        </div>
        <div style={{position: 'relative'}}>
          <NormalInput type={'password'} id={'password2'} label={'비밀번호 확인'} setValue={handleInputValue}/>
          {checkCorrectPwd ? <CheckRound $pass></CheckRound> : <CheckRound></CheckRound>}
        </div>
        <div>
          <NormalInput type={'text'} id={'name'} label={'이름'} setValue={handleInputValue} errMsg={name_err}/>
        </div>
        <div>
          <NormalInput type={'number'} id={'phone_number'} label={'휴대폰번호'} maxlength={11} setValue={handleInputValue} errMsg={phone_number_err}/>
        </div>
      
       
      </FormRound>
      {/* 약관 */}
      {alertOpen && <AgreeModal type={agreeType}/>}
      <AliginCheckboxInputDiv>
        <Checkbox type='checkbox' id={'agree_signup'} onChange={(e) => setIsAgreeCheck(e.target.checked)}/>
        <CheckCont onClick={openAgreement} htmlFor={'agree_signup'}>리턴마켓의 <AgreementTitle id="agree_use">이용약관</AgreementTitle> 및 <AgreementTitle id="agree_info">개인정보처리방침</AgreementTitle>에 대한 내용을 확인하였고 동의합니다.</CheckCont>
      </AliginCheckboxInputDiv> 
      {/* 회원가입 버튼 */}
      <AlignBtn>
        {validPhone && checkCorrectPwd && validPwd && isIdValid && isAgreeCheck ?
        <M_btn btnFn={() => {signupMutate.mutate(consumerInputs)}}>가입하기</M_btn>
        :
        <M_btn_disable>가입하기</M_btn_disable>
      }
      </AlignBtn> 
     
    </form>
  )
}

export default ConsumerForm