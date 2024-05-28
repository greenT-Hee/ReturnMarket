import styled from "styled-components";
import insta from "../../assets/images/icon-insta.svg";
import facebook from "../../assets/images/icon-fb.svg";
import youtube from "../../assets/images/icon-yt.svg";
const FooterStyle = styled.footer`
  width: 100%;
  padding: 60px 0;
  box-sizing: border-box;
  background: ${({theme}) => theme.gray1};
`
const ContentBox = styled.div`
  max-width: 1280px;
  box-sizing: border-box;
  margin: 0 auto;
  padding: 0 20px;
`

const TopDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 30px;
  border-bottom: 1px solid ${({theme}) => theme.gray2};
`
const BottomDiv = styled.div`
  padding: 30px 0 0;
`
const Ul = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 12;
`

const Sns = styled.div`
  width: 32px;
  height: 32px;
  background: ${(props) => props.$insta ?  `url(${insta}) center no-repeat` : null};
  background: ${(props) => props.$facebook ?  `url(${facebook}) center no-repeat` : null};
  background: ${(props) => props.$yt ?  `url(${youtube}) center no-repeat` : null};
  margin-right: 6px;
  
`
const LiStyle1 = styled.li`
  font-size: 14px;
`
const LiStyle2 = styled.li`
  font-size: 14px;
  color: ${({theme}) => theme.gray4};
  padding-bottom: 6px;
`

export default function Footer() {
  return (
    <FooterStyle>
      <ContentBox>
        {/* top */}
        <TopDiv>
          <Ul>
            <LiStyle1>&ensp;리턴마켓 소개&ensp;|</LiStyle1>
            <LiStyle1>&ensp;이용약관&ensp;|</LiStyle1>
            <LiStyle1>&ensp;개인정보처리방침&ensp;|</LiStyle1>
            <LiStyle1>&ensp;전자금융거래약관&ensp;|</LiStyle1>
            <LiStyle1>&ensp;청소년보호정책&ensp;|</LiStyle1>
            <LiStyle1>&ensp;제휴문의</LiStyle1>
          </Ul>
          <Ul>
            <li><a href="#none"><Sns $insta></Sns></a></li>
            <li><a href="#none"><Sns $facebook></Sns></a></li>
            <li><a href="#none"><Sns $yt></Sns></a></li>
          </Ul>
        </TopDiv>
        {/* bottom */}
        <BottomDiv>
          <ul>
            <LiStyle2><p>(주)리턴마켓</p></LiStyle2>
            <LiStyle2><p>서울특별시 송파구 올림픽로 123길 123로</p></LiStyle2>
            <LiStyle2><p>사업자 번호 : 000-0000-0000 | 통신판매업</p></LiStyle2>
            <LiStyle2><p>대표 : 김태희</p></LiStyle2>
          </ul>
        </BottomDiv>
      </ContentBox>
    </FooterStyle>
  )
}
