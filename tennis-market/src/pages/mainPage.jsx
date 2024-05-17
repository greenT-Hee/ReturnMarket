import styled from "styled-components"
import { L_btn, L_btn_disable, MS_btn, MS_btn_icon, MS_btn_white, M_btn, M_btn_dark, M_btn_disable, M_btn_white, S_btn, S_btn_white, TabMenu_off_btn, TabMenu_on_btn, Tab_active_btn, Tab_disable_btn } from "../components/buttons"

function MainPage() {
  return (
    <div>
      <h1>mainpage</h1>
      <L_btn>버튼</L_btn>
      <L_btn_disable>버튼</L_btn_disable>
      <M_btn>버튼</M_btn>
      <M_btn_dark>버튼</M_btn_dark>
      <M_btn_white>버튼</M_btn_white>
      <M_btn_disable>버튼</M_btn_disable>
      <MS_btn>버튼</MS_btn>
      <MS_btn_white>버튼</MS_btn_white>
      <MS_btn_icon>상품 업로드</MS_btn_icon>
      <S_btn>버튼</S_btn>
      <S_btn_white>버튼</S_btn_white>
      <Tab_active_btn>버튼</Tab_active_btn>
      <Tab_disable_btn>버튼</Tab_disable_btn>
      <TabMenu_on_btn>판매중인 상품(3)</TabMenu_on_btn>
      <TabMenu_off_btn>판매중인 상품(3)</TabMenu_off_btn>
    </div>
  )
}


export default MainPage