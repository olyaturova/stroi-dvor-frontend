import { HashLink as Link } from 'react-router-hash-link';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import mainPhoto from "@/shared/assets/main-photo.jpg";

gsap.registerPlugin(useGSAP);

export const FrontPage = () => {
    const animateFrontPage = useRef();

    useGSAP(
        () => {
            gsap.from('h2', { delay: 0.5, duration: 1, y: -70, opacity: 0, ease: "sine.out" });
            gsap.from('h3', { delay: 2, duration: 1, y: 70, opacity: 0, ease: "sine.out" });
            gsap.from('.cta', { delay: 2, duration: 1, y: 70, opacity: 0, ease: "sine.out" });
        },
        { scope: animateFrontPage }
    );

    return(
        <section className="top-cover column" ref={animateFrontPage}>
        <img src={mainPhoto} alt="cover" className="main-photo" /> 
            <h2 className='orange'>Добро пожаловать в <span className="outlined-words">&nbsp;СТРОЙ-ДВОР&nbsp;</span></h2>
            <br />
            <h3 className='heading'>База Строй Двор предлагает широкий выбор материалов для строительства от фундамента до крыши, внутренней и наружной отделки, устройства инженерных коммуникаций, сантехники - все что может потребоваться для стройки и ремонта Вы найдете у нас. Для приусадебного участка и дачи в наличии садовый инвентарь, инструмент и принадлежности. У нас есть что выбрать !</h3>
           <br />
           <button className="cta">
                <Link smooth to="/stocks" className="text-light">Наш ассортимент</Link>
            </button>
        </section>
    )
}