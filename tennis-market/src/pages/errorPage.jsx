import { MS_btn, MS_btn_white } from '../components/buttons';
import errorImg from '../assets/images/icon-404.svg';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const WarpBox = styled.div`
  display: flex;
  gap: 50px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 50%;
  right: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
`
const Img = styled.img`
  width: 250px;
  max-width: 100%;
`

const Title = styled.p`
  font-size: 36px;
  font-weight: 700;
  text-align: center;
  @media only screen and (max-width: 430px) {
    font-size: 18px;
  }
`
const Desc = styled.p`
  font-size: 16px;
  color: ${({theme}) => theme.gray3};
  padding: 20px 0 40px;
  line-height: 1.3;
  text-align: center;
  @media only screen and (max-width: 430px) {
    font-size: 14px;
  }
`

const BtnFlex = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
`
export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <main>
      <WarpBox>
        <Img src={errorImg} alt="" />
        <div>
          <Title>페이지를 찾을 수 없습니다.</Title>
          <Desc>페이지가 존재하지 않거나 접근 권한이 없는 페이지입니다.<br/>웹 주소가 올바른지 확인해 주세요.</Desc>
          <BtnFlex>
            <MS_btn btnFn={() => navigate('/')}>메인으로</MS_btn>
            <MS_btn_white btnFn={() => navigate(-1)}>이전 페이지</MS_btn_white>
          </BtnFlex>
        </div>
      </WarpBox>
    </main>
  )
}
