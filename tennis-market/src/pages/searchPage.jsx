import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { normalAxios } from '../axios';
import MainLayout from '../components/layout/MainLayout';
import styled from 'styled-components';
import card1 from '../assets/images/card1.png';
import card2 from '../assets/images/card2.png';
import card3 from '../assets/images/card3.png';

export default function SearchPage() {
  const {keyword} = useParams();
  const navigate = useNavigate();
  const getSearchResult = async () => {
    return normalAxios.get('/products/?search=' + keyword);
  };

  const { isSuccess: searchComplete, data: searchResult} = useQuery({
    queryKey: ['search', keyword],
    queryFn: getSearchResult,
    refetchOnWindowFocus: false,
    retryOnMount: false,
  });


  return (
    <MainLayout>
      <WrapCont>
        <H2><H2Span>"{keyword}"</H2Span> 에 대한 검색 결과</H2>
      {searchComplete && searchResult?.data?.results.length > 0 && 
        <ProductUl>
          {searchResult?.data?.results.map((ele) => {
            return (
              <ProdcutLi key={ele.product_id} onClick={() => navigate(`/product/${ele.product_id}`)}>
                <ProdcutImg src={ele.image} alt={ele.product_name + "썸네일"} />
                {ele.stock === 0 && <SoldoutDiv>픔절</SoldoutDiv>}
                <ShopP>{ele.store_name}</ShopP>
                <ProductP>{ele.product_name}</ProductP>
                <PriceP><PriceSpan>{ele.price.toLocaleString()}</PriceSpan>원</PriceP>
              </ProdcutLi>
            )
          })}
        </ProductUl>
      }
      {searchComplete && searchResult.data.results.length === 0 &&
        <div>
          <NoContP>검색결과를 찾을 수 없습니다</NoContP>
          <CardUl>
            <CardLi><CardImg src={card1} alt="card1 이미지" /></CardLi>
            <CardLi><CardImg src={card2} alt="card2 이미지" /></CardLi>
            <CardLi><CardImg src={card3} alt="card3 이미지" /></CardLi>
          </CardUl>
        </div>
      }
      </WrapCont>
    </MainLayout>
  )
}

const WrapCont = styled.div`
  width: 1320px;
  max-width: 100%;
  padding: 0 20px;
  margin: 180px auto 160px;
  box-sizing: border-box;
  
`
const H2 = styled.h2`
  font-size: 20px;
  font-weight: 400;
`
const H2Span = styled.span`
  font-weight: 600;
  padding: 0 6px;
  border-radius: 4px;
  color: ${({theme}) => theme.gray4};
  background: ${({theme}) => theme.gray2};
`

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
const NoContP = styled.p`
  padding: 140px 0 80px;
  text-align: center;
  font-size: 18px;
  color: ${({theme}) => theme.gray4};
`
const CardUl = styled.ul`
  display: flex;
  gap: 20px;
  @media only screen and (max-width: 650px) {
    flex-direction: column;
  }
`
const CardLi = styled.li`
  width: calc(100% / 3);
  @media only screen and (max-width: 650px) {
    width: 100%;
  }
`
const CardImg = styled.img`
  width: 100%;
`
