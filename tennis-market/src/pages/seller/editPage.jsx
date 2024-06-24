import styled from 'styled-components';
import SellerLayout from '../../components/layout/SellerLayout';
import { MS_btn, MS_btn_white } from '../../components/buttons';
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import iconImg from '../../assets/images/icon-img.png';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AlertModal } from '../../components/modal/AlertModal';
import { useRecoilState } from 'recoil';
import { AlertOpen } from '../../atom/Atom';
import { normalAxios } from '../../axios';
import ResetRecoilContext from '../../ResetRecoilContext';
import Cookies from 'universal-cookie';
import Spinner from '../../components/spinner';


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
    content: "원";
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
    line-height: 1.2;
  }
`
const WrapNumberInput_stock = styled.div`
  position: relative;
  width: 220px;
  ::after {
    display: block;
    content: "개";
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
    line-height: 1.2;
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
const EditorBox = styled.textarea`
  width: calc(100% - 60px);
  height: 100px;
  padding: 30px;
  margin-bottom: 30px;
  border: 1px solid  ${({theme}) => theme.gray2};
  background:  ${({theme}) => theme.w};
  resize: none;
  overflow-y: scroll;
  outline: none;
`

const EditorBtnFlex = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`
const EssentailSpan = styled.span`
  font-size: 14px;
  color: ${({theme}) => theme.red};
  /* padding: 6px 0; */
`


export default function EditPage() {
  const navigate = useNavigate();
  const {pid} = useParams();
  const [isLoading, setIsLoading] = useState(false); 
  const [postImg, setPostImg] = useState([]);
  const [previewImg, setPreviewImg] = useState([]);
  // error
  const [errAlertCont,setErrAlertCont] = useState('');
  const [errFn,setErrFn] = useState(null);
  const [alertOpen, setAlertOpen] = useRecoilState(AlertOpen);

  
  const getDetail = async () => {
    return normalAxios.get('/products/' + parseInt(pid));
  };
  const { isPending, isError, data, error, isSuccess} = useQuery({
    queryKey: ['product_detail', pid],
    queryFn: getDetail,
    refetchOnWindowFocus: false,
    onSuccess : (data) => {alert(data)}
  });
  
  const [shipping_method, set_shipping_method] = useState("");
  const [inputs, setInputs] = useState({
    "product_name" : "",
    "price" :0,
    "shipping_fee" :"",
    "stock" :"",
    "product_info": "",
    "image": ""
  })
  useEffect(() => {
    if(isSuccess) {
      setInputs({
        "product_name" : data.data.product_name,
        "price" : data.data.price,
        "shipping_fee" : data.data.shipping_fee,
        "stock" : data.data.stock,
        "product_info" : data.data.product_info,
        "image": data.data.image 
      });
      set_shipping_method(data.data.shipping_method);
    }
  }, [isSuccess]);

  const { product_name, price, shipping_fee, stock, product_info, image} = inputs;
  
  function handleInputValue(e) {
    const { value, name } = e.target;
    if(e.target.name === 'price') {
      setInputs({...inputs, 'price': parseInt(value.toString().replace(/[^0-9]/g, ''))})
    } else if(e.target.name === 'shipping_fee') {
      setInputs({...inputs, 'shipping_fee': parseInt(value.replace(/[^0-9]/g, ''))})
    } else if(e.target.name === 'stock') {
      setInputs({...inputs,'stock': parseInt(value.replace(/[^0-9]/g, ''))})
    } else {
      setInputs({
        ...inputs,
        [name]: value,
      });
    }
  };
  // -- formdata 처리 ---
  const imgRef = useRef(null);
  const formData = new FormData();
  const uploadFile = (e) => {
    if(imgRef.current && imgRef.current.files) {
      // 이미지 파일 세팅
      const currentImg = imgRef.current.files;
      setPostImg(currentImg);
      // console.log(postImg)
      // formData.append("image", imgRef.current.files);
      
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

  // --- 업로드 api 요청 ---
  const uploadApi = useMutation({
    mutationFn: () => {
      setIsLoading(true);
      const postData = {
        "product_name" : product_name,
        "price" : price,
        "shipping_fee" : shipping_fee,
        "stock" : stock,
        "image": postImg ? postImg[0] : image,
        "shipping_method" : shipping_method,
        "product_info" : product_info
      }

      return normalAxios.put(`/products/${pid}/`,postData,{
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }) 
    },
    onSettled: () => {
      setIsLoading(false);
    },
    onSuccess : (data) => {
      if(data.status === 200) {
        setIsLoading(false);
        navigate(`/product/${pid}`);
      } else if(data.status === 400) {
        setAlertOpen(true);
        setErrAlertCont('필수값을 다시 확인해주세요');
        setErrFn(() => scrollToTop);
      } else if(data.status === 401) {
        setIsLoading(false);
        setAlertOpen(true);
        setErrAlertCont(data.data.detail);
        setErrFn(() => logout())
      }
    },
    onError : (e) => {console.log(e.message)},
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setAlertOpen(false)
  };
  
  return (
    <SellerLayout>
      {isLoading && <Spinner />}
      <AlertModal content={errAlertCont} btnFn={errFn}/>
      {isSuccess && 
        <>
        <RightArea>
          <ImageBox>
            <LabelStyle>상품이미지 <EssentailSpan>(필수)</EssentailSpan> </LabelStyle>
            <label htmlFor="product_img">
            <WrapImg>
              <>
                {(postImg.length > 0)  ? 
                  <PostImg src={previewImg} alt={previewImg ? postImg.name : "썸네일"} /> :
                  <PostImg src={image} alt={product_name} /> 
                }
              </>
            </WrapImg>
            </label>
            <input type="file" hidden id='product_img' onChange={e => uploadFile(e)} accept='.png, .jpeg, .jpg, .gif' ref={imgRef}/>
          
          </ImageBox>
          <OptionBox>
            <LabelStyle htmlFor='product_name'>상품명<EssentailSpan> (필수)</EssentailSpan></LabelStyle>
            <Input value={product_name} name='product_name' type='text' placeholder='최대 20자' maxLength={20} onChange={handleInputValue}/>
            <WrapNumberInput>
              <LabelStyle htmlFor='price'>판매가<EssentailSpan> (필수)</EssentailSpan></LabelStyle>
              <NumberInput name='price' value={price.toLocaleString() === 'NaN' ? '' : price.toLocaleString()} type='text' onChange={handleInputValue}/>
            </WrapNumberInput>
            <LabelStyle>배송방법 <EssentailSpan> (필수)</EssentailSpan></LabelStyle>
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
              <LabelStyle htmlFor='shipping_fee'>기본 배송비 <EssentailSpan> (필수)</EssentailSpan></LabelStyle>
              <NumberInput value={shipping_fee.toLocaleString() === 'NaN' ? '' : shipping_fee.toLocaleString()} name='shipping_fee' type='text' onChange={handleInputValue} />
            </WrapNumberInput>
            <WrapNumberInput_stock>
              <LabelStyle htmlFor='stock'>재고 <EssentailSpan>(필수)</EssentailSpan></LabelStyle>
              <NumberInput value={stock.toLocaleString() === 'NaN' ? '' : stock.toLocaleString()} name='stock' type='text' onChange={handleInputValue} />
            </WrapNumberInput_stock>
          </OptionBox>
        </RightArea>

        <EditorArea>
          <LabelStyle htmlFor='product_info'>상품 상세정보 <EssentailSpan>(필수)</EssentailSpan></LabelStyle>
          <EditorBox id='product_info' name="product_info"  placeholder='상품 정보를 입력해주세요.' value={product_info} onChange={handleInputValue}></EditorBox>
          <EditorBtnFlex>
            <MS_btn_white btnFn={() => navigate('/seller_center')}>취소</MS_btn_white>
            <MS_btn btnFn={() => uploadApi.mutate()}>수정하기</MS_btn>
          </EditorBtnFlex>
        </EditorArea>
        </>
      } 
      

      {/* 에디터 영역 */}
    </SellerLayout>
  )
}
