import styled from 'styled-components';
import logo from '../../assets/images/logo.png';
import shoppingbag from '../../assets/images/icon-shopping-bag.svg';
import mypageIcon from '../../assets/images/icon-user.svg';
import cartIcon from '../../assets/images/icon-shopping-cart.svg';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { AlertOpen, user_info } from '../../atom/Atom';
import { MS_btn_icon } from '../buttons';
import { useContext, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { normalAxios } from '../../axios';
import ResetRecoilContext from '../../ResetRecoilContext';
import Cookies from 'universal-cookie';
import { AlertModal } from '../modal/AlertModal';

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

const Title = styled.p`
  font-size: 30px;
  font-weight: 600;
  padding-bottom: 5px;
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
const RightArea = styled.div`
  position: relative;
`
const MypageUl = styled.ul`
  width: 140px;
  padding: 10px 0;
  background: ${({theme}) => theme.w};
  text-align: center;
  position: absolute;
  right: ${(props) => props.$buyer ? `-35px` : `160px`};
  top: 68px;
  border-radius: 8px;
  box-shadow: -2px 5px 25px rgba(0,0,0,0.3);
  z-index: 1100;

  ::after {
    clear: both;
    position: absolute;
    display: block;
    content: '';
    top: -10px;
    left: 57px;
    width: 25px;
    height: 25px;
    rotate: 224deg;
    background: ${({theme}) => theme.w};
  }
`
const MypageLi = styled.li`
  padding: 20px 35px 10px;
  cursor: pointer;
  
  :hover {
    color: ${({theme}) => theme.main};
    font-weight: 500;
  }
  
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
  const [openMypage, setOpenMypage] = useState(false);
  const [openAlert, setOpenAlert] = useRecoilState(AlertOpen);


  const resetRecoil = useContext(ResetRecoilContext);
  const cookies = new Cookies();
  const logout = useMutation({
    mutationFn: () => {
      return normalAxios.post('/accounts/logout/');
    },
    onSuccess : (data) => {
      if(data.status === 200) {
        // reciol reset
        localStorage.removeItem("recoil-persist");
        resetRecoil();
        cookies.remove('accessToken');
        // 로그인 화면으로 이동
        navigate('/login');
      } else if(data.status === 400) {
      }
    },
    onError : (e) => {console.log(e.message)},
  })


  return (
    <HeaderStyle>
      <AlertModal content={'로그인이 필요한 서비스 입니다.'} btnFn={() => {navigate('/login'); setOpenAlert(false)}}/>
      <HeaderLayout>
        <LeftFlex>
          <h1><Logo src={logo} alt="리턴마켓로고" onClick={() => navigate('/')}/></h1>
          <SearchInput type="search" />
        </LeftFlex>

        <RightArea>
          {/* 마이페이지 드롭박스 */}
          {(openMypage && userInfo.user_type === 'BUYER') && 
            <MypageUl $buyer='true'>
              <MypageLi>마이페이지</MypageLi>
              <MypageLi onClick={() => logout.mutate()}>로그아웃</MypageLi>
            </MypageUl>
          }
          {(openMypage && userInfo.user_type === 'SELLER')  && 
            <MypageUl>
              <MypageLi>마이페이지</MypageLi>
              <MypageLi onClick={() => logout.mutate()}>로그아웃</MypageLi>
            </MypageUl>
          }

          {/* 로그인 전 */}
          {!userInfo.user_type && 
            <RightUl>
              <RightLi onClick={ () => setOpenAlert(true) }>
                <RightIcon src={cartIcon} alt="" />
                <p>장바구니</p>
              </RightLi>
              <RightLi onClick={() => navigate('/login')}>
                <RightIcon src={mypageIcon} alt="" />
                <p>로그인</p>
              </RightLi>
            </RightUl>
          }
          {/* 구매자 버전 */}
          {userInfo.user_type === 'BUYER' && 
            <RightUl>
              <RightLi onClick={() => navigate('/cart')}>
                <RightIcon src={cartIcon} alt="" />
                <p>장바구니</p>
              </RightLi>
              <RightLi onClick={()=>{openMypage ? setOpenMypage(false) : setOpenMypage(true);}}>
                <RightIcon src={mypageIcon} alt="" />
                <p>마이페이지</p>
              </RightLi>
            </RightUl>
          }
          {/* 판매자 버전 */}
          {userInfo.user_type === 'SELLER' && 
            <RightUl>
               <RightLi onClick={()=>{openMypage ? setOpenMypage(false) : setOpenMypage(true);}}>
                <RightIcon src={mypageIcon} alt="" />
                <p>마이페이지</p>
              </RightLi>
              <RightLi onClick={() => navigate('/seller_center')}>
                <MS_btn_icon icon={shoppingbag}>판매자센터</MS_btn_icon>
              </RightLi>
            </RightUl>
          }
        </RightArea>
      </HeaderLayout>
    </HeaderStyle>
  )
};

export function TopbarSeller() {
  const navigate = useNavigate();
  const [openMypage, setOpenMypage] = useState(false);
  return (
    <HeaderStyle>
      <HeaderLayout>
        <LeftFlex>
          <h1><Logo src={logo} alt="리턴마켓로고" onClick={() => navigate('/')}/></h1>
          <Title>판매자 센터</Title>
        </LeftFlex>
      </HeaderLayout>
    </HeaderStyle>
  ) 
};
 