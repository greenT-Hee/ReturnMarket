import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { normalAxios } from "../../axios";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { AlertOpen, TOTAL_PRICE, TOTAL_SHIPPING_FEE } from "../../atom/Atom";
import deleteIcon from "../../assets/images/icon-delete.svg";
import { CartCheckbox } from "../inputs";
import { S_btn } from "../buttons";
import { useMutation, useQuery } from "@tanstack/react-query";

function CartDetails({pid, iid, setCeckItems, checkItems, quantity, setAlertMsg, refetch, is_active}) {
  // const [detail, setDetail] = useState(null);
  const [openAlert, setOpenAlert] = useRecoilState(AlertOpen);
  // --- 🩶 계산 관련 state 🩶---
  const [totalPrice, setTotalPrice] = useRecoilState(TOTAL_PRICE);
  const [totalShippinfee, setTotalShippinfee] = useRecoilState(TOTAL_SHIPPING_FEE);
  const [count, setCount] = useState(quantity);
  const [isMount, setIsMount] = useState(false);

  const getDetails = async () => {
    return normalAxios.get('/products/' + parseInt(pid));
  };

  const { isSuccess, data : detail, isFetching} = useQuery({
    queryKey: ['detail', pid],
    queryFn: getDetails,
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
        setCeckItems([]);
        refetch();
      }
    },
    onError : (e) => {console.log(e.message)},
  });
  
  // --- count 수정 ----
  const calculateCount = (e) => {
    if(e.target.id === 'plus_btn') {
      setCount(count + 1);
      setTotalPrice(totalPrice + detail.data.price)
    }
    if(e.target.id === 'minus_btn') {
      if(count === 1) return;
      setCount(count - 1);   
      setTotalPrice(totalPrice - detail.data.price)
    }
  };
  
  const editCountData = {
    "product_id": pid ,
    "quantity": count,
		"is_active": is_active,  // 장바구니 내 상품 활성화 버튼, 같이 보내지 않으면 False
  }

  const editCountMutate = useMutation({
    mutationFn: (editCountData) => {
      return normalAxios.put(`/cart/${parseInt(iid)}/`, editCountData);
    },
    onSuccess : (data) => {
      if(data.status === 200) {
        setOpenAlert(true);
        setAlertMsg("수량이 수정되었습니다.");
      }
    },
    onError : (e) => {console.log(e.message)},
  });
  

  let cost = 0;
  let shipping = 0
  useEffect( () => {
    if(isMount) return;
    if(!isFetching) {
     setTotalPrice(totalPrice + (detail.data.price * count));
     setTotalShippinfee(totalShippinfee + detail.data.shipping_fee);
     setIsMount(true);
    } else {
      setTotalPrice(0);
      setTotalShippinfee(0);
    }
  }, [isFetching])

  return (
    <>
    {isSuccess && 
      <>
      <p>{totalPrice}  {totalShippinfee}</p>
        <DeleteBtn type="button" onClick={() => clickDeleteSingleBtn(iid)}>
          <img src={deleteIcon} alt="장바구니에서 삭제 버튼"/> 
        </DeleteBtn>
        <Div1>
          <CartCheckbox id={iid} checkItems={checkItems} singleCheckHandler={singleCheckHandler}/>
        </Div1>
          <Div2>
            <PImage src={detail.data.image} alt={"ele.product_name "+ "썸네일"} /> 
            <div>
              <GrayP>{detail.data.store_name}</GrayP>
              <ProductNameP>{detail.data.product_name}</ProductNameP>
              <PriceP><span>{detail.data.price.toLocaleString()}</span>원</PriceP>
              <GrayP>
                <span>{detail.data.shipping_method === "PARCEL" ? "택배배송" : "직접배송"} / </span>
                <span >{detail.data.shipping_fee === 0 ? "무료배송" : detail.data.shipping_fee.toLocaleString() + "원" }</span>
              </GrayP>
            </div> 
          </Div2>
        <Div3>
          <CountBox>
            <CountMinus type="button" $minus="true" id="minus_btn" onClick={calculateCount}>-</CountMinus>
            <CountNumber type="button">{count}</CountNumber>
            <CountPlus type="button" $plus="true" id="plus_btn" onClick={calculateCount}>+</CountPlus>
          </CountBox>
          <EditBtn type="button" onClick={() => editCountMutate.mutate(editCountData)}>옵션 수정 완료</EditBtn>
        </Div3>
        <Div4>
          <TotalPriceP><span >{(detail.data.price * count).toLocaleString()}</span>원</TotalPriceP>
          <S_btn>주문하기</S_btn>
        </Div4>
      </>
    }
    </>
  )
}

// export default React.memo(CartDetails)
export default CartDetails


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
  @media only screen and (max-width: 860px) {
    width: 100%;
    flex-wrap: wrap;
  }
`
const Div3 = styled.div`
  width: 20%;
  @media only screen and (max-width: 860px) {
    width: 100%;
  }

`
const Div4 = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 860px) {
    width: 100%;
    align-items: flex-end;
  }
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
const EditBtn = styled.button`
  display: block;
  background: none;
  border: 1px solid ${({theme}) => theme.gray2};
  border-radius: 4px;
  padding: 6px 5px;
  font-size: 12px;
  color: ${({theme}) => theme.gray3};
  font-weight: 500;
  margin: 10px auto 0;
  cursor: pointer;

  @media only screen and (max-width: 860px) {
    margin: 10px 0 0;
  }
`
const CountBox = styled.div`
  display: flex;
  justify-content: center;
  @media only screen and (max-width: 860px) {
    margin: 10px 0 0;
    justify-content: flex-start;
  }
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