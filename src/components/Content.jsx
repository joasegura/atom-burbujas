import React from 'react';
import { useTypewriter } from '../hooks/useTypewriter';

const Content = () => {
  const typewriterText = useTypewriter('atom.');

  return (
    <main className="content">
      <h1 className="typewriter" aria-label="atom.">{typewriterText}</h1>
      <a className="cta" href="#" aria-label="Agenda una call">Agenda una call</a>
    </main>
  );
};

export default Content;
