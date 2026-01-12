import { React, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { gsap } from "gsap"; 
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RiArrowRightSLine } from "react-icons/ri";

gsap.registerPlugin(ScrollTrigger);

export const StocksInfo = ({ stocks }) => {
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
        <div className="flex-around wrap" ref={ref}>
            {stocks.map((element) => {
                const { id, image, name } = element;
                return(
                    <div key={id} className="stock-card">
                        <div className="classCard-inner">
                            <Link to={`/stocks/${element.title}`}>
                                <img className="stock-photo" src={image} alt="stock" />
                            </Link>
                            <p className="stock-name">{name}</p>
                            <Link to={`/stocks/${element.title}`}>
                                <RiArrowRightSLine className="right-arrow" />
                            </Link>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}