import React, { useState, useRef, useEffect, useCallback } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-javascript';
import ResizeObserver from 'resize-observer-polyfill';
import './code.css';

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const VsCode = () => {
  const [code, setCode] = useState('');
  const codeRef = useRef(null);

  const handleChange = (event) => {
    setCode(event.target.value);
  };

  const highlightCode = useCallback(debounce(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, 300), []);

  useEffect(() => {
    highlightCode();
  }, [code, highlightCode]);

  useEffect(() => {
    if (!codeRef.current) return;

    const ro = new ResizeObserver(debounce(() => {
      highlightCode();
    }, 300));

    ro.observe(codeRef.current);

    return () => {
      ro.disconnect();
    };
  }, [highlightCode]);

  return (
    <div className="code-editor">
      <textarea
        value={code}
        onChange={handleChange}
        className="code-input"
        spellCheck="false"
      />
      <pre className="code-output">
        <code
          ref={codeRef}
          className="language-javascript"
        >
          {code}
        </code>
      </pre>
    </div>
  );
};

export default VsCode;
