import styled from "styled-components";
import { Link } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import { useRecoilState, useRecoilValue } from "recoil";
import { AlertOpen, user_role } from "../../atom/Atom";
import { useMutation } from '@tanstack/react-query';
import { LineInput } from "../../components/inputs";
import { M_btn } from "../../components/buttons";
import { useState } from "react";
import { AlertModal } from "../../components/modal/AlertModal";
import { normalAxios } from "../../axios";


// from 테두리
const FormRound = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 24px 35px 36px;
  border: 1px solid ${({theme}) => theme.gray2};
  border-radius: 16px;
`
const WrapBtn = styled.div`
  margin-top: 36px;
`

const FlexLink = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  margin-top: 30px;
`

const StyledLink = styled(Link)`
	color: ${({theme}) => theme.gray3};
  cursor: pointer;
  text-decoration: none;
`;


function LoginPage() {
  const [openAlert, setOpenAlert] = useRecoilState(AlertOpen);
  const login_type = useRecoilValue(user_role);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alertCont, setAlertCont] = useState('');
  const loginData = {
    "username": username,
		"password": password,
		"login_type": login_type
  };
//   {
//     "id": 264,
//     "user_type": "SELLER",
//     "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyNjQsImVtYWlsIjoiIiwidXNlcm5hbWUiOiJ3aWxzb24iLCJleHAiOjE3MTcyMzUwNjB9.xU70iXhL1TOIzAyzqHMyh7GbmM_gyPYzCwJEbWKyNTk"
// }
  const loginMutate = useMutation({
    mutationFn: (logdata) => {
      return normalAxios.post('/accounts/login/', logdata);
    },
    onSuccess : (data) => {
      if(data.status === 201) {
       
      } else if(data.status === 401) {
        setOpenAlert(true);
        setAlertCont(data.data.FAIL_Message);
      }
    },
    onError : (e) => {console.log(e.message)},
  })

  const handleLogin = () => {
    if(!username) {
      setOpenAlert(true);
      setAlertCont('아이디를 입력해주세요.');
      return;
    } else if (!password) {
      setOpenAlert(true);
      setAlertCont('비밀번호를 입력해주세요.');
      return;
    } else {
      loginMutate.mutate(loginData);
    }
  }

  return (
    <AuthLayout>
      <AlertModal content={alertCont} />
      <FormRound>
        <LineInput type={'text'} setValue={(e) => setUsername(e.target.value)} placeholder={'아이디를 입력하세요'}/>
        <LineInput type={'password'} setValue={(e) => setPassword(e.target.value)} placeholder={'비밀번호를 입력하세요'}/>
        <WrapBtn>
          <M_btn btnFn={handleLogin}>로그인하기</M_btn>
        </WrapBtn>
      </FormRound>

      <FlexLink>
        <li><StyledLink to='/signup'>회원가입</StyledLink></li>
        <li><StyledLink>|</StyledLink></li>
        <li><StyledLink to='/login'>비밀번호 찾기</StyledLink></li>
      </FlexLink>
    </AuthLayout>
  )
}

export default LoginPage