import { useEffect, useState } from 'react';
import { ArrowUpRight, Info, Send } from 'lucide-react';
import { BUSINESS, SERVICES } from '../data';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  service: '',
  details: '',
};

export default function ContactForm({ selectedService }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [preparedUrl, setPreparedUrl] = useState('');

  useEffect(() => {
    if (selectedService) {
      setForm((current) => ({ ...current, service: selectedService }));
      setErrors((current) => ({ ...current, service: undefined }));
    }
  }, [selectedService]);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    setPreparedUrl('');
  };

  const validate = () => {
    const nextErrors = {};
    if (form.name.trim().length < 2) nextErrors.name = 'Please enter your full name.';
    if (!form.email.trim()) {
      nextErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (form.phone.trim() && form.phone.replace(/\D/g, '').length < 7) {
      nextErrors.phone = 'Please enter a valid phone number or leave this field blank.';
    }
    if (!form.service) nextErrors.service = 'Please select a service.';
    if (form.details.trim().length < 10) {
      nextErrors.details = 'Please share at least 10 characters about your project.';
    }
    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    setPreparedUrl('');

    if (Object.keys(nextErrors).length > 0) {
      const firstField = Object.keys(nextErrors)[0];
      document.getElementById(`contact-${firstField}`)?.focus();
      return;
    }

    const message = [
      `Hello ${BUSINESS.name},`,
      '',
      `My name is ${form.name.trim()}.`,
      `Service required: ${form.service}`,
      `Email: ${form.email.trim()}`,
      `Phone: ${form.phone.trim() || 'Not provided'}`,
      '',
      'Project details:',
      form.details.trim(),
      '',
      'Please let me know the next steps. Thank you.',
    ].join('\n');

    const url = `${BUSINESS.whatsapp}?text=${encodeURIComponent(message)}`;
    setPreparedUrl(url);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const fieldProps = (name) => ({
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `contact-${name}-error` : undefined,
  });

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="contact-form__heading">
        <span>PROJECT ENQUIRY</span>
        <h3>Tell us about your idea</h3>
        <p>Complete the fields below and continue through WhatsApp.</p>
      </div>

      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="contact-name">Full Name <span aria-hidden="true">*</span></label>
          <input
            id="contact-name"
            name="name"
            type="text"
            value={form.name}
            onChange={updateField}
            autoComplete="name"
            placeholder="Your full name"
            maxLength="100"
            required
            {...fieldProps('name')}
          />
          {errors.name && <span className="form-field__error" id="contact-name-error">{errors.name}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="contact-email">Email Address <span aria-hidden="true">*</span></label>
          <input
            id="contact-email"
            name="email"
            type="email"
            inputMode="email"
            value={form.email}
            onChange={updateField}
            autoComplete="email"
            placeholder="you@example.com"
            maxLength="254"
            required
            {...fieldProps('email')}
          />
          {errors.email && <span className="form-field__error" id="contact-email-error">{errors.email}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="contact-phone">Phone Number <small>(optional)</small></label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            value={form.phone}
            onChange={updateField}
            autoComplete="tel"
            placeholder="Your phone number"
            maxLength="30"
            {...fieldProps('phone')}
          />
          {errors.phone && <span className="form-field__error" id="contact-phone-error">{errors.phone}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="contact-service">Service Required <span aria-hidden="true">*</span></label>
          <select
            id="contact-service"
            name="service"
            value={form.service}
            onChange={updateField}
            required
            {...fieldProps('service')}
          >
            <option value="">Select a service</option>
            {SERVICES.map((service) => (
              <option key={service.title} value={service.title}>{service.title}</option>
            ))}
            <option value="Not sure yet">Not sure yet — help me choose</option>
          </select>
          {errors.service && <span className="form-field__error" id="contact-service-error">{errors.service}</span>}
        </div>

        <div className="form-field form-field--full">
          <label htmlFor="contact-details">Project Details <span aria-hidden="true">*</span></label>
          <textarea
            id="contact-details"
            name="details"
            value={form.details}
            onChange={updateField}
            placeholder="Tell us what you would like to build, your goals, and any useful details..."
            rows="5"
            maxLength="2000"
            required
            {...fieldProps('details')}
          />
          {errors.details && <span className="form-field__error" id="contact-details-error">{errors.details}</span>}
        </div>
      </div>

      <div className="form-notice">
        <Info size={19} aria-hidden="true" />
        <p>
          Direct form delivery requires backend configuration, which is not connected in this version.
          The button below prepares a WhatsApp message instead. Nothing is stored on this website, and
          your message is not delivered until you tap <strong>Send</strong> in WhatsApp.
        </p>
      </div>

      <button type="submit" className="button button--primary contact-form__submit">
        Send Message <Send size={18} aria-hidden="true" />
      </button>

      {preparedUrl && (
        <div className="form-status" role="status">
          <p>Your message is ready, but it has not been sent. Continue in WhatsApp and tap Send.</p>
          <a href={preparedUrl} target="_blank" rel="noreferrer">
            Continue to WhatsApp <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      )}
    </form>
  );
}
