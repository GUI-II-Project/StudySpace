import React, { useRef, useState, useEffect } from 'react';
import NavBar from '../components/NavBar.js';
import ToolBar from '../components/ToolBar.js';
import Document from '../components/Document.js';

function NotesPage() {
    const documentRef = useRef();

    // tracks if the bold, italic, and underline buttons are active
    const [activeFormats, setActiveFormats] = useState({
        bold: false,
        italic: false,
        underline: false
    });

    // changes the format at current selection based on button pressed
    const handleFormat = (command) => {
        document.execCommand(command, false, null);
        updateActiveFormats();
    };

    // checks if the format buttons are active and updates the state
    const updateActiveFormats = () => {
        const newFormats = {
            bold: document.queryCommandState('bold'),
            italic: document.queryCommandState('italic'),
            underline: document.queryCommandState('underline')
        };
        setActiveFormats(newFormats);
    };

    // generally keeps the document and toolbar components synched
    useEffect(() => {
        const document = documentRef.current; // gets document DOM reference

        // checks which formates are active
        const handleSelectionChange = () => {
            updateActiveFormats();
        };
        // checks which formates are active
        const handleKeyUp = () => {
            updateActiveFormats();
        };

        // listens for any slection change within the document. clicking, moving cursor, ect.
        document.addEventListener('selectionchange', handleSelectionChange);
        // checks specifically for keyup events
        if (document) {
            document.addEventListener('keyup', handleKeyUp);
        }

        // just removes listeners at the end
        return () => {
            document.removeEventListener('selectionchange', handleSelectionChange);
            if (document) {
                document.removeEventListener('keyup', handleKeyUp);
            }
        };
    }, []);

    return (
        <div>
            <NavBar />
            <ToolBar onFormat={handleFormat} activeFormats={activeFormats}/>
            <Document documentRef={documentRef}/>
        </div>
    );
}

export default NotesPage
