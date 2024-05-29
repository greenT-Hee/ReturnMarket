import styled from 'styled-components'
import { NormalInput } from '../../components/inputs'
import SellerLayout from '../../components/layout/SellerLayout'
import { MS_btn, MS_btn_white } from '../../components/buttons'
import { useState } from 'react'

const RightArea = styled.div`
  display: flex;
  gap: 40px;
  width: 1000px;
  max-width: 100%;
  box-sizing: border-box;

  @media only screen and (max-width: 1280px) {
    flex-direction: column;
    align-items: center;
  }
`

const ImageBox = styled.div`
  margin-top: -16px;
  width: 100%;
`
const WrapImg  = styled.div`
  width: 454px;
  max-width: 100%;
  height: 454px;
  background: ${({theme}) => theme.gray1};
  object-fit: cover;
  flex-shrink: 0;
`
const LabelStyle = styled.label`
  display: block;
  font-size: 14px;
  color: ${({theme}) => theme.gray3};
  padding: 16px 0 10px;
`

const OptionBox = styled.div`
  width: 100%;
  margin-top: -16px;
`

const Input = styled.input`
  width: 100%;
  outline: 1px solid ${({theme}) => theme.gray2};
  border: none;
  padding: 16px;
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
const WrapNumberInput = styled.div`
  position: relative;
  width: 220px;
  ::after {
    display: block;
    content: '원';
    position: absolute;
    right: 0;
    top: 40px;
    width: 50px;
    height: 50px;
    outline: 1px solid ${({theme}) => theme.gray2};
    border: none;
    padding: 16px; 
    border-radius: 0 5px 5px 0;
    box-sizing: border-box;
    background: ${({theme}) => theme.gray2};
    font-weight: 500;
    color: ${({theme}) => theme.gray4};
    text-align: center;
    line-height: 1;
  }
`
const NumberInput = styled.input`
  width: 168px;
  height: 50px;
  outline: 1px solid ${({theme}) => theme.gray2};
  border: none;
  padding: 16px;
  border-radius: 5px 0 0 5px;
  box-sizing: border-box;

`

const ShipmentDiv = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`
const EditorArea = styled.div`
  width: 100%;
  margin: 40px 0 130px;
`
const EditorBox = styled.div`
  width: 100%;
  height: 400px;
  margin-bottom: 30px;
  border: 1px solid  ${({theme}) => theme.gray2};
  background:  ${({theme}) => theme.gray1};
`

const EditorBtnFlex = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`


export default function RegistProductPage() {
  const [inputs, setInputs] = useState({
    "product_name" : "",
    "price" : "",
    "shipment_fee" : "",
    "stock" : "",
  });
  const { product_name, price, shipment_fee, stock} = inputs;
  function handleInputValue(e) {
    const { value, name } = e.target;


    setInputs({
      ...setInputs,
      [name]: value,
    });
  }

  return (
    <SellerLayout>
      <RightArea>
        <ImageBox>
          <LabelStyle>상품이미지</LabelStyle>
          <WrapImg>
            <img src="" alt="" />
          </WrapImg>
        </ImageBox>
        <OptionBox>
          <LabelStyle htmlFor='product_name'>상품명</LabelStyle>
          <Input name='product_name' type='text' placeholder='최대 20자' maxLength={20}/>
          <WrapNumberInput>
            <LabelStyle htmlFor='price'>판매가</LabelStyle>
            <NumberInput name='price' type='text' />
          </WrapNumberInput>
          <LabelStyle>배송방법</LabelStyle>
          <ShipmentDiv>
            <MS_btn value=''>택배,소포,등기</MS_btn>
            <MS_btn_white value=''>직접배송(화물배달)</MS_btn_white>
          </ShipmentDiv>
          <WrapNumberInput>
            <LabelStyle htmlFor='shipment_fee'>기본 배송비</LabelStyle>
            <NumberInput name='shipment_fee' type='text' />
          </WrapNumberInput>
          <WrapNumberInput>
            <LabelStyle htmlFor='stock'>재고</LabelStyle>
            <NumberInput name='stock' type='text' />
          </WrapNumberInput>
        </OptionBox>
      </RightArea>

      {/* 에디터 영역 */}
      <EditorArea>
        <LabelStyle>상품 상세정보</LabelStyle>
        <EditorBox></EditorBox>
        <EditorBtnFlex>
          <MS_btn_white>취소</MS_btn_white>
          <MS_btn>저장하기</MS_btn>
        </EditorBtnFlex>
      </EditorArea>
    </SellerLayout>
  )
}
