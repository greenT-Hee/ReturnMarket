import styled from "styled-components"
import checkOn from "../assets/images/icon-check-on.svg";
import checkOff from "../assets/images/icon-check-off.svg";
import { useEffect, useState } from "react";
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
  padding: 12px;
  border-radius: 5px;
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
const CheckboxInputLabel = styled.label`
  display: inline-block;
  position: relative;
  padding-left: 26px;
  cursor: pointer;

  /* ::after {
    position: absolute;
    left: 0;
    top: 3px;
    width: 20px;
    height: 20px;
    text-align: center;
    background: url(${checkOff}) no-repeat;  
    box-sizing: border-box;
    border-radius: 5px;
  } */
`

/* 보여질 부분의 스타일을 추가하면 된다. */
// .check__line input[type="checkbox"]:checked + label:after {
//   content: "";
//   position: absolute;
//   top: 3px;
//   left: 0;
//   width: 20px;
//   height: 20px;  
//   background: url(../images/sub/check_on.png)no-repeat;  
//   background-position: center center;
//   border-radius: 5px;
// }

// .check__line input[type="checkbox"] + label span {
//   font-weight: 400;
//   font-size: 13px;
//   line-height: 26px;  
//   letter-spacing: -1px;
//   color: rgba(0, 0, 0, 0.5);
// }

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