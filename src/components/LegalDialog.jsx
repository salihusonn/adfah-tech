import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export default function LegalDialog({ type, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    return () => dialog?.close();
  }, []);

  const privacy = type === 'privacy';

  return (
    <dialog
      ref={dialogRef}
      className="legal-dialog"
      aria-labelledby="legal-dialog-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="legal-dialog__content">
        <button type="button" className="legal-dialog__close" onClick={onClose} aria-label="Close dialog">
          <X size={22} aria-hidden="true" />
        </button>
        <span className="section-heading__eyebrow">ADFAH TECH</span>
        <h2 id="legal-dialog-title">{privacy ? 'Privacy Policy' : 'Terms & Conditions'}</h2>
        <p className="legal-dialog__updated">Website policy overview — October 2026</p>

        {privacy ? (
          <>
            <h3>Contact information</h3>
            <p>
              When you submit the contact form, the details you enter are transmitted to Formspree for
              processing and delivery to AdFah Tech. This may include your name, email address, optional
              phone number, requested service, and project details. Please do not include passwords,
              payment details, or other sensitive information in your enquiry.
            </p>
            <h3>External services</h3>
            <p>
              Formspree processes form submissions according to its own privacy policy and may retain
              submissions in the connected Formspree account. Phone, email, and WhatsApp links open the
              relevant application or service, which also has its own privacy policy. No analytics or
              advertising cookies are used by this website version.
            </p>
            <h3>Your choices</h3>
            <p>
              You can contact AdFah Tech directly at <a href="mailto:aadamsalihu34@gmail.com">aadamsalihu34@gmail.com</a> or
              <a href="tel:09028149646"> 09028149646</a> with a privacy-related question.
            </p>
          </>
        ) : (
          <>
            <h3>Website information</h3>
            <p>
              This website introduces AdFah Tech’s digital services. Project scope, pricing, timing,
              and deliverables must be discussed and agreed directly before any project begins.
            </p>
            <h3>Examples and placeholders</h3>
            <p>
              Portfolio cards show example project categories, not completed client projects.
              Testimonial slides are placeholders, not customer reviews. Neither should be understood
              as a claim of previous work or client endorsement.
            </p>
            <h3>Service enquiries</h3>
            <p>
              Sending an enquiry does not create a project agreement. Please contact AdFah Tech at
              <a href="mailto:aadamsalihu34@gmail.com"> aadamsalihu34@gmail.com</a> or
              <a href="tel:09028149646"> 09028149646</a> to discuss your requirements.
            </p>
          </>
        )}
      </div>
    </dialog>
  );
}
