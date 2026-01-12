import { useState, useEffect } from "react";
import { Benefits } from "@/widgets/benefits-grid";
import { FeedbackForm } from "@/features/feedback-form";
import { FrontPage } from "@/widgets/hero-section";
import { HomePageStocks } from "@/widgets/home-stocks-section";
import { Interior } from "@/widgets/interior-carousel";
import { ScrollToTopBtn } from "@/shared/ui/scroll-to-top-btn";
import { ScrollingAnnouncement } from "@/shared/ui/scrolling-announcement";
import { SpecialOffer } from "@/widgets/special-offer";
import { ModalPromo } from "@/shared/ui/modal/promo-modal";
import { ContentPromo } from "@/features/promo-modal";

export const HomePage = () => {
  const [modalPromoOpen, setModalPromoOpen] = useState(false);

  useEffect(() => {
    const modalTimer = setTimeout(() => setModalPromoOpen(true), 7000);
    return () => clearTimeout(modalTimer);
  }, []);

  return (
    <>
      {modalPromoOpen && (
        <ModalPromo setModalPromoOpen={setModalPromoOpen}>
          <ContentPromo setModalPromoOpen={setModalPromoOpen} />
        </ModalPromo>
      )}

      <main>
        <FrontPage />
        <ScrollToTopBtn />
        <Benefits />
        <Interior />
        <ScrollingAnnouncement />
        <HomePageStocks />
        <SpecialOffer />
        <ScrollingAnnouncement />
        <div id="form">
          <FeedbackForm />
        </div>
      </main>
    </>
  );
};

export default HomePage;
