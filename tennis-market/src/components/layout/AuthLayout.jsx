import styled from "styled-components";
import logo from '../../assets/images/logo.png';
import { useNavigate } from "react-router-dom";
import { Tab_active_btn, Tab_disable_btn } from "../buttons";
import { useRecoilState } from "recoil";
import { user_role } from "../../atom/Atom";
const Section = styled.section`
  width: 570px;
  max-width: 100%;
  margin: 50px auto;
  padding: 20px;
  box-sizing: border-box;
`
const LgooStyle = styled.img`
  display: block;
  width: 220px;
  max-width: 100%;
  margin: 0 auto 40px;
`
const UL = styled.ul`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 30px;
  margin-bottom: 30px;
`
const Li = styled.li`
  width: calc(100% / 2);
`
export default function AuthLayout({children}) {
  const navigate = useNavigate();
  // const [consumer, setConsumer] = useState(true);
  // const [seller, setSeller] = useState(false);
  const [userRole, setUserRole] = useRecoilState(user_role);
  
  const handleSort = (e) => {
    console.log(e.target.innerText)
    if(e.target.innerText === '구매회원가입') {
      setUserRole("BUYER");
    } else {
      setUserRole("SELLER");
    }
  };
  return (
    <main>
      <Section>
        <h1><LgooStyle src={logo} alt="메인로고" onClick={() => navigate('/')}/></h1>
        <UL>
            <Li onClick={handleSort}>
                {userRole === 'BUYER' ? <Tab_active_btn type='button' >구매회원가입</Tab_active_btn> : <Tab_disable_btn type='button' >구매회원가입</Tab_disable_btn>}
            </Li>
            <Li onClick={handleSort}>
                {userRole === 'SELLER'  ? <Tab_active_btn type='button'>판매회원가입</Tab_active_btn> : <Tab_disable_btn type='button'>판매회원가입</Tab_disable_btn>}
            </Li>
        </UL>
        {children}
      </Section>
    </main>
  )
}
