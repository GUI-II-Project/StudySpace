import '../notes.css';
import React from 'react';

class Document extends React.Component {
    render() {
        return (
            <div contentEditable="true" class="editor"></div>
        );
    }
}

export default Document;