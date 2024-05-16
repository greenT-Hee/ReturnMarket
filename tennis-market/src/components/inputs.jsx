import styled from "styled-components"

const Label = styled.label`
  display: block;
  color: ${({theme}) => theme.gray3};
  padding: 12px 0;
  line-height: 1.2;
`
const Input = styled.input`
  width: ${(props) => props.$emailnput ? '199px' : '100%'};
  border: 1px solid ${({theme}) => theme.gray2};
  padding: 12px;
  border-radius: 5px;
  box-sizing: border-box;
`
const AliginEmailInputDiv =styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
`

export const NormalInput = ({type, id, label}) => {
  return (
    <>
      <Label htmlFor={id}>{label}</Label>
      <Input type={type} id={id}/>
    </>
  )
}

export const EmailInput = ({id, label}) => {
  return (
    <>
      <Label htmlFor={id}>{label}</Label>
      <AliginEmailInputDiv>
        <Input $emailnput='true' type="text" id="email1"/>
        <span>@</span>
        <Input $emailnput='true' style={{width: '220px'}} type="text" id='email2'/>
      </AliginEmailInputDiv>
    </>
  )
}
