import styled from "styled-components"
import checkOn from "../assets/images/icon-check-on.svg";
import checkOff from "../assets/images/icon-check-off.svg";
import { useEffect, useState } from "react";
import { S_btn, S_btn_white } from "./buttons";
import DaumPostcode from 'react-daum-postcode';

const Label = styled.label`
  display: block;
  color: ${({theme}) => theme.gray3};
  padding: 12px 0;
  line-height: 1.2;
`
const Input = styled.input`
  width: ${(props) => props.$emailnput ? '199px' : '100%'};
  outline: 1px solid ${({theme}) => theme.gray2};
  border: none;
  border-radius: 5px;
  padding: 12px;
  box-sizing: border-box;
  font-size: 16px;
  
  &:focus {
    outline: 1px solid ${({theme}) => theme.sub};
  }
  &::placeholder {
    font-size: 14px;
  }
`

const LineInputStyle = styled.input`
  width: ${(props) => props.$emailnput ? '199px' : '100%'};
  outline: none;
  border: none;
  border-bottom: 1px solid ${({theme}) => theme.gray2};
  padding: 12px;
  box-sizing: border-box;
  font-size: 16px;

  &:focus {
    border-bottom: 1px solid ${({theme}) => theme.sub};
  }
  &::placeholder {
    font-size: 14px;
  }
`

const AliginEmailInputDiv =styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
`

const ErrMsg = styled.p`
  font-size: 12px;
  color: ${(props) => props.$error ? props.theme.red : props.theme.sub};
  padding: 0 0 4px;
`

const CheckboxInput = styled.input`
  width: 18px;
  height: 16px;
  accent-color: ${({theme}) => theme.main};
`

// --- 결제 input ---
const WrapPayInput = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid ${({theme}) => theme.gray2};
`

const PayLabel = styled.label`
  min-width: 180px;
`
const PayInput = styled.input`
  flex-grow: 0;
  display: block;
  width: 334px;
  height: 45px;
  box-sizing: border-box;
  padding: 10px;
  outline: 1px solid ${({theme}) => theme.gray2};
  border: none;
  border-radius: 5px;

  &:focus {
    outline: 1px solid ${({theme}) => theme.sub};
  }
  &::placeholder {
    font-size: 14px;
  }
`
const WrapAddressInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
  `
const WrapAddressBtn = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`
const WrapDaum = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  background: rgba(0,0,0,0.45);
  box-sizing: border-box;
`
const DaumStyleDiv = styled.div`
  width: 450px;
  max-width: 100%;
  position: absolute;
  left: 50%;
  right: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

const CloseDaum = styled.button`
  display: block;
  background: none;
  border: none;
  font-size: 18px;
  font-weight: 600;
  color: ${({theme}) => theme.w};
  float: right;
  margin: 0 -15px 8px 0;
  cursor: pointer;
  padding: 0 20px;
`
const WrapRadio = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;
`
const RadioInput = styled.input`
  width: 18px;
  height: 18px;
  border: 2px solid #ccc; // 체크되지 않았을 때의 테두리 색상
  border-radius: 50%;
  outline: none; // focus 시에 나타나는 기본 스타일 제거
  cursor: pointer;
  -webkit-appearance: none; // 웹킷 브라우저에서 기본 스타일 제거
  -moz-appearance: none; // 모질라 브라우저에서 기본 스타일 제거 
  appearance: none; // 기본 브라우저에서 기본 스타일 제거

  &:checked {
    background: ${({theme}) => theme.main}; // 체크 시 내부 원으로 표시될 색상
    border: 3px solid ${({theme}) => theme.w}; // 테두리가 아닌, 테두리와 원 사이의 색상
    box-shadow: 0 0 0 1.6px ${({theme}) => theme.main}; // 얘가 테두리가 됨
    // 그림자로 테두리를 직접 만들어야 함 (퍼지는 정도를 0으로 주면 테두리처럼 보입니다.)
    // 그림자가 없으면 그냥 설정한 색상이 꽉 찬 원으로만 나옵니다.
  }
`
const Essential = styled.span`
  font-size: 14px;
  color: ${({theme}) => theme.red};

