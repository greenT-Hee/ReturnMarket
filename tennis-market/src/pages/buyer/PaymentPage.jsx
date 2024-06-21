import styled from "styled-components"
import MainLayout from "../../components/layout/MainLayout"
import { PaymentAddressInput, PaymentInput, PaymentRadio } from "../../components/inputs"
import { useEffect, useState } from "react";
import { normalAxios } from "../../axios";
import { useMutation } from "@tanstack/react-query";
import Spinner from "../../components/spinner";
import { L_btn, L_btn_disable } from "../../components/buttons";
import PaymentProducts from "../../components/payment/PaymentProducts";
import { AlertOpen, OREDER_DATA } from "../../atom/Atom";
import { useRecoilState } from "recoil";
import { AlertModal } from "../../components/modal/AlertModal";
import { useNavigate } from "react-router-dom";

export default function PaymentPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); 
  const [isAgreePay, setIsAgreepay] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [openAlert, setOpenAlert] = useRecoilState(AlertOpen);
  const [orderData, setOrderData] = useRecoilState(OREDER_DATA);
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
  }

  const orderParam = {
    "product_id": orderData.product_id ? orderData.product_id : null,
    "quantity" : orderData.quantity ? orderData.quantity : null,
    "order_kind" : orderData.order_kind,
    "total_price": orderData.total_price, 

    "receiver": receiver,
    "receiver_phone_number": receiver_phone_number,
    "address": address1 + " " + address2,
    "address_message": address_message,
    "payment_method": payMethod, 
  }
  
  const orderMutate = useMutation({
    mutationFn: (data) => {
      for (const [key, value] of Object.entries(infoInputs)) {
        if(!value) {
          setAlertMsg("필수값을 모두 입력해주세요.")
          setOpenAlert(true);
          return;
        } 
      }
      setIsLoading(true);
      return normalAxios.post('/order/',data)
    },
    onSettled: () => {
      setIsLoading(false);
    },
    onSuccess : (data) => {
      if(data.status === 290) {
        navigate("/order");
      } 
    },
    onError : (e) => {console.log(e.message)},
  });
  return (
    <MainLayout>
      <Main>
        <AlertModal content={alertMsg}/>
        {isLoading && <Spinner />}
        <section>
          <H1>주문/결제하기</H1>
          <TopUl>
            <Li $first='true'>상품정보</Li>
            <Li $scd='true'>할인 </Li>
            <Li $thd='true'>배송비</Li>  
            <Li $fth='true'>주문금액</Li>
          </TopUl>
          <PaymentProducts />
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
                <p><PriceSpan>{orderData.price.toLocaleString()}</PriceSpan>원</p>
              </FlexDiv>
              <FlexDiv>
                <p>- 할인금액</p>
                <p><PriceSpan>0</PriceSpan>원</p>
              </FlexDiv>
              <FlexDiv>
                <p>- 배송비</p>
                <p><PriceSpan>{orderData.shipping_fee.toLocaleString()}</PriceSpan>원</p>
              </FlexDiv>
              <ToTalPriceDiv>
                <FlexDiv>
                  <p>- 결제금액</p>
                  <p><TotalPriceSpan>{orderData.total_price.toLocaleString()}</TotalPriceSpan>원</p>
                </FlexDiv>
              </ToTalPriceDiv>
            </TopArea>
            <BottomArea>
              <CheckboxInput type="checkbox" name="agreeCheck" id="agreeCheck" checked={isAgreePay} onChange={()=> setIsAgreepay(isAgreePay ? false : true)}/>
              <label htmlFor="agreeCheck">주문 내용을 확인했으며, 정보 제공 등에 동의합니다.</label>
              <WrapLastBtn>
                {isAgreePay ? <L_btn btnFn={() => orderMutate.mutate(orderParam)}>결제하기</L_btn> : <L_btn_disable>결제하기</L_btn_disable>}
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
