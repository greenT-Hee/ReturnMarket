import Footer from "./Footer";
import { TopbarSeller } from "./Topbar";

export default function SellerLayout({children}) {
  return (
    <>
      <TopbarSeller />
      <main> 
        {children}
      </main>
      <Footer />
    </>
  )
} 
