import Footer from "./Footer";
import { TopbarMain } from "./Topbar";
import scrollIcon from "../../assets/images/icon-scroll.svg";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";


const ScrollImg = styled.img`
  position: fixed;
  right: 20px;
  bottom: 5%;
  z-index: 100;
  cursor: pointer;
`
export default function MainLayout({children}) {
  const [showButton, setShowButton] = useState(false);
  const scrollToTop = () => {
    window.scroll({
        top: 0,
        behavior: 'smooth'
    })
  }
  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > 700) {
          setShowButton(true)
      } else {
          setShowButton(false)
      }
    }
    window.addEventListener("scroll", handleShowButton)
    return () => {
        window.removeEventListener("scroll", handleShowButton)
      }
    }, []);

  
  return (
    <>
      <TopbarMain />
      <main> 
        {children}
        {showButton && <ScrollImg src={scrollIcon} alt="스크롤" onClick={scrollToTop}/>}
      </main>
      <Footer />
    </>
  )
} 
