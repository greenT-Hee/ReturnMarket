import styled from "styled-components"
import MainLayout from "../components/layout/MainLayout"
import MainSwiper from "../components/swiper"
import { normalAxios } from "../axios"
import { useMutation, useQueries, useQuery } from "@tanstack/react-query"
import { useRecoilValue } from "recoil"
import { user_info } from "../atom/Atom"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"
import loadingGif from "../assets/images/catLoad.gif"
const ProductUl = styled.ul`
  max-width: 1280px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(3, 380px);
  gap: 70px;
  margin: 60px auto 180px;
  justify-content: center;
  position: relative;
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
const SoldoutDiv = styled.div`
  font-size: 14px;
  width: fit-content;
  padding: 5px 7px 3px;
  border-radius: 4px;
  color : ${({theme}) => theme.w};
  background : ${({theme}) => theme.red};
  margin:  0 0 4px;
`
const ProdcutImg = styled.img`
  width: 380px;
  height: 380px;
  border-radius: 32px;
  border: 1px solid ${({theme}) => theme.gray1};
  box-sizing: border-box;
  margin-bottom: 14px;
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
const Loading = styled.div`
  padding: 80px 0 160px;
  text-align: center;
`
const MoreGetBtn = styled.button`
  display: block;
  border: 0;
  background: ${({theme}) => theme.w};
  color: ${({theme}) => theme.gray3};
  border: 2px solid ${({theme}) => theme.gray3};
  border-radius: 32px;
  position: absolute;
  bottom: -120px;
  left: 50%;
  right: 50%;
  transform: translateX(-50%);
  min-width: 120px;
  font-size: 14px;
  padding: 8px 0;
  cursor: pointer;

  &:hover {
    background: ${({theme}) => theme.main};
    color: ${({theme}) => theme.w};
    border: 2px solid ${({theme}) => theme.main};
  }
`
function MainPage() {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(user_info);
  const [page, setPage] = useState(1)
  const [productArr, setProductArr] = useState([])
  const getBuyerProducts = async () => {
   return normalAxios.get('/products/?page=' + page);
  };
  
  const { isPending, isError, data, isSuccess} = useQuery({
    queryKey: ['buyer_products', page],
    queryFn: getBuyerProducts,
    refetchOnWindowFocus: false,
    // retryOnMount: false,
    // refetchOnMount: false
    })
    
  useEffect(() => {
    if(data) {
      if((page * 15) === productArr.length) return;
      if(page === 1) {
        setProductArr(data.data.results);
        } else {
        setProductArr([...productArr, ...data.data.results]);
      }
    }
  }, [data,page])

  return (
    <MainLayout>
      {/* 슬라이더 */}
      <MainSwiper />
      {/* 상품 리스트 */}
      <section>
        <h2 className="screen_out">상품 리스트 영역</h2>
        {isPending && <Loading><img src={loadingGif} alt="로딩" /></Loading>}
        {isError && <Loading>ERROR</Loading>}
        {productArr.length > 0 && 
          <ProductUl>
            {productArr?.map((ele, idx) => {
              return(
                <ProdcutLi key={ele.product_id + page} onClick={() => navigate(`product/${ele.product_id}`)}>
                  <ProdcutImg src={ele.image} alt={ele.product_name + "썸네일"} />
                  {ele.stock === 0 && <SoldoutDiv>픔절</SoldoutDiv>}
                  <ShopP>{ele.store_name}</ShopP>
                  <ProductP>{ele.product_name}</ProductP>
                  <PriceP><PriceSpan>{ele.price.toLocaleString()}</PriceSpan>원</PriceP>
                </ProdcutLi>
              )
            })}
            <MoreGetBtn type="button" onClick={()=> setPage(page + 1)}>더 보기</MoreGetBtn>
          </ProductUl>
        }
      </section>
    </MainLayout>
  )
}


export default MainPage