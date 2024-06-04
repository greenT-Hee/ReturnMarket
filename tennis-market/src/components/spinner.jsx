import styled from "styled-components";
import spinner from '../assets/images/spinner.svg';
const LoadingBox = styled.article`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0,0,0,0.2);
  z-index: 1000;
  padding: 0 40px;
`
const SpinnerStyle = styled.img`
  position: absolute;
  left: 50%;
  right: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

export default function Spinner() {
  return (
    <LoadingBox>
      <SpinnerStyle src={spinner} alt="로딩" />
    </LoadingBox>
  )
}