`

export const NormalInput = ({type, id, label, setValue, maxlength, errMsg, errStatus=false, placeholder}) => {
  return (
    <>
      <Label htmlFor={id}>{label}</Label>
      {errStatus ? <ErrMsg>{errMsg}</ErrMsg> : <ErrMsg $error>{errMsg}</ErrMsg>}
      <Input type={type} id={id} name={id} onChange={setValue} maxLength={maxlength} placeholder={placeholder}/>
    </>
  )
}

export const LineInput = ({type, id, label, setValue, maxlength, errMsg, errStatus=false, placeholder}) => {
  return (
    <>
      <Label htmlFor={id}>{label}</Label>
      {errStatus ? <ErrMsg>{errMsg}</ErrMsg> : <ErrMsg $error>{errMsg}</ErrMsg>}
      <LineInputStyle type={type} id={id} name={id} onChange={setValue} maxLength={maxlength} placeholder={placeholder}/>
    </>
  )
}

export const EmailInput = ({id, label}) => {
  return (
    <>
      <Label htmlFor={id}>이메일</Label>
      <AliginEmailInputDiv>
        <Input $emailnput='true' type="text" id="email1"/>
        <span>@</span>
        <Input $emailnput='true' style={{width: '220px'}} type="text" id='email2'/>
      </AliginEmailInputDiv>
    </>
  )
}


export const CartCheckbox = ({label, id, singleCheckHandler, checkItems}) => {
  return (
    <>
      <CheckboxInput 
      type="checkbox" 
      id={id} 
      name={label} 
      onChange={(e) => singleCheckHandler(e.target.checked, id)} 
      checked={checkItems.includes(id) ? true : false}
      />
      <label htmlFor={label}></label>
    </>
  )
}

export const PaymentInput = ({type, id, label,value, setValue, maxlength, errMsg, errStatus=false, placeholder}) => {
  return (
    <WrapPayInput>
      <PayLabel htmlFor={id}><Essential>* </Essential>{label}</PayLabel>
      {/* {errStatus ? <ErrMsg>{errMsg}</ErrMsg> : <ErrMsg $error>{errMsg}</ErrMsg>} */}
      <PayInput value={value} type={type} id={id} name={id} onChange={setValue} maxLength={maxlength} placeholder={placeholder}/>
    </WrapPayInput>
  )
}
export const PaymentAddressInput = ({type, id, label, setValue, maxlength, errMsg, errStatus=false}) => {
  const [address, setAddress] = useState("");
  const [openDaum, setOpenDaum] = useState(false);
  const handleAddress = (data) => {
    setAddress(`[${data.zonecode}] ${data.address}`);
    setOpenDaum(false);
  } 
  return (
    <WrapPayInput>
      <PayLabel htmlFor={id}><Essential>* </Essential>{label}</PayLabel>
      {/* {errStatus ? <ErrMsg>{errMsg}</ErrMsg> : <ErrMsg $error>{errMsg}</ErrMsg>} */}
      <WrapAddressInput>
        <WrapAddressBtn>
          <PayInput readOnly type={type} id={"address1"} name={"address1"} value={address}/>
          <S_btn btnFn={() => openDaum? setOpenDaum(false) : setOpenDaum(true)}>주소 찾기</S_btn>
        </WrapAddressBtn>
        {openDaum &&
          <WrapDaum>
            <DaumStyleDiv>
              <CloseDaum onClick={() => setOpenDaum(false)}>X</CloseDaum>
              <DaumPostcode onComplete={data => handleAddress(data)}></DaumPostcode>
            </DaumStyleDiv>
          </WrapDaum>
        }
        <PayInput type={type} id={"address2"} name={"address2"} onChange={setValue} maxLength={maxlength} placeholder={"상세주소"}/>
      </WrapAddressInput>
    </WrapPayInput>
  )
}

export const PaymentRadio = ({label, value, payMethod, setPayMethod }) =>{
  return (
    <WrapRadio>
      <RadioInput checked={payMethod === value ? true : false} type="radio" id={value} name={"payment_method"} value={value} onChange={(e) => setPayMethod(e.target.value)}/>
      <label htmlFor={value}>{label}</label>
    </WrapRadio>
  )
}