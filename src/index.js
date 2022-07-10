const React = require('react');
const {createRoot} = require('react-dom/client');
const App = require('./App.js');
const root = createRoot(document.getElementById('root'));

root.render(<App/>);
