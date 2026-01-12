import { Link } from "react-router-dom";
import { ValidationError, useForm } from '@formspree/react';
import Checkbox from '@mui/material/Checkbox';
import { Fade } from "react-awesome-reveal";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export const FeedbackForm = () => {
  const [state, handleSubmit] = useForm("mknkzlng");
  
  if (state.succeeded) {
    return (
      <div className="column form-feedback">
        <p className="form-response">Спасибо за ваше сообщение.</p>
        <p className="form-response">Наши менеджеры скоро свяжутся с вами.</p>
      </div>
    );
  }

  return (
    <section className="form">
      <Fade direction="up" duration="2000">
        <div className="column-center center">
          <h4 className="black"> <span className="outlined border-black">Стройте с нами</span></h4>
          <p className="description black bottom-margin">
            Пожалуйста, <span className="orange">заполните форму.</span> Наши менеджеры скоро свяжутся с вами.
          </p>
        </div>
        <form method="POST" onSubmit={handleSubmit}>
          <div className="form-block">
            <input className="input" placeholder="Ваше имя" id="name" type="text" name="name" required />
            <ValidationError prefix="Name" field="name" errors={state.errors} />
          </div>

          <div className="form-block">
            <input className="input" placeholder="Ваш номер телефона" id="phone" type="tel" name="phone" required />
            <ValidationError prefix="Phone" field="phone" errors={state.errors} />
          </div>

          <div className="form-block">
            <input className="input" placeholder="Ваш email" id="email" type="email" name="email" required />
            <ValidationError prefix="Email" field="email" errors={state.errors} />
          </div>

          <div className="form-block">
            <textarea className="input textarea" placeholder="Напишите сообщение..." id="message" name="message" required></textarea>
            <ValidationError prefix="Message" field="message" errors={state.errors} />
          </div>
          
          <div className="center btn-margin">
            <button className="cta" type="submit" disabled={state.submitting}>
              Отправить
            </button>
          </div>
          
          <div>
            <Checkbox {...label} color="secondary" />
            <span className="private-policy">
              Нажимая кнопку "Отправить" вы соглашаетесь с{' '}
              <Link to="/privacy">
                <span className="privacy-link">Политикой конфиденциальности</span>
              </Link>
            </span>
          </div>
        </form>
      </Fade>
    </section>
  );
};