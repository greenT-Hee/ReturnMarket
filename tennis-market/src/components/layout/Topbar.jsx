import styled from 'styled-components';
import logo from '../../assets/images/logo.png';
import shoppingbag from '../../assets/images/icon-shopping-bag.svg';
import mypageIcon from '../../assets/images/icon-user.svg';
import cartIcon from '../../assets/images/icon-shopping-cart.svg';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { user_info } from '../../atom/Atom';
import { MS_btn_icon } from '../buttons';

const HeaderStyle = styled.header`
  padding: 15px 20px 25px;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 5px 6px rgba(0,0,0,0.06);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background:${({theme}) => theme.w};
`
const HeaderLayout = styled.div`
  width: 1280px;
  max-width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin: 0 auto;
`

const Logo = styled.img`
  width: 100px;
  cursor: pointer;
`

const LeftFlex = styled.div`
  width: fit-content;
  display: flex;
  align-items:flex-end;
  justify-content: center;
  gap: 30px;
`

const SearchInput = styled.input`
  width: 400px;
  max-width: 100%;
  padding: 15px 23px;
  border: none;
  outline: 2px solid ${({theme}) => theme.main};
  border-radius: 32px;
`


const RightUl = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
`
const RightLi = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
  cursor: pointer;
`

const RightIcon = styled.img`
  width: 25px;
  height: 25px;
`

export function TopbarMain() {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(user_info);
  return (
    <HeaderStyle>
      <HeaderLayout>
        <LeftFlex>
          <Logo src={logo} alt="리턴마켓로고" onClick={() => navigate('/')}/>
          <SearchInput type="search" />
        </LeftFlex>

        <div>
          {!userInfo.user_type && 
            <RightUl>
              <RightLi onClick={() => navigate('/cart')}>
                <RightIcon src={cartIcon} alt="" />
                <p>장바구니</p>
              </RightLi>
              <RightLi onClick={() => navigate('/login')}>
                <RightIcon src={mypageIcon} alt="" />
                <p>로그인</p>
              </RightLi>
            </RightUl>
          }
          {userInfo.user_type === 'BUYER' && 
            <RightUl>
              <RightLi onClick={() => navigate('/cart')}>
                <RightIcon src={cartIcon} alt="" />
                <p>장바구니</p>
              </RightLi>
              <RightLi onClick={() => navigate('/login')}>
                <RightIcon src={mypageIcon} alt="" />
                <p>마이페이지</p>
              </RightLi>
            </RightUl>
          }
          {userInfo.user_type === 'SELLER' && 
            <RightUl>
              <RightLi onClick={() => navigate('/cart')}>
                <RightIcon src={cartIcon} alt="" />
                <p>장바구니</p>
              </RightLi>
              <RightLi onClick={() => navigate('/login')}>
                <MS_btn_icon icon={shoppingbag}>판매자센터</MS_btn_icon>
              </RightLi>
            </RightUl>
          }
        </div>
      </HeaderLayout>
    </HeaderStyle>
  )
};

export function TopbarSeller() {
  return (
    <div>Header</div>
  ) 
};
 