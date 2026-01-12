import { React, useEffect, useRef } from 'react';
import { gsap } from "gsap"; 
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { dataBenefits } from "@/shared/data/data-benefits";

gsap.registerPlugin(ScrollTrigger);

export const Benefits = () => {
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
        <section className="benefits flex-around">
            {dataBenefits.map((benefit) => {
                const { id, icon: IconComponent, headingOne, subheading } = benefit;
                return(
                    <div key={id} className="benefit column" ref={addtoRefs}>
                        <p className="benefit-icon"><IconComponent  /></p>
                        <br />
                        <p className="benefit-heading upper">{headingOne}</p>
                        <p className="benefit-explanation">{subheading}</p>
                    </div>
                )
            })}
        </section>
    )
}