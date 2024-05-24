import styled from "styled-components"
import { MS_btn, M_btn } from "../buttons"
import { ModalOpen } from "../../atom/Atom"
import { useRecoilState } from "recoil"

const ModalBox = styled.article`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  z-index: 1000;
  padding: 0 40px;
`
const ContentBox = styled.div`
  position: absolute;
  left: 50%;
  right: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 36px;
  width: 480px;
  max-width: calc(100% - 20px);
  box-sizing: border-box;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Title = styled.p`
  text-align: center;
  font-size: 28px;
  font-weight: 700;
  `
const Content = styled.textarea`
  width: 100%;
  min-height: 380px;
  overflow-y: scroll;
  border-radius: 16px;
  border: 1px solid ${({theme}) => theme.gray2};
  padding: 20px;
  margin: 40px 0;
  box-sizing: border-box;
  outline: none;
  resize: none;
`

export default function AgreeModal({type}) {
  const [alertOpen, setAlertOpen] = useRecoilState(ModalOpen);
  return (
    <>
      {type === 'use' && 
        <ModalBox>
          <ContentBox>
            <Title>코트프렌즈샵 이용약관</Title>
            <Content value={'제 1조(목적)\n\n본 약관은 (주)코트프렌즈샵이 운영하는 웹사이트 코트츠렌즈샵에 제공하는 온라인 서비스(이사 서비스)를 이용함에 있어서 사이버몰과 이용자의 권리, 의무 및 책인사항을 규정함을 목적으로합니다.]\n\n\n제 2 조 (용어의 정의)\n\n본 약관에서 사용하는 용어는 다음과 같이 정의한다.\n1. “웹사이트”란 회사가 재화 또는 용역을 이용자에게 제공하기 위하여 컴퓨터 등 정보통신설비를 이용하여 재화 또는 용역을 거래 할 수 있도록 설정한 가상의 영업장을 말하며, 아울러 사이버몰을 운영하는 사업자의 의미로도 사용합니다.\n2. “이용자”란 “웹사이트”에 접속하여 서비스를 이용하는 회원 및 비회원을 말합니다.\n3. “회원”이라 함은 “웹사이트”에 개인정보를 제공하여 회원등록을 한 자로서, “웹사이트”의 정보를 지속적으로 제공받으며, “웹사이트”이 제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다.\n4. “비회원”이라 함은 회원에 가입하지 않고, “웹사이트”이 제공하는 서비스를 이용하는 자를 말합니다.\n5. “ID”라 함은 이용자가 회원가입당시 등록한 사용자 “개인이용문자”를 말합니다.\n6. “멤버십”이라 함은 회원등록을 한 자로서, 별도의 온/오프라인 상에서 추가 서비스를 제공 받을 수 있는 회원을 말합니다.'} readOnly></Content>
            <MS_btn btnFn={() => setAlertOpen(false)}>확인</MS_btn>
          </ContentBox>
        </ModalBox>
      }
      {type === 'info' && 
        <ModalBox>
          <ContentBox>
            <Title>코트프렌즈샵 개인정보이용약관</Title>
            <Content value={'제 1조(목적)\n\n본 약관은 (주)코트프렌즈샵이 운영하는 웹사이트 코트츠렌즈샵에 제공하는 온라인 서비스(이사 서비스)를 이용함에 있어서 사이버몰과 이용자의 권리, 의무 및 책인사항을 규정함을 목적으로합니다.]\n\n\n제 2 조 (용어의 정의)\n\n본 약관에서 사용하는 용어는 다음과 같이 정의한다.\n1. “웹사이트”란 회사가 재화 또는 용역을 이용자에게 제공하기 위하여 컴퓨터 등 정보통신설비를 이용하여 재화 또는 용역을 거래 할 수 있도록 설정한 가상의 영업장을 말하며, 아울러 사이버몰을 운영하는 사업자의 의미로도 사용합니다.\n2. “이용자”란 “웹사이트”에 접속하여 서비스를 이용하는 회원 및 비회원을 말합니다.\n3. “회원”이라 함은 “웹사이트”에 개인정보를 제공하여 회원등록을 한 자로서, “웹사이트”의 정보를 지속적으로 제공받으며, “웹사이트”이 제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다.\n4. “비회원”이라 함은 회원에 가입하지 않고, “웹사이트”이 제공하는 서비스를 이용하는 자를 말합니다.\n5. “ID”라 함은 이용자가 회원가입당시 등록한 사용자 “개인이용문자”를 말합니다.\n6. “멤버십”이라 함은 회원등록을 한 자로서, 별도의 온/오프라인 상에서 추가 서비스를 제공 받을 수 있는 회원을 말합니다.'} readOnly></Content>
            <MS_btn btnFn={() => setAlertOpen(false)}>확인</MS_btn>
          </ContentBox>
        </ModalBox>
      }
    </>
  )
}