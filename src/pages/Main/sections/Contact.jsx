import { useRef, useState } from 'react';
import { Mail, Phone, MapPin, Globe, Send } from 'lucide-react';
import { useReveal } from '../../../hooks/useReveal';

const FIELDS = [
  { name: 'name', label: 'Full Name', type: 'text', minLength: 2 },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'subject', label: 'Subject', type: 'text', minLength: 3 },
];

export default function Contact() {
  const [headRef, headIn] = useReveal();
  const [infoRef, infoIn] = useReveal();
  const [formRef, formIn] = useReveal();
  const formEl = useRef(null);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const form = formEl.current;
    let ok = true;
    const nextErrors = {};

    form.querySelectorAll('.field').forEach(f => {
      const input = f.querySelector('input, textarea');
      f.classList.remove('invalid');
      if (!input.checkValidity()) {
        ok = false;
        f.classList.add('invalid');
        if (input.validity.valueMissing) nextErrors[input.name] = 'This field is required.';
        else if (input.validity.typeMismatch) nextErrors[input.name] = 'Please enter a valid email.';
        else if (input.validity.tooShort) nextErrors[input.name] = `Minimum ${input.minLength} characters.`;
      }
    });

    setErrors(nextErrors);
    if (!ok) return;

    setShowSuccess(true);
    form.reset();
    setTimeout(() => setShowSuccess(false), 5000);
  }

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className={`section-head reveal${headIn ? ' in' : ''}`} ref={headRef}>
          <span className="eyebrow">Contact</span>
          <h2>Let's build something <span className="gradient-text">great</span></h2>
          <p>Have a project in mind? I'd love to hear about it.</p>
        </div>
        <div className="contact-grid">
          <div className={`contact-info reveal${infoIn ? ' in' : ''}`} ref={infoRef}>
            <div className="ci">
              <div className="ci-icon"><Mail size={20} strokeWidth={2} /></div>
              <div>
                <div className="ci-label">Email</div>
                <div><a href="mailto:occ.antiquina.joneejohn@gmail.com">occ.antiquina.joneejohn@gmail.com</a></div>
              </div>
            </div>
            <div className="ci">
              <div className="ci-icon"><Phone size={20} strokeWidth={2} /></div>
              <div>
                <div className="ci-label">Phone</div>
                <div><a href="tel:+639496600923">+63 949 660 0923</a></div>
              </div>
            </div>
            <div className="ci">
              <div className="ci-icon"><MapPin size={20} strokeWidth={2} /></div>
              <div>
                <div className="ci-label">Location</div>
                <div>Brgy. Iponan Zone 1C Kinasanghan, CDO City, Misamis Oriental, Philippines</div>
              </div>
            </div>
            <div className="ci">
              <div className="ci-icon"><Globe size={20} strokeWidth={2} /></div>
              <div>
                <div className="ci-label">ATMS System</div>
                <div><a href="https://alumni.occph.com" target="_blank" rel="noopener noreferrer">alumni.occph.com</a></div>
              </div>
            </div>
            <div className="ci-socials">
              <a href="https://github.com/javiernarn" target="_blank" rel="noopener noreferrer" aria-label="GitHub">GH</a>
              <a href="https://www.facebook.com/EphemeralKun/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">FB</a>
              <a href="mailto:occ.antiquina.joneejohn@gmail.com" aria-label="Email">EM</a>
            </div>
          </div>

          <form
            className={`contact-form reveal${formIn ? ' in' : ''}`}
            id="contactForm"
            ref={formEl}
            noValidate
            onSubmit={handleSubmit}
          >
            {FIELDS.map(f => (
              <div className="field" key={f.name}>
                <label>{f.label}</label>
                <input type={f.type} name={f.name} required minLength={f.minLength} />
                <span className="err">{errors[f.name] || ''}</span>
              </div>
            ))}
            <div className="field">
              <label>Message</label>
              <textarea name="message" rows="5" required minLength={10}></textarea>
              <span className="err">{errors.message || ''}</span>
            </div>
            <button className="btn btn-primary" type="submit">
              Send Message
              <Send size={18} strokeWidth={2} />
            </button>
            <div className={`form-success${showSuccess ? ' show' : ''}`} id="formSuccess">
              ✓ Message sent — I'll get back within 24 hours.
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
