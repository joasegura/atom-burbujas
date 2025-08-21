import React from 'react';

const QuienesSomos = () => {
  return (
    <>
      <main className="quienes-somos">
        <div className="quienes-somos-container">
          <h1 className="quienes-somos-title">Quienes Somos</h1>
          <div className="quienes-somos-content">
            <div className="quienes-somos-section">
              <h2 className="section-title">Nuestra Historia</h2>
              <p className="section-text">
                En ATOM Soluciones IT creemos que la tecnología no es solo una herramienta, sino un motor de transformación que impulsa el crecimiento y la evolución de las organizaciones.
              </p>
              <p className="section-text">
                Somos una empresa joven, dinámica y en constante expansión, fundada con el propósito de acompañar a instituciones educativas, empresas, comercios y entidades públicas en el desafío de adaptarse a un mundo cada vez más digital.
              </p>
              <p className="section-text">
                Nuestro equipo está conformado por profesionales apasionados por la innovación, que combinan experiencia en desarrollo de software, infraestructura tecnológica y diseño web para ofrecer soluciones integrales. Entendemos que cada cliente es único y, por eso, trabajamos con una visión personalizada, orientada a generar resultados reales y sostenibles en el tiempo.
              </p>
            </div>

            <div className="quienes-somos-section">
              <h2 className="section-title">Nuestra Misión</h2>
              <p className="section-text">
                Desde nuestros inicios nos propusimos un objetivo claro: hacer que la tecnología trabaje para las personas y no al revés. Bajo esta premisa, construimos soluciones que no solo resuelven necesidades actuales, sino que también preparan a las organizaciones para los desafíos futuros.
              </p>
              <p className="section-text">
                En ATOM valoramos la confianza, la transparencia y la cercanía. Nos esforzamos por establecer relaciones duraderas con nuestros clientes, basadas en el compromiso y la excelencia en cada proyecto que emprendemos.
              </p>
              <p className="section-text">
                Creemos que la verdadera innovación ocurre cuando la tecnología se integra de manera estratégica en los procesos diarios, potenciando la eficiencia, mejorando la experiencia de los usuarios y abriendo nuevas oportunidades de crecimiento.
              </p>
            </div>

            <div className="quienes-somos-section">
              <h2 className="section-title">Nuestro Compromiso</h2>
              <p className="section-text">
                Hoy, ATOM Soluciones IT se consolida como un aliado estratégico para quienes buscan evolucionar, crecer y diferenciarse en un mercado cada vez más competitivo. Nuestra misión es clara: ser el puente entre la tecnología y las personas, ofreciendo soluciones que generen valor, impacto y sostenibilidad.
              </p>
            </div>

            <div className="quienes-somos-section">
              <h2 className="section-title">Nuestros Valores</h2>
              <div className="valores-grid">
                <div className="valor-item">
                  <h3 className="valor-title">Innovación</h3>
                  <p className="valor-text">Siempre buscamos las mejores soluciones</p>
                </div>
                <div className="valor-item">
                  <h3 className="valor-title">Calidad</h3>
                  <p className="valor-text">Excellencia en cada proyecto</p>
                </div>
                <div className="valor-item">
                  <h3 className="valor-title">Confianza</h3>
                  <p className="valor-text">Construimos relaciones duraderas</p>
                </div>
                <div className="valor-item">
                  <h3 className="valor-title">Pasión</h3>
                  <p className="valor-text">Amamos lo que hacemos</p>
                </div>
              </div>
            </div>
          </div>

          <div className="quienes-somos-cta">
            <a 
              className="cta" 
              href="https://calendar.app.google/GgJ8qUBQSrNkVJ7C6?fbclid=PAZXh0bgNhZW0CMTEAAafZKaOq5-yH-QqhJ6SP-bWujLAn5GrG1HzSPnnIqgPeOXcw9xMVAnysoGJ6Ww_aem_Q8d7V-NaIgZh5FQ0s2APvA" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Agenda una call"
            >
              Conoce más sobre nosotros
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

export default QuienesSomos;
