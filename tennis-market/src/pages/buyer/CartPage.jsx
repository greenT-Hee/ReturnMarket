import MainLayout from "../../components/layout/MainLayout";
import styled from "styled-components";
import { L_btn, S_btn_white } from "../../components/buttons";
import plusIcon from "../../assets/images/icon-plus-line.svg";
import minusicon from "../../assets/images/icon-minus-line.svg";
import { useMutation, useQuery } from "@tanstack/react-query";
import { normalAxios } from "../../axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { AlertOpen, TOTAL_PRICE, TOTAL_SHIPPING_FEE } from "../../atom/Atom";
import { AlertModal } from "../../components/modal/AlertModal";
import CartDetails from "../../components/cart/CartDetails";

export default function CartPage() {
  const [totalPrice, setTotalPrice] = useRecoilState(TOTAL_PRICE);
  const [totalShippinfee, setTotalShippinfee] = useRecoilState(TOTAL_SHIPPING_FEE);
  const [openAlert, setOpenAlert] = useRecoilState(AlertOpen);
  const [alertMsg, setAlertMsg] = useState('');
  const [checkItems, setCeckItems] = useState([]);
  
  const getCartList = async () => {
    return normalAxios.get('/cart/');
  };
  
  const { isSuccess : cartOk, data : cart, refetch} = useQuery({
    queryKey: ['cartList'],
    queryFn: getCartList,
    refetchOnWindowFocus: false,
    // retryOnMount: false,
    // refetchOnMount: false
  });
  
  const AllCheckHandler = (checked) => {
    if(checked) {
      const idArr = [];
      cart?.data?.results.map(ele => {idArr.push(ele.cart_item_id)});
      setCeckItems(idArr);
      return true;
    }
    else {
      setCeckItems([]);
      return false;
    }
  }
  
  // 전체 삭제
  const handleDeleteAll = () => {
    const isAllChecked = checkItems.length === cart?.data?.count;
    if(!isAllChecked) {
      setOpenAlert(true);
      setAlertMsg('상품을 모두 선택해주세요.');
    } else {
      deleteAll.mutate();
    }
  }

  const deleteAll = useMutation({
    mutationFn: () => {
      return normalAxios.delete('/cart/');
    },
    onSuccess : (data) => {
      if(data.status === 204) {
        refetch();
        setCeckItems([]);
      } else if(data.status === 401) {
      }
    },
    onError : (e) => {console.log(e.message)},
  })

  return (
    <MainLayout>
      <AlertModal content={alertMsg}/>
      <Main>
        <section>
          <H1>장바구니</H1>
          <WrapAllDelBtn>
            {cart?.data?.count > 0 && <S_btn_white btnFn={handleDeleteAll}>전체삭제</S_btn_white>}
          </WrapAllDelBtn>
          <h2 className="screen_out">장바구니 목록 영역</h2>
          <TopUl>
            <Li $first='true'>
              <AllCheckbox  
                type="checkbox" 
                onChange={(e)=>AllCheckHandler(e.target.checked)} 
                checked={(cart?.data?.count > 0 && (checkItems.length === cart?.data?.count)) ? true : false}
                />
              </Li>
            <Li $scd='true'>상품정보</Li>
            <Li $thd='true'>수량</Li>
            <Li $fth='true'>상품금액</Li>
          </TopUl>

          {/* 콘텐츠 없음 */}
          {cart?.data?.count === 0 && (
            <NoContP>장바구니에 담긴 상품이 없습니다.</NoContP>
          )}
          {/* 상품 리스트 */}
          { cart?.data?.results.map ((ele, idx) => {
            return (
              <Article key={idx}>
                <CartDetails 
                pid={ele.product_id} 
                iid={ele.cart_item_id} 
                quantity={ele.quantity} 
                setCeckItems={setCeckItems} 
                checkItems={checkItems}
                setAlertMsg={setAlertMsg}
                refetch={refetch}
                is_active={ele.is_active}
                />
              </Article>
            )
          })}
        </section>

        {cart?.data.count > 0 &&
          <section>
            <h2 className="screen_out">장바구니 총 가격 계산 영역</h2>
            <TotalLineUl>
              <li>
                <p>총 상품금액</p>
                <ListTitle><BoldSpan>{totalPrice.toLocaleString()}</BoldSpan>원</ListTitle>
              </li>
              <li>
                <img src={minusicon} alt="마이너스 아이콘"/>
                </li>
              <li>
                <p>상품 할인</p>
                <ListTitle><BoldSpan>0</BoldSpan>원</ListTitle>
              </li>
              <li>
                <img src={plusIcon} alt="플러스 아이콘"/>
              </li>
              <li>
                <p>배송비</p>
                <ListTitle><BoldSpan>{totalShippinfee.toLocaleString()}</BoldSpan>원</ListTitle>
              </li>
              <li>
                <BoldSpan $small='true'>결제 예정 금액</BoldSpan>
                <ListTitle $red='true'><BoldSpan $big='true'>{(totalShippinfee + totalPrice).toLocaleString()}</BoldSpan>원</ListTitle>
              </li>
            </TotalLineUl>
            <OrderAllBtnDiv>
              <L_btn>주문하기</L_btn>
            </OrderAllBtnDiv>
          </section>
          }
      </Main>
    </MainLayout>
  )
}

const Main = styled.main`
  padding: 107px 20px 180px;
  width: 1300px;
  max-width: 100%;
  box-sizing: border-box;
  margin: 0 auto;
`
const H1 = styled.h1`
  font-size: 36px;
  font-weight: 700;
  text-align: center;
  padding: 80px 0 50px;
`
const NoContP = styled.p`
  padding: 100px 0;
  font-weight: 500;
  text-align: center;
`
const WrapAllDelBtn = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`
const TopUl = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px;
  background: ${({theme}) => theme.gray1};
  border-radius: 8px;
  margin-bottom: 35px;
`
const Li = styled.li`
  text-align: center;
  font-size: 18px;
  box-sizing: border-box;
  width: ${(props) => props.$first ? '10%' : ''};
  width: ${(props) => props.$scd ? '50%' : ''};
  width: ${(props) => props.$thd ? '20%' : ''};
  width: ${(props) => props.$fth ? '20%' : ''};
`

const Article = styled.article`
  position: relative;
  display: flex;
  align-items: center;
  margin: 20px 0;
  padding: 18px;
  box-sizing: border-box;
  border-radius: 10px;
  border: 1px solid ${({theme}) => theme.gray1};

  @media only screen and (max-width: 860px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 40px;
  }
`
const AllCheckbox = styled.input`
  width: 16px;
  height: 16px;
  accent-color: ${({theme}) => theme.main};
`

// --- 최종 하단 ---
const TotalLineUl = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background: ${({theme}) => theme.gray1};
  padding:  45px 0;
  margin: 80px 0 40px;
  text-align: center;
  border-radius: 10px;
`
const OrderAllBtnDiv = styled.div`
  display: flex;
  justify-content: center;
`

const ListTitle = styled.p`
  padding-top: 10px;
  color: ${(props) => props.$red ? props.theme.red : props.theme.b };
`
const BoldSpan = styled.span`
  font-size: ${(props) => props.$small ? '24px' : '20px'};
  font-size: ${(props) => props.$big ? '36px' : '20px'};
  font-weight: 700;
`
