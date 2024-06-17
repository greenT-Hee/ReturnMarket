import styled from "styled-components"
import MainLayout from "../../components/layout/MainLayout"

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

export default function PaymentPage() {
  return (
    <MainLayout>
      <Main>
        <section>
          <H1>주문/결제하기</H1>
        </section>
      </Main>
    </MainLayout>
  )
}
