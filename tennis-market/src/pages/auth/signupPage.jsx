import SellerForm from '../../components/signup/SellerForm';
import ConsumerForm from '../../components/signup/ConsumerForm';
import { ComfirmModal } from '../../components/modal/comfirmModals';
import AuthLayout from '../../components/layout/AuthLayout';
import { useRecoilValue } from 'recoil';
import { user_role } from '../../atom/Atom';

function SignupPage() {
  const userRole = useRecoilValue(user_role)
  return (
    <AuthLayout>
        {userRole === 'consumer' ? <ConsumerForm /> :<SellerForm /> }
        <ComfirmModal content={'💚 회원가입이 완료됐습니다 💚\n로그인 페이지로 이동할까요?'}/>
    </AuthLayout>
   
  ) 
}

export default SignupPage