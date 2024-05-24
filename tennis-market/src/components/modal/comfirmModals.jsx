import styled from "styled-components"
import { S_btn, S_btn_white } from "../buttons"
import { useRecoilState } from "recoil"
import { ConfirmOpen } from "../../atom/Atom"
import { useNavigate } from "react-router-dom"


const ConfirmBox = styled.article`
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
  width: 360px;
  max-width: calc(100% - 20px);
  box-sizing: border-box;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const BtnFlex = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 30px;
`

const ContentP = styled.p`
  word-wrap: break-word;
  white-space: pre-wrap;
  line-height: 1.4;
  text-align: center;
  font-size: 16px; 
`
export function ComfirmModal({content}) {
  const [openConfrim, setOpenConfirm] = useRecoilState(ConfirmOpen);
  const navigate = useNavigate();
  return (
    <>
      {openConfrim && 
        <ConfirmBox>
          <ContentBox>
            <ContentP>{content}</ContentP>
            <BtnFlex>
              <li><S_btn_white btnFn={() => {setOpenConfirm(false); navigate('/')} }>아니오</S_btn_white></li>
              <li><S_btn btnFn={() => navigate('/login')}>예</S_btn></li>
            </BtnFlex>
    
          </ContentBox>
        </ConfirmBox>
      }
    </>
  )
}

