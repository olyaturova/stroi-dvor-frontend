import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "@/widgets/header";
import { ScrollToTopBtn } from "@/shared/ui/scroll-to-top-btn";
import { Footer } from "@/widgets/footer";

export const Layout = () => {
  const [active, setActive] = useState(true);

  return (
    <>
      <Navbar active={active} setActive={setActive} />
      <main>
        <Outlet /> 
      </main>
      
      <ScrollToTopBtn />
      
      <Footer />
    </>
  );
};

export default Layout;