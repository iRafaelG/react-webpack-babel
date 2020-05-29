import React from 'react';
import ReactDom from 'react-dom';

import App from "./components/App";

let headings = ['When', 'Who', 'Description']

ReactDom.render(<App title={'OpenLibrary'}
    headings={headings}/>,
    document.getElementById('app'));