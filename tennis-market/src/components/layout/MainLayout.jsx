import Footer from "./Footer";
import { TopbarMain } from "./Topbar";

export default function MainLayout({children}) {
  return (
    <>
      <TopbarMain />
      <main> 
        {children}
      </main>
      <Footer />
    </>
  )
} 
