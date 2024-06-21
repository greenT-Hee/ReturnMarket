import styled from 'styled-components';
import { MS_btn, MS_btn_disable, MS_btn_white } from '../buttons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { normalAxios } from '../../axios';
import { useNavigate } from 'react-router-dom';
import { ConfirmOpen, user_info } from '../../atom/Atom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useState } from 'react';

export default function OrderList({pid, unique_key, quantity,cart,setIsInCart, setConfirmMsg }) {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(user_info);
  const [openConfrim, setOpenConfirm] = useRecoilState(ConfirmOpen);
  const getDetail = async () => {
    return normalAxios.get('/products/' + pid);
  };
  const { data , isPending } = useQuery({
    queryKey: ['getDetail', pid],
    queryFn: getDetail,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const addCart = () => {
    if(cart?.data?.results.length > 0) {
      cart.data.results.map((ele) => {
        if(ele.product_id === parseInt(pid)) {
          setIsInCart(false);
          setOpenConfirm(true);
          setConfirmMsg('이미 동일한 상품이 존재합니다.\n장바구니로 이동할까요?');
        } else {
          setIsInCart(true);
          setOpenConfirm(true);
          setConfirmMsg('장바구니에 담으시겠습니까?');
        }
      })
    }
  }

  return (
    <WrapContBox key={unique_key}>
      {isPending && 
        <>
        <ContBox>
          <OrderStatusP>결제완료</OrderStatusP>
          <FlexItemInfo>
            <NoImg></NoImg>
            <div>
              <NoTxt></NoTxt>
              <NoTxt></NoTxt>
              <NoTxt></NoTxt>
            </div>
          </FlexItemInfo>
        </ContBox>
      </>
      }
      {data &&
        <>
          <ContBox>
            <OrderStatusP>결제완료</OrderStatusP>
            <FlexItemInfo>
              <ProdcutImg src={data.data.image} alt={data.data.product_name + "사진"} />
              <div>
                <NoramlP $strong='true'>{data.data.product_name}</NoramlP>
                <NoramlP>{data.data.price.toLocaleString()}원 • {quantity}개</NoramlP>
                <NoramlP $small='true'>배송비: {data.data.shipping_fee.toLocaleString()}원</NoramlP>
              </div>
            </FlexItemInfo>
          </ContBox>
          <ButtonBox>
            <MS_btn btnFn={() => navigate('/product/' + pid)}>상품 상세보기</MS_btn>
            {data.data.stock === 0 ?
              <MS_btn_disable>품절</MS_btn_disable>  :
              <MS_btn_white btnFn={addCart}>장바구니 담기</MS_btn_white>
            }
          </ButtonBox>
        </>
      }
    </WrapContBox>
  )
}

const WrapContBox = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 8px;
  height: fit-content;
  border: 1px solid ${({theme}) => theme.gray2};
  margin-bottom: 10px;
  @media only screen and (max-width: 760px) {
   flex-direction: column;
  }
`

const ContBox = styled.div`
  width: 100%;
  padding: 20px;
  border-right: 1px solid ${({theme}) => theme.gray2};
  @media only screen and (max-width: 760px) {
    width: unset;
    border-right: unset;
  }
  `
const OrderStatusP = styled.p`
  font-size: 20px;
  font-weight: 600;
  padding-bottom: 14px;
`

const NoramlP = styled.p`
  font-size: ${(props) => props.$small ? "14px": "16px"};
  line-height: 1.6;
  font-weight: ${(props) => props.$strong ? "600": "400"};
  color: ${(props) => props.$strong ? props.theme.b: props.theme.gray3};

`
const ProdcutImg = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 8px;
  border: 1px solid ${({theme}) => theme.gray1};
`
const ButtonBox = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  padding: 20px 40px;
  @media only screen and (max-width: 760px) {
    width: unset;
    padding: 20px;
    flex-direction: row;
    justify-content: flex-start;
  }
  @media only screen and (max-width: 500px) {
    flex-direction: column;
    align-items: center;
  }
`
const FlexItemInfo = styled.div`
  display: flex;
  gap: 30px;
  justify-content: flex-start;
  margin-top: 20px;
  @media only screen and (max-width: 500px) {
    flex-direction: column;
    align-items: center;
  }
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