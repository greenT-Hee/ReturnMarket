import SellerForm from '../../components/signup/SellerForm';
import ConsumerForm from '../../components/signup/ConsumerForm';
import AuthLayout from '../../components/layout/AuthLayout';
import { useRecoilState, useRecoilValue } from 'recoil';
import { AlertOpen, user_role } from '../../atom/Atom';
import { AlertModal } from '../../components/modal/AlertModal';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const userRole = useRecoilValue(user_role);
  const navigate = useNavigate();
  const [openAlert, setOpenAlert] = useRecoilState(AlertOpen);
  const successSignup = () => {
    setOpenAlert(false);
    navigate('/login');
  }
  return (
    <AuthLayout>
        {userRole === 'BUYER' ? <ConsumerForm /> :<SellerForm /> }
        <AlertModal content={'💚 회원가입이 완료됐습니다 💚\n로그인 페이지로 이동할까요?'} btnFn={successSignup}/>
    </AuthLayout>
   
  ) 
}

export default SignupPage