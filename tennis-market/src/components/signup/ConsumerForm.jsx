import styled from 'styled-components';
import { EmailInput, NormalInput } from '../inputs';
import { S_btn } from '../buttons';


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

export default function ConsumerForm() {
  return (
    <>
      <FlexInputDiv>
        <div style={{width:'310px', maxWidth: '100%'}}>
          <NormalInput type={'text'} id={'user_id'} label={'아이디'}/>
        </div>
        <S_btn type='button'>중복확인</S_btn>
      </FlexInputDiv>
        <NormalInput type={'text'} id={'pwd'} label={'비밀번호'}/>
      <div>
      </div>
      <div>
        <NormalInput type={'password'} id={'check_pwd'} label={'비밀번호 확인'}/>
      </div>
      <div>
        <NormalInput type={'text'} id={'user_name'} label={'이름'}/>
      </div>
      <div>
        <NormalInput type={'text'} id={'phone'} label={'휴대폰번호'}/>
      </div>
      <div>
        <EmailInput id={'phone'} label={'이메일'}/>
      </div>
    </>
  )
}
