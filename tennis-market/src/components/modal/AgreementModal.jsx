import styled from "styled-components"
import { MS_btn, M_btn } from "../buttons"
import { AlertOpen } from "../../atom/Atom"
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

export default function AgreementModal({title, content}) {
  const [alertOpen, setAlertOpen] = useRecoilState(AlertOpen);

  return (
    <>
    {alertOpen &&
      <ModalBox>
        <ContentBox>
          <Title>{title}</Title>
          <Content value={content} readOnly></Content>
          <MS_btn btnFn={() => setAlertOpen(false)}>확인</MS_btn>
        </ContentBox>
      </ModalBox>
    }
    </>
  )
}
