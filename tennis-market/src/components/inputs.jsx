import styled from "styled-components"

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
