import styled from "styled-components"
import MainLayout from "../components/layout/MainLayout"
import MainSwiper from "../components/swiper"
import { normalAxios } from "../axios"
import { useMutation, useQueries, useQuery } from "@tanstack/react-query"
import { useRecoilValue } from "recoil"
import { user_info } from "../atom/Atom"
import { useNavigate } from "react-router-dom"


const ProductUl = styled.ul`
  max-width: 1280px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(3, 380px);
  gap: 70px;
  margin: 60px auto 120px;
  justify-content: center;

  @media only screen and (max-width: 1280px) {
    grid-template-columns: repeat(2, 380px);
  }
  @media only screen and (max-width: 800px) {
    grid-template-columns: repeat(1, 380px);
  }
  @media only screen and (max-width: 430px) {
    grid-template-columns: repeat(1, 280px);
  }
`
const ProdcutLi = styled.li`
  display: block;
  width: 100%;
  cursor: pointer;
`
const ProdcutImg = styled.img`
  width: 380px;
  height: 380px;
  border-radius: 32px;
  border: 1px solid ${({theme}) => theme.gray1} ;
  box-sizing: border-box;
  margin-bottom: 12px;
  @media only screen and (max-width: 430px) {
    width: 280px;
    height: 280px;
  }
`

const ShopP = styled.p`
  color: ${({theme}) => theme.gray3};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
  @media only screen and (max-width: 430px) {
    font-size: 14px;
  }
`
const ProductP = styled.p`
  color: ${({theme}) => theme.gray4};
  font-size: 18px;
  padding: 6px 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
  @media only screen and (max-width: 430px) {
    font-size: 16px;
  }
  `
const PriceP = styled.p`
  color: ${({theme}) => theme.b};
  font-size: 14px;
  font-weight: 600;
  `
const PriceSpan = styled.span`
  color: ${({theme}) => theme.b};
  font-size: 24px;
  @media only screen and (max-width: 430px) {
    font-size: 20px;
  }
`
const Loading = styled.p`
  padding: 80px 0 160px;
  text-align: center;
  font-size: 24px;

`

function MainPage() {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(user_info);
  const getBuyerProducts = async () => {
   return normalAxios.get('/products/');
  };

  const { isPending, isError, data, error, isSuccess} = useQuery({
    queryKey: ['buyer_products'],
    queryFn: getBuyerProducts,
    // queryFn: userInfo.user_type === 'SELLER' ? getSellerProducts : getBuyerProducts, 
  })

  return (
    <MainLayout>
      {/* 슬라이더 */}
      <MainSwiper />

      {/* 상품 리스트 */}
      <section>
        <h2 className="screen_out">상품 리스트 영역</h2>
        {isPending && <Loading>🎾 상품 준비 중</Loading>}
        {isError && <Loading>ERROR</Loading>}
        {isSuccess && 
          <ProductUl>
            {data.data.results.map((ele, idx) => {
              return(
                <ProdcutLi key={ele.product_id} onClick={() => navigate(`product/${ele.product_id}`)}>
                  <ProdcutImg src={ele.image} alt={ele.product_name + "썸네일"} />
                  <ShopP>{ele.store_name}</ShopP>
                  <ProductP>{ele.product_name}</ProductP>
                  <PriceP><PriceSpan>{ele.price.toLocaleString()}</PriceSpan>원</PriceP>
                </ProdcutLi>
              )
            })}
          </ProductUl>
        }

      </section>
    </MainLayout>
  )
}


export default MainPage