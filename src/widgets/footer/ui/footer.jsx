import React from 'react';
import { Link } from 'react-router-dom';
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBCol,
  MDBRow
} from 'mdb-react-ui-kit';
import { FaTelegram } from "react-icons/fa";
import { SlSocialVkontakte } from "react-icons/sl";
import { FaWhatsapp } from "react-icons/fa";


export const Footer = () => {
    return (
      <div>
        <div>
        </div>
        <MDBFooter style={{backgroundColor: "#202226"}} className='text-center text-lg-start text-muted text-light'>
          <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
            <div className='me-5 d-none d-lg-block text-light'>
              <span>Присоединяйтесь к нам в социальных сетях</span>
            </div>
    
            <div>
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
          </section>
    
          <section className=''>
            <MDBContainer className='text-center text-md-start mt-2'>
              <MDBRow className='mt-2'>
                <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
                  <h2 className='text-uppercase fw-bold mb-3'>
                    <Link to="/" className='text-decoration-none' style={{color: "#e2ac5a"}}>СТРОЙДВОР</Link>
                  </h2>
                  <p style={{color: "#949ea2"}}>
                 5000+ видов материалов для стройки, ремонта и благоустройства.
                  </p>
                </MDBCol>
    
                <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4 text-light'>
                  <p>
                    <Link to='/' className='text-light'>
                      Главная страница
                    </Link>
                  </p>
                  <p>
                  <Link to="/stocks" className='text-light'>
                      Строительные и отделочные материалы
                    </Link>
                  </p>
                  <p>
                  </p>
                  <p>
                    <Link to='/shop' className='text-light'>
                      Каталог
                    </Link>
                  </p>
                </MDBCol>
    
                <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4 text-light'>

                  <p>
                  <Link to='/promos' className='text-light'>
                      Промоакции
                      </Link>
                  </p>
                  <p>
                  <Link to='/daily' className='text-light'>
                      Режим работы
                      </Link>
                  </p>
                </MDBCol>
    
                <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4 text-light'>
                  <h6 className='text-uppercase fw-bold mb-4'>Контакты</h6>
                  <p>
                    <MDBIcon icon="envelope" className="me-3" />
                    <a href='mailto:info@stroi-dvor.ru' className='text-reset text-decoration-none'>
                    info@stroi-dvor.ru
                    </a>
                  </p>
                  <p>
                    <MDBIcon icon="phone" className="me-3" /> 
                    <a href='tel:+79000000000' className='text-reset text-decoration-none'>
                    +79000000000
                    </a>
                  </p>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </section>
           <div className='me-5 d-none d-lg-block text-light'>
              <span>Практический дипломный проект студентки ПрИЗ-501 ЧелГУ Туровой О.М.</span>
            </div>
        </MDBFooter>
        </div>
      );
}