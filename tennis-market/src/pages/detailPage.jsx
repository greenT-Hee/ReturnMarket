import { useNavigate, useParams } from "react-router-dom"
import MainLayout from "../components/layout/MainLayout";
import styled from "styled-components";
import { MS_btn, MS_btn_disable, MS_btn_white, M_btn, M_btn_disable, Tab_active_btn, Tab_disable_btn } from "../components/buttons";
import rabbit from "../assets/images/rabbit.png";
import { normalAxios } from "../axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { ConfirmOpen, user_info, user_role } from "../atom/Atom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { ComfirmModal } from "../components/modal/comfirmModals";


export default function DetailPage() {
  const { pid } = useParams();
  const navigate = useNavigate();
  const userInfo = useRecoilValue(user_info);
  const desc_ref = useRef(null);
  const [count, setCount] = useState(1);
  const [isInCart, setIsInCart] = useState(true);
  const [openConfrim, setOpenConfirm] = useRecoilState(ConfirmOpen);
  const [confirmMsg, setConfirmMsg] = useState('');
 
  const getDetail = async () => {
    return normalAxios.get('/products/' + parseInt(pid));
  };
  const getCartList = async () => {
    if(userInfo.user_type) {
      return normalAxios.get('/cart/');
    } else {
      return false;
    }
  };

  const { isSuccess, isPending , data : detail_data } = useQuery({
    queryKey: ['product_detail', pid],
    queryFn: getDetail,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const { isSuccess : cartOk, data : cart } = useQuery({
    queryKey: ['cartList'],
    queryFn: getCartList,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const calculateTotal = (e) => {
    if(e.target.id === 'plus_btn') {
      if(count === detail_data.data.stock) return;
      setCount(count + 1);
    }
    if(e.target.id === 'minus_btn') {
      if(count === 1) return;
      setCount(count - 1);   
    }
  };

  useEffect(() => {
    if(cartOk) {
      if(cart?.data?.results.length > 0) {
        cart.data.results.map((ele) => {
          if(ele.product_id === parseInt(pid)) setIsInCart(false);
        })
      }
    }
  }, [cartOk])

  const cartData = {
    "product_id": parseInt(pid), //product의 id 값을 넣어주면 됩니다.
    "quantity": count,
    "check" : isInCart, // 장바구니에 해당 제품이 있는지 확인합니다. False일 때는 확인용 모달창을 띄워야하고, True일 때 카트에 담을 수 있습니다.
  }

  const handleConfrim =() => {
    if(!isInCart) {
      setOpenConfirm(false); 
      navigate('/cart');
    } else {
      cartMutate.mutate(cartData);
    }
  }

  const addCart = () => {
    if(!isInCart) {
      setOpenConfirm(true);
      setConfirmMsg('이미 동일한 상품이 존재합니다.\n장바구니로 이동할까요?');
    } else {
      setOpenConfirm(true);
      setConfirmMsg('장바구니에 담으시겠습니까?');
    }
  }

  const cartMutate = useMutation({
    mutationFn: (data) => {
      // 예외 : cart에 이미 있음
      return normalAxios.post('/cart/', data);
    },
    onSuccess : (data) => {
      if(data.status === 201) {
        navigate('/cart');
        setOpenConfirm(false);
      } else if(data.status === 400) {
        
      }
    },
    onError : (e) => {console.log(e.message)},
  })

  return (
    <MainLayout>
    {isPending && 
      <Main> 
        <section>
          <h2 className="screen_out">상품 정보</h2>
          <ContentArticle>      
            <LoadingThumbnail></LoadingThumbnail> 
            <ContBox>
            <div>
                <LoadingP $150></LoadingP>
                <LoadingP $250></LoadingP>
                <LoadingP $200></LoadingP>
              </div>
            </ContBox>
          </ContentArticle>
        </section>
      </Main>
    }
    {isSuccess && 
      <Main> 
        <ComfirmModal content={confirmMsg} btnFn={handleConfrim} />
        <section>
          <h2 className="screen_out">상품 정보</h2>
          <ContentArticle>      
            <Thumbnail src={detail_data.data.image} alt="" /> 
            <ContBox>
              <div>
                <StoreP>{detail_data.data.store_name}</StoreP>
                <ProductP>{detail_data.data.product_name}</ProductP>
                <PriceP><PriceSpan>{detail_data.data.price.toLocaleString()}</PriceSpan>원</PriceP>
              </div>

                  <div>
                    <DeliveryP>
                      <span>{detail_data.data.shipping_method === 'PARCEL' ? '택배배송' : '직접배송'} / </span>
                      <span>{detail_data.data.shipping_fee === 0 ? '무료배송' : detail_data.data.shipping_fee.toLocaleString() + '원'}</span></DeliveryP>
                    <CountBox onClick={calculateTotal}>
                      <CountMinus type="button" $minus="true" id="minus_btn">-</CountMinus>
                      <CountNumber type="button">{count}</CountNumber>
                      <CountPlus type="button" $plus="true" id="plus_btn">+</CountPlus>
                    </CountBox>
                  </div>
                
                  <PriceBox>
                    <p>총 상품금액</p>
                    <TotalNumBox>
                      <CountP>남은 수량 <CountSpan>{detail_data.data.stock}</CountSpan>개</CountP>
                      <CountP> | </CountP>
                      <TotalP><TotalSpan>{(count * detail_data.data.price).toLocaleString()}</TotalSpan>원</TotalP>
                    </TotalNumBox>
                  </PriceBox>
                  {detail_data.data.stock > 0 ?
                    <>
                     {(userInfo.user_type === 'BUYER') && 
                       <OrderBtnFelx>
                         <M_btn>바로구매</M_btn>
                         <MS_btn_white btnFn={addCart}>장바구니</MS_btn_white>
                       </OrderBtnFelx>
                     }
                     {(userInfo.user_type === 'SELLER') && 
                       <OrderBtnFelx>
                         <RedFontP>구매자만 상품을 구매할 수 있습니다.</RedFontP>
                       </OrderBtnFelx>     
                     }
                    </>
                    :
                    <OrderBtnFelx>
                      <RedFontP>품절 상품입니다.</RedFontP>
                    </OrderBtnFelx>  
                  }
              
            </ContBox>
          </ContentArticle>
        </section>

        <section>
          <h2 className="screen_out">상품 디테일 설명</h2>
          <TabBtnFelx>
            <Tab_active_btn>상세설명</Tab_active_btn>
            <Tab_disable_btn>리뷰</Tab_disable_btn>
            <Tab_disable_btn>Q&A</Tab_disable_btn>
            <Tab_disable_btn>반품/교환정보</Tab_disable_btn>
          </TabBtnFelx>

          <Textarea readOnly ref={desc_ref} value={detail_data.data.product_info}></Textarea>
        </section>
      </Main>
    }
    </MainLayout>
  )
}

// --- style ---
const Main = styled.main`
  width: 1300px;
  max-width: 100%;
  box-sizing: border-box;
  padding: 200px 20px 130px;
  margin: 0 auto;
`
const ContentArticle = styled.article`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: 50px;

  @media only screen and (max-width: 1200px) {
    justify-content: center;
  }
`
const ContBox = styled.div`
  width: calc(100% - 750px);
  @media only screen and (max-width: 1200px) {
    width: 100%;
  }
`
const Thumbnail = styled.img`
  width: 600px;
  max-width: 100%;
  height: 600px;
  object-fit: cover;
`

const LoadingThumbnail = styled.div`
  width: 600px;
  max-width: 100%;
  height: 600px;
  background: ${({theme}) => theme.gray1};
  `

const LoadingP = styled.p`
  padding: 14px 0;
  width: ${(props) => props.$150 ? `150px` : ``};
  width: ${(props) => props.$250 ? `250px` : ``};
  width: ${(props) => props.$200 ? `200px` : ``};
  background: ${({theme}) => theme.gray1};
  margin: 0 0 6px;
`

const StoreP = styled.p`
  font-size: 18px;
  color: ${({theme}) => theme.gray3};
  @media only screen and (max-width: 1200px) {
    font-size: 16px;
  }
`
const ProductP = styled.p`
  font-size: 36px;
  padding: 20px 0 16px;
  @media only screen and (max-width: 1200px) {
    font-size: 24px;
  }
`
const PriceP = styled.p`
  font-size: 18px;
  margin-bottom: 138px;
  @media only screen and (max-width: 1200px) {
    font-size: 16px;
  }
`
const PriceSpan = styled.span`
  font-size: 45px;
  font-weight: 600;
  @media only screen and (max-width: 1200px) {
    font-size: 28px;
  }
`
const DeliveryP = styled.p`
  color: ${({theme}) => theme.gray3};
`

const CountBox = styled.div`
  border-top: 2px solid ${({theme}) => theme.gray2};
  border-bottom: 2px solid ${({theme}) => theme.gray2};
  padding: 30px 0;
  margin: 20px 0 40px;
  display: flex;
  `

const CountMinus = styled.button`
  display: block;
  border-radius: 4px 0 0 4px;
  border: 1px solid ${({theme}) => theme.gray2};
  background: ${({theme}) => theme.w};
  font-size: 24px;
  line-height: 0.8;
  width: 50px;
  height: 50px;
  cursor: pointer;
`
const CountPlus = styled.button`
  display: block;
  border-radius: 0 4px 4px 0;
  border: 1px solid ${({theme}) => theme.gray2};
  background: ${({theme}) => theme.w};
  font-size: 20px;
  line-height: 0.9;
  width: 50px;
  height: 50px;
  cursor: pointer;
`
const CountNumber = styled.button`
  display: block;
  border-radius: 0;
  border: 1px solid ${({theme}) => theme.gray2};
  border-right: 0;
  border-left: 0;
  background: ${({theme}) => theme.w};
  font-weight: 600;
  line-height: 0;
  width: 50px;
  height: 50px;
  cursor: pointer;
`

const PriceBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
`
const TotalNumBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`
const CountP = styled.p`
  color: ${({theme}) => theme.gray3};
`
const CountSpan = styled.span`
  color: ${({theme}) => theme.sub};
`
const TotalP = styled.p`
  color: ${({theme}) => theme.sub};
`
const TotalSpan = styled.span`
  font-size: 36px;
  font-weight: 600;
  @media only screen and (max-width: 1200px) {
    font-size: 32px;
  }
`

const OrderBtnFelx = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 14px;
`

const RedFontP = styled.p`
  color: ${({theme}) => theme.red};
  font-weight: 500;
  font-size: 14px;
`

const TabBtnFelx = styled.div`
  display: flex;
  margin: 120px 0 60px;
  justify-content: space-between;
  align-items: center;
`

const Textarea = styled.textarea`
  width: 100%;
  height: 200px;
  overflow-y: scroll;
  padding: 20px;
  box-sizing: border-box;
  resize: none;
  border: 1px solid ${({theme}) => theme.gray2};
  outline: none;
`