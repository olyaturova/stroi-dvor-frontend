import { React, useEffect, useRef } from 'react';
import { dataPromos } from "@/shared/data/data-promos";
import { gsap } from "gsap"; 
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const PromosInfo = () => {
    const ref = useRef();
    
    useEffect(() => {
        const el = ref.current;
        gsap.fromTo(el, { y: 50, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.7, scrollTrigger: {
                trigger: el,
                start: "top bottom-=70",
                toggleActions: "play none none reverse"
            }
        })
    }, [])

    return(
        <div className="flex-around wrap gap" ref={ref}>
            {dataPromos.map((element) => {
                const { id, image, name, description } = element;
                return(
                    <div key={id} className="promo-card">
                        <img className="promo-image" src={image} alt="promo" />
                        <p className="stock-name uppercase">{name}</p>
                        <p className="promo-about">{description}</p>
                    </div>
                )
            })}
        </div>
    )
}