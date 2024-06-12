import MainLayout from "../../components/layout/MainLayout";
import styled from "styled-components";
import img from "../../assets/images/rabbit.png";
import { L_btn, S_btn, S_btn_white } from "../../components/buttons";
import deleteIcon from "../../assets/images/icon-delete.svg";
import plusIcon from "../../assets/images/icon-plus-line.svg";
import minusicon from "../../assets/images/icon-minus-line.svg";
import { CartCheckbox } from "../../components/inputs";
import { useMutation, useQuery } from "@tanstack/react-query";
import { normalAxios } from "../../axios";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { AlertOpen, ConfirmOpen } from "../../atom/Atom";
import { AlertModal } from "../../components/modal/AlertModal";

export default function CartPage() {
  const [openAlert, setOpenAlert] = useRecoilState(AlertOpen);
  const [alertMsg, setAlertMsg] = useState('');
  const [checkItems, setCeckItems] = useState([]);
  // const [deleteId, setDeleteId] = useState('')
  const getCartList = async () => {
    return normalAxios.get('/cart/');
  };
  
  const { isSuccess : cartOk, data : cart, refetch} = useQuery({
    queryKey: ['cartList'],
    queryFn: getCartList,
    refetchOnWindowFocus: false,
  });

  // ----- checkbox ------
  const singleCheckHandler = (checked, id) => {
    if(checked) {
      setCeckItems(prev => [...prev, id]);
    } else {
      setCeckItems(checkItems.filter(ele => ele !== id));
    }
  } 
  
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

  // --- 단일 삭제 ---
  // -- 단일 삭제 체크 여부 ---
  const clickDeleteSingleBtn = (item_id) => {
    if(!checkItems.includes(item_id)) {
      setOpenAlert(true);
      setAlertMsg('해당 상품을 선택해주세요.');
    } else {
      deleteSingle.mutate(item_id);
    }
  }
  const deleteSingle = useMutation({
    mutationFn: (cart_id) => {
      return normalAxios.delete('/cart/' + parseInt(cart_id));
    },
    onSuccess : (data) => {
      if(data.status === 204) {
        setOpenAlert(true);
        setAlertMsg("상품이 삭제되었습니다.");
        setCeckItems([]);
        refetch();
      }
    },
    onError : (e) => {console.log(e.message)},
  });
  
  // 전체 삭제
  const handleDeleteAll = () => {
    const isAllChecked = checkItems.length === cart?.data?.count;
    console.log(isAllChecked)
    if(!isAllChecked) {
      setOpenAlert(true);
      setAlertMsg('상품을 모두 선택헤주세요.');
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
        setOpenAlert(true);
        setAlertMsg("상품이 삭제되었습니다.");
        refetch();
        setCeckItems([]);
      } else if(data.status === 401) {
      }
    },
    onError : (e) => {console.log(e.message)},
  })


  return (
    <MainLayout>
      <Main>
        <section>
          <AlertModal content={alertMsg}/>
          <H1>장바구니</H1>
          <WrapAllDelBtn>
            {cart?.data?.count > 0 && <S_btn_white btnFn={handleDeleteAll}>전체삭제</S_btn_white>}
          </WrapAllDelBtn>
          <h2 className="screen_out">장바구니 목록 영역</h2>
          <TopUl>
            {/* 전체 체크박스 */}
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
          {cart?.data.count === 0 && (
            <NoContP>등록된 상품이 없습니다.</NoContP>
          )}
          {cart?.data.results.map ((ele, idx) => {
            return (
            <Article key={idx}>
              <DeleteBtn type="button" onClick={() => clickDeleteSingleBtn(ele.cart_item_id)}>
                <img src={deleteIcon} alt="장바구니에서 삭제 버튼"/> 
              </DeleteBtn>
              <Div1>
                {/* 개별 체크 박스 */}
                <CartCheckbox id={ele.cart_item_id} checkItems={checkItems} singleCheckHandler={singleCheckHandler}/>
              </Div1>
              <Div2>
                <PImage src={img} alt="" />
                <div>
                  <GrayP>백엔드글로벌</GrayP>
                  <ProductNameP>딥러닝 개발자 무릎 담요</ProductNameP>
                  <PriceP><span>17,500</span>원</PriceP>
                  <GrayP><span>택배배송 / </span><span>무료배송</span></GrayP>
                </div>
              </Div2>
              <Div3>
                <CountBox>
                  <CountMinus type="button" $minus="true" id="minus_btn">-</CountMinus>
                  <CountNumber type="button">{ele.quantity}</CountNumber>
                  <CountPlus type="button" $plus="true" id="plus_btn">+</CountPlus>
                </CountBox>
              </Div3>
              <Div4>
                <TotalPriceP><span>17,500</span>원</TotalPriceP>
                <S_btn>주문하기</S_btn>
              </Div4>
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
                <ListTitle><BoldSpan>46,500</BoldSpan>원</ListTitle>
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
                <ListTitle><BoldSpan>0</BoldSpan>원</ListTitle>
              </li>
              <li>
                <BoldSpan $small='true'>결제 예정 금액</BoldSpan>
                <ListTitle $red='true'><BoldSpan $big='true'>46,500</BoldSpan>원</ListTitle>
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
`
const AllCheckbox = styled.input`
  width: 16px;
  height: 16px;
  accent-color: ${({theme}) => theme.main};
`

const DeleteBtn = styled.button`
  display: block;
  position: absolute;
  right: 18px;
  top: 18px;
  border: unset;
  background: none;
  cursor: pointer;
`
// --- DIV 구역 ----
const Div1 = styled.div`
  text-align: center;
  width: 10%;
`
const Div2 = styled.div`
  display: flex;
  gap: 36px;
  justify-content: flex-start;
  align-items: center;
  width: 50%;
  flex-shrink: 1;
`
const Div3 = styled.div`
  width: 20%;

`
const Div4 = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  align-items: center;
`

// -- 상품정보 --
const PImage = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 10px;
  object-fit: cover;
`

const GrayP = styled.p`
  font-size: 14px;
  color: ${({theme}) => theme.gray3};
`
const ProductNameP = styled.p`
  font-size: 18px;
  padding: 10px 0;
`
const PriceP = styled.p`
  font-weight: 700;
  margin-bottom: 60px;
`

// -- 수량 ---
const CountBox = styled.div`
  display: flex;
  justify-content: center;
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

// --- 싱픔금액 ---
const TotalPriceP = styled.p`
  font-size: 20px;
  font-weight: 700;
  color: ${({theme}) => theme.red};
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
