import styled from "styled-components"
import { OREDER_DATA } from "../../atom/Atom";
import { useRecoilState } from "recoil";

export default function PaymentProducts() {
  const [orderData, setOrderData] = useRecoilState(OREDER_DATA);
  // // --- 🐰 상품 정보 불러오기 ---
  // const getDetails = async () => {
  //   return normalAxios.get('/products/' + parseInt(pid));
  // };

  // const { isSuccess, data : detail, isFetching, refetch: reDetails} = useQuery({
  //   queryKey: ['detail', pid],
  //   queryFn: getDetails,
  //   refetchOnWindowFocus: false,
  // });
  return (
    <>
      <Article>
        <Div1>
          <PImage src={orderData.image} alt={"ele.product_name "+ "썸네일"} /> 
          <div>
            <GrayP>{orderData.store_name}</GrayP>
            <ProductNameP>{orderData.product_name}</ProductNameP>
            <GrayP>수량: <span>{orderData.quantity.toLocaleString()}</span>개</GrayP>
          </div>  
        </Div1>
        <Div2> - </Div2>
        <Div3> {orderData.shipping_fee === 0? "무료배송" : orderData.shipping_fee.toLocaleString() + "원"} </Div3>
        <Div4>
          <PriceP><span>{orderData.price.toLocaleString()}</span>원</PriceP>
        </Div4>
      </Article>

      <TotalP>총 주문금액 <TotalPriceSpan>{(orderData.total_price).toLocaleString()}</TotalPriceSpan></TotalP>
    </>
  )
}


const Article = styled.article`
  position: relative;
  display: flex;
  align-items: center;
  padding: 18px;
  box-sizing: border-box;
  border-bottom: 1px solid ${({theme}) => theme.gray2};

  @media only screen and (max-width: 860px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 30px;
  }
`

// --- DIV 구역 ----
const Div1 = styled.div`
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
const Div2 = styled.div`
  text-align: center;
  width: 10%;
`
const Div3 = styled.div`
  width: 20%;
  text-align: center;
  @media only screen and (max-width: 860px) {
    text-align: left;
    width: 100%;
  }

`
const Div4 = styled.div`
  width: 20%;
  text-align: center;
  @media only screen and (max-width: 860px) {
    width: 100%;
    text-align: left;
  }
`

// -- div1 상품정보 --
const PImage = styled.img`
  width: 104px;
  height: 104px;
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

// -- div4 가격 --
const PriceP = styled.p`
  font-weight: 700;
  font-size: 18px;
`
const PriceSpan = styled.span`
  font-weight: 700;
  font-size: 18px;
`

// --- 총 주문금액 --- 
const TotalP = styled.p`
  color: ${({theme}) => theme.gray4};
  font-weight: 700;
  text-align: right;
  font-size: 18px;
  margin-top: 30px;
  `
const TotalPriceSpan = styled.span`
  font-weight: 700;
  font-size: 24px;
  color: ${({theme}) => theme.red};
`
