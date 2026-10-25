import { useEffect, useState } from 'react';
import { ArrowUpRight, CheckCircle2, CircleAlert, Info, LoaderCircle, Send } from 'lucide-react';
import { BUSINESS, SERVICES } from '../data';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  service: '',
  details: '',
};

function createWhatsAppUrl(form) {
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

  return `${BUSINESS.whatsapp}?text=${encodeURIComponent(message)}`;
}

export default function ContactForm({ selectedService }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submission, setSubmission] = useState({ status: 'idle', message: '' });
  const [fallbackUrl, setFallbackUrl] = useState('');
  const isSubmitting = submission.status === 'submitting';

  useEffect(() => {
    if (selectedService) {
      setForm((current) => ({ ...current, service: selectedService }));
      setErrors((current) => ({ ...current, service: undefined }));
      setSubmission({ status: 'idle', message: '' });
      setFallbackUrl('');
    }
  }, [selectedService]);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    setSubmission({ status: 'idle', message: '' });
    setFallbackUrl('');
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    const nextErrors = validate();
    setErrors(nextErrors);
    setSubmission({ status: 'idle', message: '' });
    setFallbackUrl('');

    if (Object.keys(nextErrors).length > 0) {
      const firstField = Object.keys(nextErrors)[0];
      document.getElementById(`contact-${firstField}`)?.focus();
      return;
    }

    const submittedForm = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      service: form.service,
      details: form.details.trim(),
    };
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    setSubmission({ status: 'submitting', message: 'Sending your message…' });

    try {
      const response = await fetch(BUSINESS.formspreeEndpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: submittedForm.name,
          email: submittedForm.email,
          phone: submittedForm.phone || 'Not provided',
          service: submittedForm.service,
          project_details: submittedForm.details,
          _subject: `New AdFah Tech website enquiry — ${submittedForm.service}`,
        }),
        signal: controller.signal,
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        const serviceMessage =
          result.errors?.map((item) => item.message).filter(Boolean).join(' ') ||
          result.error ||
          `The service returned an error (${response.status}).`;
        throw new Error(serviceMessage);
      }

      setForm(initialForm);
      setErrors({});
      setSubmission({
        status: 'success',
        message: 'Thank you! Formspree has accepted your message for delivery to AdFah Tech.',
      });
    } catch (error) {
      let reason = 'Please check your internet connection and try again.';
      if (error.name === 'AbortError') {
        reason = 'The request timed out. Please check your connection and try again.';
      } else if (!(error instanceof TypeError) && error.message) {
        reason = `Formspree could not accept the submission: ${error.message}`;
      }
      setSubmission({ status: 'error', message: `Your message was not sent. ${reason}` });
      setFallbackUrl(createWhatsAppUrl(submittedForm));
    } finally {
      window.clearTimeout(timeout);
    }
  };

  const fieldProps = (name) => ({
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `contact-${name}-error` : undefined,
  });

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate aria-busy={isSubmitting}>
      <div className="contact-form__heading">
        <span>PROJECT ENQUIRY</span>
        <h3>Tell us about your idea</h3>
        <p>Complete the fields below and send your enquiry directly.</p>
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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
            required
            {...fieldProps('details')}
          />
          {errors.details && <span className="form-field__error" id="contact-details-error">{errors.details}</span>}
        </div>
      </div>

      <div className="form-notice">
        <Info size={19} aria-hidden="true" />
        <p>
          Your details are sent to <strong>Formspree</strong> for delivery to AdFah Tech. A success
          confirmation appears only after Formspree accepts the submission. WhatsApp and email remain
          available as alternative contact options.
        </p>
      </div>

      <button type="submit" className="button button--primary contact-form__submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>Sending Message… <LoaderCircle className="spinner" size={18} aria-hidden="true" /></>
        ) : (
          <>Send Message <Send size={18} aria-hidden="true" /></>
        )}
      </button>

      {submission.status === 'success' && (
        <div className="form-status form-status--success" role="status">
          <CheckCircle2 size={20} aria-hidden="true" />
          <p>{submission.message}</p>
        </div>
      )}

      {submission.status === 'error' && (
        <div className="form-status form-status--error" role="alert">
          <CircleAlert size={20} aria-hidden="true" />
          <div>
            <p>{submission.message}</p>
            {fallbackUrl && (
              <a href={fallbackUrl} target="_blank" rel="noreferrer">
                Send this enquiry via WhatsApp instead <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      )}
    </form>
  );
}
