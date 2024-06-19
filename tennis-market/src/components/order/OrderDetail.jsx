import styled from 'styled-components';
import { ConfirmOpen, user_info } from '../../atom/Atom';
import { useNavigate } from 'react-router-dom';
import { normalAxios } from '../../axios';
import { useQuery } from '@tanstack/react-query';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';

export default function OrderDetail({pid, unique_key, quantity}) {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(user_info);
  const [openConfrim, setOpenConfirm] = useRecoilState(ConfirmOpen);
  const getDetail = async () => {
    return normalAxios.get('/products/' + pid);
  };
  const { data } = useQuery({
    queryKey: ['getDetail', pid],
    queryFn: getDetail,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  return (
    <WrapContBox key={unique_key}>
      {data && 
        <>
         <ContBox>
          <OrderStatusP>결제완료</OrderStatusP>
          <FlexItemInfo>
            <ProdcutImg src={data.data.image} alt={data.data.product_name+ "사진"} />
            <div>
              <NoramlP $strong='true'>{data.data.product_name}</NoramlP>
              <NoramlP>{data.data.price.toLocaleString()}원 • {quantity}개</NoramlP>
              <NoramlP $small='true'>배송비: {data.data.shipping_fee.toLocaleString()}원</NoramlP>
            </div>
          </FlexItemInfo>
          <EachPriceP>
            개별 금액: &nbsp;
            <EachPriceSpan>
              {((data.data.price * quantity) + data.data.shipping_fee).toLocaleString()}
            </EachPriceSpan>
            &nbsp;원
          </EachPriceP>
        </ContBox>
        </>
      }     
    </WrapContBox>
  )
}

const WrapContBox = styled.div`
  display: flex;
  flex: 1;
  height: fit-content;
  justify-content: space-between;
  border-radius: 8px;
  border: 1px solid ${({theme}) => theme.gray2};
  margin-bottom: 10px;
  @media only screen and (max-width: 760px) {
   flex-direction: column;
  }
`
const ContBox = styled.div`
  padding: 20px;
  width: 100%;
  @media only screen and (max-width: 760px) {
    width: unset;
  }
`

const OrderStatusP = styled.p`
font-size: 20px;
font-weight: 600;
padding-bottom: 14px;
`

const FlexItemInfo = styled.div`
display: flex;
gap: 40px;
justify-content: flex-start;
margin-top: 20px;
@media only screen and (max-width: 500px) {
  flex-direction: column;
  align-items: center;
}
`

const EachPriceP = styled.p`
  font-size: 18px;
  font-weight: 500;
  color: ${({theme}) => theme.gray3};
  text-align: right;
  margin-top: 14px;
  @media only screen and (max-width: 500px) {
    font-size: 14px;
    text-align: center;
  }
`
const EachPriceSpan = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: ${({theme}) => theme.sub};
  @media only screen and (max-width: 500px) {
    font-size: 20px;
  }
`

const NoramlP = styled.p`
font-size: ${(props) => props.$small ? "16px": "18px"};
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

