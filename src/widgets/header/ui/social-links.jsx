import { FaTelegram } from "react-icons/fa";
import { SlSocialVkontakte } from "react-icons/sl";
import { FaWhatsapp } from "react-icons/fa";

export const SocialLinks = () => {
    return(
        <div className="social-links">
           <a href="https://web.telegram.org/"  aria-label="link to telegram" target="_blank">
            <FaTelegram alt="telegtam" className="social-icon me-4" />
        </a>
        <a href="https://vk.com/" aria-label="link to vkontakte" target="_blank" >
            <SlSocialVkontakte className="social-icon me-4" />
        </a>
        <a href="https://web.whatsapp.com/"  aria-label="link to whatsapp" target="_blank" >
            <FaWhatsapp className="social-icon me-4"/>
        </a>
        </div>
    )
}