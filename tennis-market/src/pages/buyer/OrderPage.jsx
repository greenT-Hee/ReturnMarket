import { useMutation, useQuery } from '@tanstack/react-query';
import { normalAxios } from '../../axios';
import { MS_btn, MS_btn_white, S_btn, S_btn_white } from '../../components/buttons';
import MainLayout from '../../components/layout/MainLayout';
import styled from 'styled-components';
import banner1 from '../../assets/images/banner1.png';
import banner2 from '../../assets/images/banner2.png';
import banner3 from '../../assets/images/banner3.jpg';
import { useEffect, useState } from 'react';
import OrderList from '../../components/order/OrderList';
import { ConfirmOpen, user_info } from '../../atom/Atom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { ComfirmModal } from '../../components/modal/comfirmModals';

export default function OrderPage() {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(user_info);
  const [openConfrim, setOpenConfirm] = useRecoilState(ConfirmOpen);
  const [isInCart, setIsInCart] = useState(true);
  const [confirmMsg, setConfirmMsg] = useState('');
  const [cartForPid, setCartForPid] = useState(0);

  // ---🐰 주문 목록 ---
  const getOrderList = async () => {
    return normalAxios.get('/order/');
    };
    
    const { isPending, isError, data, error, isSuccess} = useQuery({
      queryKey: ['order_list'],
      queryFn: getOrderList,
      });
    const order = data? data.data.results : [];

   //---🐰 cart ---
   const getCartList = async () => {
    if(userInfo.user_type) {
      return normalAxios.get('/cart/');
    } else {
      return false;
    }
  };

  const { isSuccess : cartOk, data : cart } = useQuery({
    queryKey: ['cartList'],
    queryFn: getCartList,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const handleConfrim =() => {
    if(!isInCart) {
      setOpenConfirm(false); 
      navigate('/cart');
    } else {
      cartMutate.mutate(cartData);
    }
  };

  const cartData = {
    "product_id": parseInt(cartForPid), //product의 id 값을 넣어주면 됩니다.
    "quantity": 1,
    "check" : isInCart, // 장바구니에 해당 제품이 있는지 확인합니다. False일 때는 확인용 모달창을 띄워야하고, True일 때 카트에 담을 수 있습니다.
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
  });

  
  return (
    <MainLayout>
      <ComfirmModal content={confirmMsg} btnFn={handleConfrim} />
      <SectionTop>
          <TopH1>주문 목록</TopH1>
      </SectionTop>
      <MainSection>
        <WrapBanner>
          <BannerImg src={banner1} alt="banner1" />
          <BannerImg src={banner2} alt="banner2" />
          <BannerImgMobile src={banner3} alt="banner3" />
        </WrapBanner>
        {/* 반복 */}
        <WrapArticle>
        {order.length === 0 && 
          <NoCont>결제된 상품이 없습니다.</NoCont>
        }
        {order?.map((ele, idx) => {
          return (
            <OrderArticle key={idx}>
              {/* {idx} */}
              <OrderNumberP>주문번호: <span>{ele.order_number}</span></OrderNumberP>
              <TopContBox>
                <OrderDateP><span>{ele.created_at.split("T")[0]}</span> 주문</OrderDateP>
                <DetailBtn type='button' onClick={() => navigate('/order/'+ ele.order_number)}>{'주문 상세보기 >'}</DetailBtn>
              </TopContBox>
              {ele.order_items.map((pid, item_idx) => {
                return  (
                  <OrderList 
                  pid={pid} 
                  unique_key={pid.toString() + ele.order_number.toString()} 
                  quantity={ele.order_quantity[item_idx]} 
                  cart={cart}
                  setIsInCart={setIsInCart}
                  setConfirmMsg={setConfirmMsg}
                  /> 
                )
                
              })}
              <ToTalPriceP>{ele.total_price.toLocaleString()}원</ToTalPriceP>
            </OrderArticle>
          )
          })}
        </WrapArticle>
      </MainSection>
    </MainLayout>
  )
}
const SectionTop = styled.section`
  width: 1320px;
  max-width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  margin: 157px auto 60px;
`
const TopH1 = styled.h1`
  font-size: 34px;
  font-weight: 600;
`

const MainSection = styled.section`
  width: 1320px;
  max-width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  margin: 0 auto 120px;
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
`
const WrapBanner = styled.div`
  width: 380px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media only screen and (max-width: 1080px) {
   width: 100%;
  }
`
const BannerImg = styled.img`
  width: 360px;
  @media only screen and (max-width: 1080px) {
   display: none;
  }
`
const BannerImgMobile = styled.img`
  width: 100%;
  display: none;
  @media only screen and (max-width: 1080px) {
   display: block;
  }
`
const WrapArticle = styled.div`
  flex-grow: 1;
`
const OrderArticle = styled.article`
  padding: 30px;
  border-radius: 8px;
  border: 1px solid ${({theme}) => theme.gray2};
  margin-bottom: 30px;
`
const TopContBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  @media only screen and (max-width: 500px) {
   flex-direction: column;
   align-items: flex-end;
   gap: 4px;
  }
  `
const OrderDateP = styled.p`
  font-size: 20px;
  font-weight: 600;
  color:  ${({theme}) => theme.sub};
  @media only screen and (max-width: 500px) {
  font-size: 18px;
  }
`
const OrderNumberP = styled.p`
  font-size: 16px;
  padding: 0 0 14px;
  font-size: 14px;
  color: ${({theme}) => theme.gray3};
`
const ToTalPriceP = styled.p`
  font-size: 20px;
  color: ${({theme}) => theme.red};
  text-align: right;
  font-weight: 700;
  padding: 10px 0 0;
`
const DetailBtn = styled.button`
  display: block;
  border: 0;
  background: 0;
  font-weight: 600;
  font-size: 16px;
  padding: 0;
  color: ${({theme}) => theme.gray3};
  cursor: pointer;
  @media only screen and (max-width: 500px) {
  font-size: 14px;
  }
`
const NoCont = styled.p`
  text-align: center;
  font-weight: 500;
  color: ${({theme}) => theme.gray3};
`