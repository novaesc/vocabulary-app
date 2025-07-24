import React, { useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState(null);
  const [error, setError] = useState(null);

  const fetchDefinition = async () => {
    if (!word) return;
    setError(null);
    setDefinition(null);
    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      if (!res.ok) throw new Error('Word not found');
      const data = await res.json();
      setDefinition(data[0]);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light py-5">
      <div className="w-100" style={{ maxWidth: '500px' }}>
        <div className="text-center mb-4">
          <h1 className="mb-1">WordTap</h1>
          <p className="text-muted text-uppercase" style={{ fontSize: '1.1rem' }}>
            words worth knowing
          </p>
        </div>

        <div className="search-bar mb-4 d-flex align-items-center">
          <span className="search-icon px-3">
            <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: '#ffffff' }} />
          </span>
          <input
            type="text"
            className="form-control border-0 bg-transparent text-white shadow-none"
            placeholder="Search"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchDefinition()}
            style={{ backgroundColor: 'transparent' }}
          />
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {definition && (
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="card-title">{definition.word}</h4>

              {definition.phonetics[0]?.audio && (
                <audio controls className="my-2 w-100">
                  <source src={definition.phonetics[0].audio} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              )}

              {definition.meanings.map((meaning, idx) => (
                <div key={idx} className="mb-3">
                  <h6>{meaning.partOfSpeech}</h6>
                  <ul>
                    {meaning.definitions.map((def, i) => (
                      <li key={i}>{def.definition}</li>
                    ))}
                  </ul>
                  {meaning.synonyms && meaning.synonyms.length > 0 && (
                    <p>
                      <strong>Synonyms:</strong> {meaning.synonyms.slice(0, 5).join(', ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <footer className="text-center mt-5 small text-muted">
          <p className="mb-1">Built by Francesca Valentini</p>
          <div>
            <a
              href="https://github.com/novaesc"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-2 text-decoration-none text-muted"
            >
              GitHub
            </a>
            |
            <a
              href="https://www.linkedin.com/in/francesca-valentini-dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-2 text-decoration-none text-muted"
            >
              LinkedIn
            </a>
            |
            <a
              href="https://app.netlify.com/teams/novaesc/projects"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-2 text-decoration-none text-muted"
            >
              Netlify
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
