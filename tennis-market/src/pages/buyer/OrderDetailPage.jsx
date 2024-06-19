import { useParams } from "react-router-dom";
import styled from "styled-components";
import { normalAxios } from "../../axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import MainLayout from "../../components/layout/MainLayout";
import banner1 from '../../assets/images/banner1.png';
import banner2 from '../../assets/images/banner2.png';
import banner3 from '../../assets/images/banner3.jpg';
import OrderDetail from "../../components/order/OrderDetail";
export default function OrderDetailPage() {
  const {order_num} = useParams();
  const [detail, setDetail] = useState('');
  // ---🐰 주문 목록 ---
  const getOrderList = async () => {
    return normalAxios.get('/order/');
  };    
  const { data, isSuccess } = useQuery({
    queryKey: ['order_list'],
    queryFn: getOrderList,
  });
  
  useEffect(() => {
    if(isSuccess) {
      let obj = data?.data?.results.find(x => parseInt(x.order_number) === parseInt(order_num));
      setDetail(obj);
      }
      console.log(detail)
    }, [isSuccess]);
  
  return (
    <MainLayout>
      {detail &&
        <>
        <SectionTop>
          <TopH1>주문 상세</TopH1>
          <OrderDateP>{detail.created_at.split("T")[0]} 주문</OrderDateP>
          <OrderNumberP>주문번호: {detail.order_number}</OrderNumberP>
        </SectionTop>
        <MainSection>
          <WrapBanner>
            <BannerImg src={banner1} alt="banner1" />
            <BannerImg src={banner2} alt="banner2" />
            <BannerImgMobile src={banner3} alt="banner3" />
          </WrapBanner>
          <WrapCards>
            {detail.order_items.map((pid, item_idx) => {
              return  (
                <OrderDetail 
                pid={pid} 
                unique_key={pid.toString() + detail.order_number.toString()} 
                quantity={detail.order_quantity[item_idx]} 
                /> 
              )   
            })}
            <InfoArticle>
              <InfoH2>받는 사람 정보</InfoH2>
              <DetailInfo>
                <div>
                  <InfoTitleSpan>받는 사람</InfoTitleSpan>
                  <InfoDescSpan>{detail.receiver}</InfoDescSpan>
                </div>
                <div>
                  <InfoTitleSpan>연락처</InfoTitleSpan>
                  <InfoDescSpan>{detail.receiver_phone_number}</InfoDescSpan>
                </div>
                <div>
                  <InfoTitleSpan>받는 주소</InfoTitleSpan>
                  <InfoDescSpan>{detail.address}</InfoDescSpan>
                </div>
                <div>
                  <InfoTitleSpan>배송요청사항</InfoTitleSpan>
                  <InfoDescSpan>{detail.address_message}</InfoDescSpan>
                </div>
              </DetailInfo>
            </InfoArticle>
            <InfoArticle>
              <InfoH2>결제 정보</InfoH2>
              <DetailInfo>
                <div>
                  <InfoTitleSpan>결제 방법</InfoTitleSpan>
                  <InfoDescSpan>{detail.payment_method} / 일시불</InfoDescSpan>
                </div>
                <div>
                  <InfoTitleSpan>연락처</InfoTitleSpan>
                  <InfoDescSpan>김태희</InfoDescSpan>
                </div>
                <div>
                  <InfoTitleSpan>총 금액</InfoTitleSpan>
                  <InfoDescSpan $red="true">{detail.total_price.toLocaleString()}원</InfoDescSpan>
                </div>
              </DetailInfo>
            </InfoArticle>
          </WrapCards>
        </MainSection>
        </>
      }
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
  padding: 0 0 20px;
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
const WrapCards = styled.div`
  flex: 1;
`
const OrderDateP = styled.p`
  font-size: 24px;
  font-weight: 600;
  color:  ${({theme}) => theme.sub};

`
const OrderNumberP = styled.p`
  font-size: 16px;
  padding: 8px 0 0;
  font-size: 16px;
  color: ${({theme}) => theme.gray3};
`
const InfoSection = styled.section`
  width: 1320px;
  max-width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  margin-top: 60px auto;
`

const InfoArticle = styled.article`
  margin: 40px 0;
`
const InfoH2 = styled.h2`
  font-size: 20px;
  font-weight: 500;
  padding: 12px 0;
  border-bottom: 2px solid ${({theme}) => theme.gray4};
`
const DetailInfo = styled.div`
  padding: 20px 0;
`
const InfoTitleSpan = styled.span`
  display: inline-block;
  font-weight: 400;
  color: ${({theme}) => theme.gray3};
  width: 200px;
  line-height: 2;
  `
const InfoDescSpan = styled.span`
  display: inline-block;
  font-weight: ${(props) => props.$red ? "700" : "500"};
  font-size: ${(props) => props.$red ? "28px" : "16px"};
  line-height: 2;
  color: ${(props) => props.$red ? props.theme.red : props.theme.b};
`