import React, { useState } from 'react';
import { symptomCheck } from '../services/api';

export default function SymptomChecker() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await symptomCheck(text);
      setResult(data);
    } catch (err) {
      console.error(err);
      alert('AI error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>AI Symptom Checker</h2>
      <form onSubmit={onSubmit}>
        <textarea value={text} onChange={e => setText(e.target.value)} />
        <button disabled={loading}>Check</button>
      </form>
      {result && (
        <div>
          <h3>AI Response</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
