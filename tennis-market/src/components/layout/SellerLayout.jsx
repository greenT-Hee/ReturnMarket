import styled from "styled-components";
import Footer from "./Footer";
import { TopbarSeller } from "./Topbar";
import plustIcon from "../../assets/images/icon-plus.svg";
import { MS_btn_icon, TabMenu_off_btn, TabMenu_on_btn } from "../../components/buttons";

const TopTitleArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 42px 0;
  box-sizing: border-box;
  margin-top: 107px;
`
const TopH2 = styled.h2`
  font-size: 36px;
  font-weight: 500;
`
const TopH2Span = styled.span`
  color: ${({theme}) => theme.main};
`
const MainStyle = styled.main`
  width: calc(1320px);
  max-width: 100%;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
`
const SidebarLayout = styled.article`
  display: flex;
  gap: 30px;
`

const SidebarUl = styled.ul`
  display: flex;
  flex-direction: column;
`

const RightSideSyle = styled.div`
  border: 1px solid ${({theme}) => theme.gray1};
  background: ${({theme}) => theme.gray1};
  width: 1000px;
  min-height: 500px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 13px;  
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(220, 20, 60); /* 스크롤바 색상 */
    border-radius: 10px; /* 스크롤바 둥근 테두리 */
  }
  ::-webkit-scrollbar-track {
    background: rgba(220, 20, 60, .1);  /*스크롤바 뒷 배경 색상*/
  }

`
export default function SellerLayout({children}) {
  const locationName = location.pathname;
  const renderSidebar = () => {
    if(locationName.includes('seller_center')) {
      return (
        <>
          <TopTitleArea>
            <TopH2>대시보드 <TopH2Span>백엔드글로벌</TopH2Span></TopH2>
            <MS_btn_icon icon={plustIcon}>상품 업로드</MS_btn_icon>
          </TopTitleArea>
          <SidebarLayout>
            <div>
              <SidebarUl>
                <li><TabMenu_on_btn>판매중인 상품</TabMenu_on_btn></li>
                <li><TabMenu_off_btn round={2}>주문/배송</TabMenu_off_btn></li>
                <li><TabMenu_off_btn round={1}>문의/리뷰</TabMenu_off_btn></li>
                <li><TabMenu_off_btn>통계</TabMenu_off_btn></li>
                <li><TabMenu_off_btn>스토어 설정</TabMenu_off_btn></li>
              </SidebarUl>
            </div>
            <RightSideSyle>{children}</RightSideSyle>
          </SidebarLayout>
        </>
      )
    }
    if(location.includes('regist_product')) {
      return (
        <>
          <TopTitleArea>
            <TopH2>상품등록</TopH2>
            <MS_btn_icon icon={plustIcon}>상품 업로드</MS_btn_icon>
          </TopTitleArea>
          <SidebarLayout>
            <div>
              <p>* 상품 등록 주의사항</p>
              <p>
                - 너무 귀여운 사진은 심장이 아파올 수 있습니다.- 유소년에게서 천자만홍이 피고 이상이 온갖 들어 약동하다. 이상의 가지에 사랑의 있는가? 주며, 끓는 힘차게 얼음이 얼음 가치를 황금시대의 있음으로써 사라지지 것이다. 이 뜨거운지라, 이상의 속에서 이것은 피가 보배를 황금시대의 싹이 사막이다.- 자신과 우는 옷을 지혜는 아니다. 더운지라 설레는 기쁘며, 위하여서, 평화스러운 광야에서 그리하였는가? 소담스러운 위하여 인도하겠다는 어디 무엇을 이상을 같지 따뜻한 청춘 칼이다.- 가치를 그들을 예수는 찬미를 가슴이 과실이 이것이다. 희망의 것이다.보라, 풍부하게 이것은 황금시대를 얼마나 인간에 돋고, 이것이다.
              </p>
            </div>
            <div>{children}</div>
          </SidebarLayout>
        </>
      )
    }
  }
  return (
    <>
      <TopbarSeller />
      <MainStyle> 
        {renderSidebar()}
      </MainStyle>
      {/* <Footer /> */}
    </>  
  )
} 
