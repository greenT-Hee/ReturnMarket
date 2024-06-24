import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { normalAxios } from "../../axios";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { AlertOpen, OREDER_DATA, OREDER_PRODUCT_ARRAY, TOTAL_PRICE, TOTAL_SHIPPING_FEE } from "../../atom/Atom";
import deleteIcon from "../../assets/images/icon-delete.svg";
import { CartCheckbox } from "../inputs";
import { S_btn } from "../buttons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Spinner from "../spinner";

function CartDetails({pid, iid, setCeckItems, checkItems, quantity, setAlertMsg, refetch, cart_itmem_count,is_active}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [openAlert, setOpenAlert] = useRecoilState(AlertOpen);
  // --- 🩶 계산 관련 state 🩶---
  const [totalPrice, setTotalPrice] = useRecoilState(TOTAL_PRICE);
  const [totalShippinfee, setTotalShippinfee] = useRecoilState(TOTAL_SHIPPING_FEE);
  const [count, setCount] = useState(quantity);
  const [orderData, setOrderData] = useRecoilState(OREDER_DATA);
  const [orderProductArr, setOrderProductArr] = useRecoilState(OREDER_PRODUCT_ARRAY);
  
  // --- 🐰 상품 정보 불러오기 ---
  const getDetails = async () => {
    return normalAxios.get('/products/' + parseInt(pid));
    };
  
  const { isSuccess, data : detail, isFetching, refetch: reDetails} = useQuery({
    queryKey: ['detail', pid],
    queryFn: getDetails,
    refetchOnWindowFocus: false,
    });
    
  useEffect( () => {
    if(!isFetching) {
      setTotalPrice(totalPrice + (detail.data.price * quantity));
      setTotalShippinfee(totalShippinfee + detail.data.shipping_fee);
    } else {
      setTotalPrice(0);
      setTotalShippinfee(0);
      }
    }, [isFetching]);

  useEffect(() => {
    if(detail) {
      if(cart_itmem_count === orderProductArr.length) return;
      let obj = detail.data;
      if(!obj.quantity) obj.quantity = parseInt(quantity);
      setOrderProductArr([...orderProductArr, obj]);
      } 
  }, [detail]);

  useEffect(() => {
    setOrderProductArr([]);
  },[])
      
  // ----- 🐰 개별 checkbox 관리------
  const singleCheckHandler = (checked, id) => {
    if(checked) {
      setCeckItems(prev => [...prev, id]);
    } else {
      setCeckItems(checkItems.filter(ele => ele !== id));
    }
  } 
  // --- 🐰 단일 삭제 ---
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
      setLoading(true)
      return normalAxios.delete('/cart/' + parseInt(cart_id));
    },
    onSettled: () => {
      setLoading(false)
    },
    onSuccess : (data) => {
      if(data.status === 204) {
        setCeckItems([]);
        window.location.reload();
      }
    },
    onError : (e) => {console.log(e.message)},
  });
  
  // --- 🐰 count 수정 ----
  const calculateCount = (e) => {
    if(e.target.id === 'plus_btn') {
      if(count === detail.data.stock) return;
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
  useEffect(() => {
    if(count != quantity) {
      editCountMutate.mutate(editCountData);
  }
 }, [count]);
 
  const editCountMutate = useMutation({
    mutationFn: (editCountData) => {
      return normalAxios.put(`/cart/${parseInt(iid)}/`, editCountData);
    },
    onSuccess : (data) => {
      if(data.status === 200) {
        refetch();
        // setCount(data.data.quantity);
      }
    },
    onError : (e) => {console.log(e.message)},
  });  

  // --- 🐰 주문하기 ---
  const handleOrderData = () => {
    const obj ={
      product_name: detail.data.product_name,
      store_name: detail.data.store_name,
      image: detail.data.image,
      product_id: parseInt(pid),
      quantity: parseInt(count),
      order_kind: "cart_one_order",
      shipping_fee: detail.data.shipping_fee,
      price: (parseInt(count) * detail.data.price),
      total_price: (parseInt(count) * detail.data.price) + detail.data.shipping_fee,
    }
    setOrderData(obj);
    setOrderProductArr([obj])
    navigate('/payment');
  }
  return (
    <>
    {loading && <Spinner/>}
    {isFetching && 
      <>
        <Div1>
          <CartCheckbox id={iid} checkItems={checkItems} singleCheckHandler={singleCheckHandler}/>
        </Div1>
        <Div2>
          <NoImg></NoImg> 
          <div>
            <NoTxt></NoTxt>
            <NoTxt></NoTxt>
            <NoTxt></NoTxt>
            <NoTxt></NoTxt>
          </div> 
        </Div2>
      </>
    }
    {isSuccess && 
      <>
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
            <CountMinus type="button" $minus="true" id="minus_btn" onClick={e=>calculateCount(e)}>-</CountMinus>
            <CountNumber type="button">{count}</CountNumber>
            <CountPlus type="button" $plus="true" id="plus_btn" onClick={e=>calculateCount(e)}>+</CountPlus>
          </CountBox>
          <StockP>남은 개수: <span>{detail.data.stock}</span></StockP>
          {/* <EditBtn type="button" onClick={() => editCountMutate.mutate(editCountData)}>옵션 수정 확정</EditBtn> */}
        </Div3>
        <Div4>
          <TotalPriceP><span >{(detail.data.price * count).toLocaleString()}</span>원</TotalPriceP>
          <S_btn btnFn={handleOrderData}>주문하기</S_btn>
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
const StockP = styled.p`
  font-size: 13px;
  color: ${({theme}) => theme.gray3};
  text-align: center;
  margin: 8px 0 10px;

  @media only screen and (max-width: 860px) {
    text-align: left;

  }
`
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

const NoImg = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 8px;
  background:  ${({theme}) => theme.gray2};
`
const NoTxt = styled.div`
  width: 200px;
  height: 20px;
  background:  ${({theme}) => theme.gray2};
  margin-bottom: 4px;
`