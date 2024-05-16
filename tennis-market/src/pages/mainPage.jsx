import styled from "styled-components"

function MainPage() {
  return (
    <Test>mainPage</Test>
  )
}

const Test = styled.div`
  color: ${({theme}) => theme.gray1}
`

export default MainPage