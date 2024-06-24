import styled from 'styled-components';
import logo from '../../assets/images/logo.png';
import shoppingbag from '../../assets/images/icon-shopping-bag.svg';
import shoppingbagBlack from '../../assets/images/icon-shopping-bag_black.svg';
import mypageIcon from '../../assets/images/icon-user.svg';
import cartIcon from '../../assets/images/icon-shopping-cart.svg';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { AlertOpen, user_info } from '../../atom/Atom';
import { MS_btn, MS_btn_icon, S_btn } from '../buttons';
import { useContext, useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { normalAxios } from '../../axios';
import ResetRecoilContext from '../../ResetRecoilContext';
import Cookies from 'universal-cookie';
import { AlertModal } from '../modal/AlertModal';
import searchIcon from '../../assets/images/icon-search.svg'

const HeaderStyle = styled.header`
  display: flex;
  align-items: center;
  padding: 24px 20px;
  width: 100%;
  height: 97px;
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
  @media only screen and (max-width: 900px) {
    /* justify-content: center; */
  }
`

const Logo = styled.img`
  width: 120px;
  cursor: pointer;
  @media only screen and (max-width: 900px) {
    width: 90px;
  }
`

const Title = styled.p`
  font-size: 30px;
  font-weight: 600;
  line-height: 0;
  @media only screen and (max-width: 900px) {
    font-size: 24px;
  }
`

const LeftFlex = styled.div`
  width: fit-content;
  max-width: 100%;
  display: flex;
  align-items:center;
  justify-content: center;
  gap: 30px;
  position: relative;
  @media only screen and (max-width: 900px) {
    gap: 14px;
  }
`

const SearchInput = styled.input`
  display: block;
  width: 360px;
  padding: 15px 23px;
  border: none;
  outline: 2px solid ${({theme}) => theme.main};
  border-radius: 32px;
  @media only screen and (max-width: 900px) {
    width: 200px;
    padding: 12px 16px;
  }
`
const SearchIcon = styled.img`
  position: absolute;
  right: 16px;
  top: 9px;
  background:${({theme}) => theme.w};
  cursor: pointer;
  @media only screen and (max-width: 900px) {
    bottom: 7px;
    right: 10px;
    top: unset;
  }
`
const RightArea = styled.div`
  position: relative;
  background:${({theme}) => theme.w};
  @media only screen and (max-width: 900px) {
    position: fixed;
    right: 10px;
    top: 110px;
    border-radius: 10px;
    padding: 10px 5px;
    border: 1px solid ${({theme}) => theme.gray2};
  }

`
const MypageUl = styled.ul`
  width: 140px;
  padding: 10px 0;
  background: ${({theme}) => theme.w};
  text-align: center;
  position: absolute;
  right: ${(props) => props.$buyer ? `-35px` : `65px`};
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
    rotate: 221deg;
    background: ${({theme}) => theme.w};
  }


  @media only screen and (max-width: 900px) {
    width: 90px;
    top:  ${(props) => props.$buyer ? `90ox` : `20px`};
    right: ${(props) => props.$buyer ? `85px` : `85px`};
    ::after {
      width: 14px;
      height: 14px;
      left: unset;
      right: -4px;
      top: 7px;
    }
  }
`
const MypageLi = styled.li`
  padding: 20px 35px 10px;
  cursor: pointer;
  
  :hover {
    color: ${({theme}) => theme.main};
    font-weight: 500;
  }
  @media only screen and (max-width: 900px) {
    font-size: 13px;
    padding: 12px 20px 6px;
  }
  
`

const RightUl = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  display: flex;
  @media only screen and (max-width: 900px) {
  flex-direction: column;
  gap: 15px;
  font-size: 13px;
}
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
  const [searchVal, setSearchVal] = useState("검색어없음");

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
  });

  return (
    <HeaderStyle>
      <AlertModal content={'로그인이 필요한 서비스 입니다.'} btnFn={() => {navigate('/login'); setOpenAlert(false)}}/>
      <HeaderLayout>
        <LeftFlex>
          <h1><Logo src={logo} alt="리턴마켓로고" onClick={() => navigate('/')}/></h1>
          <SearchInput type="text" onChange={e => setSearchVal(e.target.value)}/>
          <SearchIcon src={searchIcon} alt="검색아이콘" onClick={() => navigate('/search/' + searchVal)}/>
        </LeftFlex>

        <RightArea>
          {/* 마이페이지 드롭박스 */}
          {(openMypage && userInfo.user_type === 'BUYER') && 
            <MypageUl $buyer='true'>
              <MypageLi onClick={() => navigate("/order")}>주문목록</MypageLi>
              <MypageLi onClick={() => logout.mutate()}>로그아웃</MypageLi>
            </MypageUl>
          }
          {(openMypage && userInfo.user_type === 'SELLER')  && 
            <MypageUl>
              <MypageLi onClick={() => navigate("/regist_product")}>상품등록</MypageLi>
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
                <RightIcon src={shoppingbagBlack} alt="" />
                <p>판매자센터</p>
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
 