import { useEffect, useState } from "react";
import { normalAxios } from "../../axios";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { AlertOpen, TOTAL_PRICE } from "../../atom/Atom";
import deleteIcon from "../../assets/images/icon-delete.svg";
import { CartCheckbox } from "../inputs";
import { S_btn } from "../buttons";
import { useMutation } from "@tanstack/react-query";

export default function CartDetails({pid, iid, setCeckItems, checkItems, quantity, setAlertMsg, refetch}) {
  const [detail, setDetail] = useState(null);
  const [openAlert, setOpenAlert] = useRecoilState(AlertOpen);
  // --- 🩶 계산 관련 state 🩶---
  const [totalPrice, setTotalPrice] = useRecoilState(TOTAL_PRICE);
  const [count, setCount] = useState(quantity)

  const getDetails = async (pid) => {
    try {
      const res = await normalAxios.get('/products/' + parseInt(pid));
      if(res.status === 200){
        setDetail(res.data);
      }
      
    } catch (err) {
      console.log(err)
    }
  };
  useEffect(() => {
    if(pid) { getDetails(pid);}    
  }, [pid]);

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

  const calculateTotal = (e) => {
    if(e.target.id === 'plus_btn') {
      setCount(count + 1);
    }
    if(e.target.id === 'minus_btn') {
      if(count === 1) return;
      setCount(count - 1);   
    }
  };

  return (
    <>
    {detail && 
      <>
        <DeleteBtn type="button" onClick={() => clickDeleteSingleBtn(iid)}>
          <img src={deleteIcon} alt="장바구니에서 삭제 버튼"/> 
        </DeleteBtn>
        <Div1>
          <CartCheckbox id={iid} checkItems={checkItems} singleCheckHandler={singleCheckHandler}/>
        </Div1>
          <Div2>
            <PImage src={detail.image} alt={"ele.product_name "+ "썸네일"} /> 
            <div>
              <GrayP>{detail.store_name}</GrayP>
              <ProductNameP>{detail.product_name}</ProductNameP>
              <PriceP><span>{detail.price.toLocaleString()}</span>원</PriceP>
              <GrayP>
                <span>{detail.shipping_method === "PARCEL" ? "택배배송" : "직접배송"} / </span>
                <span>{detail.shipping_fee === 0 ? "무료배송" : detail.shipping_fee.toLocaleString() + "원" }</span>
              </GrayP>
            </div> 
          </Div2>
        <Div3>
          <CountBox>
            <CountMinus type="button" $minus="true" id="minus_btn" onClick={calculateTotal}>-</CountMinus>
            <CountNumber type="button">{quantity}</CountNumber>
            <CountPlus type="button" $plus="true" id="plus_btn" onClick={calculateTotal}>+</CountPlus>
          </CountBox>
        </Div3>
        <Div4>
          <TotalPriceP><span>{detail.price.toLocaleString()}</span>원</TotalPriceP>
          <S_btn>주문하기</S_btn>
        </Div4>
      </>
    }
    </>
  )
}


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