import MainLayout from "../../components/layout/MainLayout";
import styled from "styled-components";
import img from "../../assets/images/rabbit.png";
import { L_btn, S_btn } from "../../components/buttons";
import deleteIcon from "../../assets/images/icon-delete.svg";
import plusIcon from "../../assets/images/icon-plus-line.svg";
import minusicon from "../../assets/images/icon-minus-line.svg";
import { CartCheckbox } from "../../components/inputs";
const Main = styled.main`
  padding: 107px 20px 180px;
  width: 1300px;
  box-sizing: border-box;
  margin: 0 auto;
`
const H1 = styled.h1`
  font-size: 36px;
  font-weight: 700;
  text-align: center;
  padding: 54px 0;
`
const TopUl = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px;
  background: ${({theme}) => theme.gray1};
  border-radius: 8px;
  margin-bottom: 35px;
`
const Li = styled.li`
  text-align: center;
  font-size: 18px;
  box-sizing: border-box;
  width: ${(props) => props.$first ? '10%' : ''};
  width: ${(props) => props.$scd ? '50%' : ''};
  width: ${(props) => props.$thd ? '20%' : ''};
  width: ${(props) => props.$fth ? '20%' : ''};
`

const Article = styled.article`
  position: relative;
  display: flex;
  align-items: center;
  margin: 20px 0;
  padding: 18px;
  box-sizing: border-box;
  border-radius: 10px;
  border: 1px solid ${({theme}) => theme.gray1};
`


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


// --- 최종 하단 ---
const TotalLineUl = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background: ${({theme}) => theme.gray1};
  padding:  45px 0;
  margin: 80px 0 40px;
  text-align: center;
  border-radius: 10px;
`
const OrderAllBtnDiv = styled.div`
  display: flex;
  justify-content: center;
`

const ListTitle = styled.p`
  padding-top: 10px;
  color: ${(props) => props.$red ? props.theme.red : props.theme.b };
`
const BoldSpan = styled.span`
  font-size: ${(props) => props.$small ? '24px' : '20px'};
  font-size: ${(props) => props.$big ? '36px' : '20px'};
  font-weight: 700;
`


export default function CartPage() {
  return (
    <MainLayout>
      <Main>
        <H1>장바구니</H1>
        <section>
          <h2 className="screen_out">장바구니 목록 영역</h2>
          <TopUl>
            <Li $first='true'><CartCheckbox /></Li>
            <Li $scd='true'>상품정보</Li>
            <Li $thd='true'>수량</Li>
            <Li $fth='true'>상품금액</Li>
          </TopUl>

          <Article>
            <DeleteBtn type="button" id="delete_btn">
              <img src={deleteIcon} alt="장바구니에서 삭제 버튼" />
            </DeleteBtn>
            <Div1>
              <CartCheckbox />
            </Div1>
            <Div2>
              <PImage src={img} alt="" />
              <div>
                <GrayP>백엔드글로벌</GrayP>
                <ProductNameP>딥러닝 개발자 무릎 담요</ProductNameP>
                <PriceP><span>17,500</span>원</PriceP>
                <GrayP><span>택배배송 / </span><span>무료배송</span></GrayP>
              </div>
            </Div2>
            <Div3>
              <CountBox>
                <CountMinus type="button" $minus="true" id="minus_btn">-</CountMinus>
                <CountNumber type="button">1</CountNumber>
                <CountPlus type="button" $plus="true" id="plus_btn">+</CountPlus>
              </CountBox>
            </Div3>
            <Div4>
              <TotalPriceP><span>17,500</span>원</TotalPriceP>
              <S_btn>주문하기</S_btn>
            </Div4>
          </Article>
        </section>

        <section>
          <h2 className="screen_out">장바구니 총 가격 계산 영역</h2>
          <TotalLineUl>
            <li>
              <p>총 상품금액</p>
              <ListTitle><BoldSpan>46,500</BoldSpan>원</ListTitle>
            </li>
            <li>
              <img src={minusicon} alt="마이너스 아이콘"/>
              </li>
            <li>
              <p>상품 할인</p>
              <ListTitle><BoldSpan>0</BoldSpan>원</ListTitle>
            </li>
            <li>
              <img src={plusIcon} alt="플러스 아이콘"/>
            </li>
            <li>
              <p>배송비</p>
              <ListTitle><BoldSpan>0</BoldSpan>원</ListTitle>
            </li>
            <li>
              <BoldSpan $small='true'>결제 예정 금액</BoldSpan>
              <ListTitle $red='true'><BoldSpan $big='true'>46,500</BoldSpan>원</ListTitle>
            </li>
          </TotalLineUl>

          <OrderAllBtnDiv>
            <L_btn>주문하기</L_btn>
          </OrderAllBtnDiv>
        </section>
        
      </Main>
    </MainLayout>
  )
}
