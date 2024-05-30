import styled from 'styled-components';
import SellerLayout from '../../components/layout/SellerLayout';
import { MS_btn, MS_btn_white } from '../../components/buttons';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import iconImg from '../../assets/images/icon-img.png';
import { normalAxios } from '../../axios';

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
  position: relative;
  width: 454px;
  max-width: 100%;
  height: 454px;
  background: ${({theme}) => theme.gray1};
  object-fit: cover;
  flex-shrink: 0;
  cursor: pointer;
`
const IconImg = styled.img`
  position: absolute;
  left: 50%;
  right: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

const PostImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  padding: 180px 0;
  margin-bottom: 30px;
  border: 1px solid  ${({theme}) => theme.gray2};
  background:  ${({theme}) => theme.gray1};
  text-align: center;
`

const EditorBtnFlex = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`


export default function RegistProductPage() {
  const navigate = useNavigate();
  const [postImg, setPostImg] = useState([]);
  const [previewImg, setPreviewImg] = useState([]);
  const [shipping_method, set_shipping_method] = useState('PARCEL');
  const [inputs, setInputs] = useState({
    "product_name" : "",
    "price" : "",
    "shipment_fee" : "",
    "stock" : "",
  });
  const { product_name, price, shipment_fee, stock} = inputs;
  function handleInputValue(e) {
    const { value, name } = e.target;
    if(e.target.name === 'price') {
      setInputs({...inputs, 'price': parseInt(value.replace(/[^0-9]/g, ''))})
    } else if(e.target.name === 'shipment_fee') {
      setInputs({...inputs, 'shipment_fee': parseInt(value.replace(/[^0-9]/g, ''))})
    } else if(e.target.name === 'stock') {
      setInputs({...inputs,'stock': parseInt(value.replace(/[^0-9]/g, ''))})
    } else {
      setInputs({
        ...inputs,
        [name]: value,
      });
    }
  };

  const imgRef = useRef(null);
  const formData = new FormData();
  const uploadFile = (e) => {
    if(imgRef.current && imgRef.current.files) {
      // 이미지 파일 세팅
      const currentImg = imgRef.current.files;
      setPostImg(currentImg);
      formData.append("file", postImg);
      
      //이미지 미리보기
      if(currentImg.length <= 0) return; 
      const reader = new FileReader();
      reader.readAsDataURL(currentImg[0])
      reader.onload = function() {
      setPreviewImg(reader.result);
      } 
    } else {
      return false;
    }
  }

  // 업로드 요청
  const uploadApi = () => {
    const blob = new Blob([JSON.stringify(inputs)], {type: "application/json"}) 
    formData.append('shipping_method', shipping_method);
    formData.append('product_info', 'helloworld\ntest');
    formData.append('data', blob);

    return normalAxios.post('/products/',formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }  
    })  
  };  

  // 401(토큰), 400
// data.data [
  //   {
  //     "product_name": [
  //         "이 필드는 필수 항목입니다."
  //     ],
  //     "image": [
  //         "파일이 제출되지 않았습니다."
  //     ],
  //     "price": [
  //         "이 필드는 필수 항목입니다."
  //     ],
  //     "shipping_fee": [
  //         "이 필드는 필수 항목입니다."
  //     ],
  //     "stock": [
  //         "이 필드는 필수 항목입니다."
  //     ]
  // }
// ]

  return (
    <SellerLayout>
      <RightArea>
        <ImageBox>
          <LabelStyle>상품이미지</LabelStyle>
          <label htmlFor="product_img">
            <WrapImg>
            {postImg.length > 0 ?
              <PostImg src={previewImg ? previewImg : ''} alt={postImg.name} /> :       
              <IconImg src={iconImg} alt="이미지 업로드 전" /> 
            }
            </WrapImg>
          </label>
          <input type="file" hidden id='product_img' onChange={e => uploadFile(e)} accept='.png, .jpeg, .jpg, .gif' ref={imgRef}/>
         
        </ImageBox>
        <OptionBox>
          <LabelStyle htmlFor='product_name'>상품명</LabelStyle>
          <Input value={product_name ? product_name : ""} name='product_name' type='text' placeholder='최대 20자' maxLength={20} onChange={handleInputValue}/>
          <WrapNumberInput>
            <LabelStyle htmlFor='price'>판매가</LabelStyle>
            <NumberInput name='price' value={price ? price.toLocaleString() : ""} type='text' onChange={handleInputValue}/>
          </WrapNumberInput>
          <LabelStyle>배송방법</LabelStyle>
          <ShipmentDiv>
            {shipping_method === 'PARCEL' ? 
              <MS_btn value='' btnFn={() => set_shipping_method('PARCEL')}>택배,소포,등기</MS_btn>
              : 
              <MS_btn_white btnFn={() => set_shipping_method('PARCEL')}>택배,소포,등기</MS_btn_white>
            
            }
            {shipping_method === 'DELIVERY' ? 
              <MS_btn value='DELIVERY' btnFn={() => set_shipping_method('DELIVERY')}>직접배송(화물배달)</MS_btn>
              : 
              <MS_btn_white value='DELIVERY' btnFn={() => set_shipping_method('DELIVERY')}>직접배송(화물배달)</MS_btn_white>
            }
          </ShipmentDiv>
          <WrapNumberInput>
            <LabelStyle htmlFor='shipment_fee'>기본 배송비</LabelStyle>
            <NumberInput value={shipment_fee ? shipment_fee.toLocaleString() : ""} name='shipment_fee' type='text' onChange={handleInputValue} />
          </WrapNumberInput>
          <WrapNumberInput>
            <LabelStyle htmlFor='stock'>재고</LabelStyle>
            <NumberInput value={stock ? stock.toLocaleString() : ""} name='stock' type='text' onChange={handleInputValue} />
          </WrapNumberInput>
        </OptionBox>
      </RightArea>

      {/* 에디터 영역 */}
      <EditorArea>
        <LabelStyle>상품 상세정보</LabelStyle>
        <EditorBox>👷 에디터 영역은 준비 중</EditorBox>
        <EditorBtnFlex>
          <MS_btn_white btnFn={() => navigate('/seller_center')}>취소</MS_btn_white>
          <MS_btn btnFn={uploadApi}>저장하기</MS_btn>
        </EditorBtnFlex>
      </EditorArea>
    </SellerLayout>
  )
}
