import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './bootstrap/bootstrap.min.css';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App/>,
    document.getElementById('root')
);
registerServiceWorker();
