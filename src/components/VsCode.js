import React, { useState, useRef, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-javascript';
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

  const highlightCode = debounce(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, 300);

  
  useEffect(() => {
    highlightCode();
  }, [code,highlightCode]);

  useEffect(() => {
    const ro = new ResizeObserver(() => {
      highlightCode();
    });

    if (codeRef.current) {
      ro.observe(codeRef.current);
    }
    let o = codeRef.current
    return () => {
      if (o) {
        
        ro.unobserve(o);
      }
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
