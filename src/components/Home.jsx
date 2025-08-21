import React from 'react';
import { useTypewriter } from '../hooks/useTypewriter';

const Home = () => {
  const typewriterText = useTypewriter('atom.');

  return (
    <>
      <main className="content">
        <h1 className="typewriter" aria-label="atom.">{typewriterText}</h1>
        <a className="cta" href="https://calendar.app.google/GgJ8qUBQSrNkVJ7C6?fbclid=PAZXh0bgNhZW0CMTEAAafZKaOq5-yH-QqhJ6SP-bWujLAn5GrG1HzSPnnIqgPeOXcw9xMVAnysoGJ6Ww_aem_Q8d7V-NaIgZh5FQ0s2APvA" target="_blank" rel="noopener noreferrer" aria-label="Agenda una call">Agenda una call</a>
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

export default Home;
