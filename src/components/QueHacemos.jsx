import React from 'react';

const QueHacemos = () => {
  return (
    <>
      <main className="content que-hacemos">
        <div className="que-hacemos-container">
          <div className="que-hacemos-content">
            <div className="que-hacemos-section">
              <h2 className="section-title">Desarrollo Web</h2>
              <p className="section-text">
                Creamos sitios web modernos, responsivos y optimizados que 
                convierten visitantes en clientes. Utilizamos las últimas 
                tecnologías para garantizar velocidad y funcionalidad.
              </p>
            </div>

            <div className="que-hacemos-section">
              <h2 className="section-title">Aplicaciones Móviles</h2>
              <p className="section-text">
                Desarrollamos aplicaciones nativas e híbridas para iOS y Android 
                que ofrecen experiencias de usuario excepcionales y resultados 
                medibles para tu negocio.
              </p>
            </div>

            <div className="que-hacemos-section">
              <h2 className="section-title">Soluciones Empresariales</h2>
              <p className="section-text">
                Diseñamos sistemas personalizados que automatizan procesos, 
                mejoran la eficiencia y proporcionan insights valiosos para 
                la toma de decisiones estratégicas.
              </p>
            </div>

            <div className="que-hacemos-section">
              <h2 className="section-title">Consultoría Tecnológica</h2>
              <p className="section-text">
                Asesoramos a empresas en su transformación digital, ayudándolas 
                a identificar oportunidades de mejora y implementar soluciones 
                tecnológicas que impulsen su crecimiento.
              </p>
            </div>
          </div>

          <div className="que-hacemos-cta">
            <a 
              className="cta" 
              href="https://calendar.app.google/GgJ8qUBQSrNkVJ7C6?fbclid=PAZXh0bgNhZW0CMTEAAafZKaOq5-yH-QqhJ6SP-bWujLAn5GrG1HzSPnnIqgPeOXcw9xMVAnysoGJ6Ww_aem_Q8d7V-NaIgZh5FQ0s2APvA" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Agenda una call"
            >
              Solicita tu consulta gratuita
            </a>
          </div>
        </div>
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

export default QueHacemos;
