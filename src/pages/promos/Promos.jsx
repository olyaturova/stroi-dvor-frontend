import { React, useEffect, useRef } from "react";
import { Benefits } from "@/widgets/benefits-grid";
import { FeedbackForm } from "@/features/feedback-form";
import { PromosInfo } from "@/widgets/promos-grid";
import { HashLink as Link } from 'react-router-hash-link';
import { gsap } from "gsap"; 
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Promos = () => {
    const ref = useRef([]);
    ref.current = [];

    useEffect(() => {
        ref.current.forEach((el) => {
            gsap.fromTo(el, { y: 50, opacity: 0 }, {
                y: 0, opacity: 1, duration: 0.7, scrollTrigger: {
                    trigger: el,
                    start: "top bottom-=70",
                    toggleActions: "play none none reverse"
                }
            })
        })
    }, [])

    const addtoRefs = (el) => {
        if (el && !ref.current.includes(el)) {
            ref.current.push(el);
        }
    }

    return(
        <div>
            <section>
                <div className="column">
                    <h4 className="black" ref={addtoRefs}>
                       Выгодные предложения <span className="outlined border-black">для наших клиентов</span>
                    </h4>
                    <p className="description black" ref={addtoRefs}>
Мы всегда думаем и заботимся о наших клиентах. Поэтому мы постоянно проводим различные акции, чтобы удовлетворить ваши потребности. Воспользуйтесь этой возможностью. Выберите свою акцию уже сегодня.                    </p>
                </div>
                <PromosInfo />
                <br />
                <div className="column">
                    <button className="cta learn-more" ref={addtoRefs}>
                        <Link smooth to="/#form" className="link text-light">Узнать подробнее</Link>
                    </button>
                </div>
            </section>
            <Benefits />
            <FeedbackForm />
        </div>
    )
}

export default Promos;