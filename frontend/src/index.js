import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ModelForm from './ModelForm';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <h1>Ancient Greek Syntax Analyzer</h1>
    <p>Welcome to our analyzer. Here you can parse the parts of speech (POS) and the syntactic relationships of 
        any ancient Greek sentence. This analysis is done by our language models trained with transformers and 
        the NLP library spaCy. Below, you can choose which model do you want to use (each model may produce a different 
        analysis). Documentation about the linguistic terms used by our models to annotate your sentences can be found here.
        If you have any questions, please contact us at <a href="mailto:diogenet@ucsd.edu">diogenet@ucsd.edu</a>.
    </p>
    <ModelForm />
  </React.StrictMode>
);
