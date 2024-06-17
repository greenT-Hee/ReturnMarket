import styled from "styled-components"
import MainLayout from "../../components/layout/MainLayout"
import image from "../../assets/images/rabbit.png"
import { PaymentAddressInput, PaymentInput, PaymentRadio } from "../../components/inputs"
import { useState } from "react";
import { normalAxios } from "../../axios";
import { useMutation } from "@tanstack/react-query";
import Spinner from "../../components/spinner";
import { L_btn, L_btn_disable, M_btn } from "../../components/buttons";


export default function PaymentPage() {
  const [isLoading, setIsLoading] = useState(false); 
  const [payMethod, setPayMethod] = useState("CARD");
  const [infoInputs, setInfoInputs] = useState({
    "name": "",
    "email": "",
    "phone" : "",
    "receiver" : "",
    "receiver_phone_number" : "",
    "address1" : "",
    "address2" : "",
    "address_message" : "",
  });
  const {phone,name, email,receiver, receiver_phone_number,address1, address2, address_message} = infoInputs;

  function handleInputValue(e) {
    const { value, name } = e.target;
    let result = e.target.value.replace(/[^0-9]/g, "");
    if(e.target.name === 'phone') {
      setInfoInputs({...infoInputs, 'phone': result});
      } else if(e.target.name === 'receiver_phone_number') {
      setInfoInputs({...infoInputs, 'receiver_phone_number': result});
    } else {
      setInfoInputs({
        ...infoInputs,
        [name]: value,
      });
    }
    console.log(infoInputs, "🐰")
  }

  const orderData = {
    "product_id": "",
    "quantity" : "Int",
    "order_kind" : "String", // 바로주문하기일 경우에는 direct_order여야 합니다.

    "receiver": receiver,
    "receiver_phone_number": receiver_phone_number,
    "address": address1 + " " + address2,
    "address_message": address_message,
    "payment_method": payMethod, //CARD, DEPOSIT, PHONE_PAYMENT, NAVERPAY, KAKAOPAY 중 하나 선택
    "total_price": "Int" // 총 금액(total_price)은 자동계산되나, 유효성검사를 위해 받아와야 합니다.
  }
  
  const uploadApi = useMutation({
    mutationFn: () => {
      // setIsLoading(true);
      return normalAxios.post('/order/',orderData)
    },
    onSettled: () => {
      setIsLoading(false);
    },
    onSuccess : (data) => {
      if(data.status === 201) {
      
      } else if(data.status === 400) {

      } else if(data.status === 401) {
      
      }
    },
    onError : (e) => {console.log(e.message)},
  })

  return (
    <MainLayout>
      <Main>
        {isLoading && <Spinner />}
        <section>
          <H1>주문/결제하기</H1>
          <TopUl>
            <Li $first='true'>상품정보</Li>
            <Li $scd='true'>할인 </Li>
            <Li $thd='true'>배송비</Li>  
            <Li $fth='true'>주문금액</Li>
          </TopUl>
          <Article>
            <Div1>
              <PImage src={image} alt={"ele.product_name "+ "썸네일"} /> 
              <div>
                <GrayP>백엔드글로벌</GrayP>
                <ProductNameP>딥러닝 개발자 무릎 담요</ProductNameP>
                <GrayP>수량: <span>1</span>개</GrayP>
              </div>  
            </Div1>
            <Div2> - </Div2>
            <Div3> 무료배송 </Div3>
            <Div4>
              <PriceP><span>46,000</span>원</PriceP>
            </Div4>
          </Article>
          <TotalP>총 주문금액 <TotalPriceSpan>46,500</TotalPriceSpan></TotalP>
        </section>
        <section>
          <H2 $line="true">배송정보</H2>
          <article>
            <H3>주문자 정보</H3>
            <PaymentInput type={"text"} label={"이름"} id={"name"} value={name? name : ""} setValue={handleInputValue} maxlength={20}/>
            <PaymentInput type={"text"} label={"휴대폰"} id={"phone"} value={phone ? phone : ""} setValue={handleInputValue} maxlength={11}/>
            <PaymentInput type={"text"} label={"이메일"} id={"email"} value={email?email:""} setValue={handleInputValue} maxlength={50}/>
          </article>
          <article>
            <H3>배송지 정보</H3>
            <PaymentInput type={"text"} label={"수령인"} id={"receiver"} value={receiver?receiver:""} setValue={handleInputValue} maxlength={20}/>
            <PaymentInput type={"text"} label={"휴대폰"} id={"receiver_phone_number"} value={receiver_phone_number ? receiver_phone_number : ""} setValue={handleInputValue} maxlength={11}/>
            <PaymentAddressInput type={"text"} label={"배송주소"} id={"address"} setValue={handleInputValue} />
            <PaymentInput type={"text"} label={"배송메시지"} id={"address_message"}value={address_message?address_message:""}  setValue={handleInputValue} maxlength={100}/>
          </article>
        </section>
        <section>
          <H2>결제수단</H2>
          <article>
            <WrapRadioDiv>
              <PaymentRadio label={"신용/체크카드"} value="CARD" payMethod={payMethod} setPayMethod={setPayMethod}/>
              <PaymentRadio label={"무통장 입금"} value="DEPOSIT" payMethod={payMethod} setPayMethod={setPayMethod}/>
              <PaymentRadio label={"휴대푠 결제"} value="PHONE_PAYMENT" payMethod={payMethod} setPayMethod={setPayMethod}/>
              <PaymentRadio label={"네이버페이"} value="NAVERPAY" payMethod={payMethod} setPayMethod={setPayMethod}/>
              <PaymentRadio label={"카카오페이"} value="KAKAOPAY" payMethod={payMethod} setPayMethod={setPayMethod}/>
            </WrapRadioDiv>
          </article>
        </section> 

        <section>
          <H2>최종결제 정보</H2>
          <TotalInfoArticle>
            <TopArea>
              <FlexDiv>
                <p>- 상품금액</p>
                <p><span>465000</span>원</p>
              </FlexDiv>
              <FlexDiv>
                <p>- 할인금액</p>
                <p><span>0</span>원</p>
              </FlexDiv>
              <FlexDiv>
                <p>- 배송비</p>
                <p><span>0</span>원</p>
              </FlexDiv>
              <ToTalPriceDiv>
                <FlexDiv>
                  <p>- 결제금액</p>
                  <p><span>465000</span>원</p>
                </FlexDiv>
              </ToTalPriceDiv>
            </TopArea>
            <BottomArea>
              <CheckboxInput type="checkbox" name="agreeCheck" id="agreeCheck"/>
              <label htmlFor="agreeCheck">주문 내용을 확인했으며, 정보 제공 등에 동의합니다.</label>
              <WrapLastBtn>
                {/* <L_btn>결제하기</L_btn> */}
                <L_btn_disable>결제하기</L_btn_disable>
              </WrapLastBtn>
            </BottomArea>
          </TotalInfoArticle>
        </section>
      </Main>
    </MainLayout>
  )
}
const TotalInfoArticle = styled.article`
  border: 1px solid  ${({theme}) => theme.sub};
  border-radius: 8px;
  margin-top: 18px;
  max-width: 480px;
  box-sizing: border-box;
`
const TopArea = styled.div`
  padding: 32px 32px 0;
`
const ToTalPriceDiv = styled.div`
  margin-top: 18px;
  padding: 25px 0;
  border-top: 1px solid  ${({theme}) => theme.gray2};
`
const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  `
const BottomArea = styled.div`
  padding: 32px;
  background: ${({theme}) => theme.gray1};
  border-radius: 0 0 8px 8px;
