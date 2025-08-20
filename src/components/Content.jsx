import React from 'react';
import { useTypewriter } from '../hooks/useTypewriter';

const Content = () => {
  const typewriterText = useTypewriter('atom.');

  return (
    <>
      <main className="content">
        <h1 className="typewriter" aria-label="atom.">{typewriterText}</h1>
        <a className="cta" href="https://l.instagram.com/?u=https%3A%2F%2Fcalendar.app.google%2FGgJ8qUBQSrNkVJ7C6%3Ffbclid%3DPAZXh0bgNhZW0CMTEAAafZKaOq5-yH-QqhJ6SP-bWujLAn5GrG1HzSPnnIqgPeOXcw9xMVAnysoGJ6Ww_aem_Q8d7V-NaIgZh5FQ0s2APvA&e=AT2cNzacl1C96rt8fvhwyGD_Q_aels1kTFuu5TI2f5JyrkcGSOuPtkxifJSIwl_gPoW4D42uu0vF5EYb5Io5ZNxxIAxMPRX5YLqN89o" target="_blank" rel="noopener noreferrer" aria-label="Agenda una call">Agenda una call</a>
      </main>
      
      <footer className="footer">
        <div className="footer-content">
          <a 
            href="https://www.instagram.com/atomsolucionesit/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="footer-link"
            aria-label="Síguenos en Instagram"
          >
            @atomsolucionesit
          </a>
          <span className="footer-separator">•</span>
          <a 
            href="mailto:info@atomsolucionesit.com.ar" 
            className="footer-link"
            aria-label="Envíanos un email"
          >
            info@atomsolucionesit.com.ar
          </a>
        </div>
      </footer>
    </>
  );
};

export default Content;
