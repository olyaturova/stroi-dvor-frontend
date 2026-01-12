import { React, useEffect, useRef } from "react";

import { AccordionDaily } from "@/widgets/accordionDaily";
import { FeedbackForm } from "@/features/feedback-form";
import { gsap } from "gsap"; 
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Daily = () => {
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
    
        <div className="daily">
            <section className="daily-main">
                <div className="column">
                    <h4 className="white" ref={addtoRefs}>
                        Режим <span className="outlined">работы</span>
                    </h4>
                    <p className="description" ref={addtoRefs}>
                        Мы работаем для вас <span className="orange">без выходных</span> 7 дней в неделю.
                    </p>
                </div>
                <AccordionDaily />
            </section>
            <FeedbackForm />
        </div>
    )
}

export default Daily;