`
const WrapLastBtn = styled.div`
  display: flex;
  justify-content: center;
  margin : 30px 0 0;
`
const Main = styled.main`
  padding: 97px 20px 180px;
  width: 1300px;
  max-width: 100%;
  box-sizing: border-box;
  margin: 0 auto;
`
const H1 = styled.h1`
  font-size: 36px;
  font-weight: 700;
  text-align: center;
  padding: 80px 0 50px;
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
  width: ${(props) => props.$first ? '50%' : ''};
  width: ${(props) => props.$scd ? '10%' : ''};
  width: ${(props) => props.$thd ? '20%' : ''};
  width: ${(props) => props.$fth ? '20%' : ''};
`
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

// --- 총 주문금액 --- 
const TotalP = styled.p`
  color: ${({theme}) => theme.gray4};
  font-weight: 700;
  text-align: right;
  font-size: 18px;
  margin-top: 30px;
  `
const TotalPriceSpan = styled.span`
  font-size: 24px;
  color: ${({theme}) => theme.red};
`


// --- 배송정보 ---
const H2 = styled.h2`
  font-size: 24px;
  font-weight: 500;
  border-bottom: ${(props) => props.$line ? `2px solid ${props.theme.gray3}` : 'unset'};
  padding: 0 0 20px;
  margin: 96px 0 0;
`
const H3 = styled.h3`
  font-size: 18px;
  font-weight: 500;
  border-bottom: 2px solid ${({theme}) => theme.gray3};
  padding: 40px 0 10px;
`

const WrapRadioDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 18px 0;
  border-top: 2px solid ${({theme}) => theme.gray3};
  border-bottom: 2px solid ${({theme}) => theme.gray3};
`

const CheckboxInput = styled.input`
  width: 18px;
  height: 16px;
  accent-color: ${({theme}) => theme.main};
`
