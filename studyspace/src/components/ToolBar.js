import '../notes.css';
import React from 'react';

class ToolBar extends React.Component {
    render() {
        const { onFormat, activeFormats } = this.props;
        return (
            <div className='format-bar d-flex align-items-center justify-content-center'>
                <div className='format-buttons m-0 px-2 d-flex align-items-center justify-content-center'>
                    <button class='tool' type='button' data-bs-toggle='dropdown' aria-expanded='false' >
                        <span class='bi bi-plus-circle'></span></button>
                    <ul className='dropdown-menu'>
                        <li><button className='dropdown-item'><u>New Note</u></button></li>
                    </ul>
                    <button class='tool'><span class='bi bi-download'></span></button>
                    <button class='tool' onClick={() => onFormat('undo')} onMouseDown={(e) => e.preventDefault()}>
                        <span class='bi bi-arrow-counterclockwise'></span></button>
                    <button class='tool' onClick={() => onFormat('redo')} onMouseDown={(e) => e.preventDefault()}>
                        <span class='bi bi-arrow-clockwise'></span></button>
                    <input type='text' placeholder='Times New...'></input>
                    <button className={`tool ${activeFormats.bold ? 'active' : ''}`} onClick={() => onFormat('bold')} onMouseDown={(e) => e.preventDefault()}>
                        <span class='bi bi-type-bold'></span></button>
                    <button className={`tool ${activeFormats.italic ? 'active' : ''}`} onClick={() => onFormat('italic')} onMouseDown={(e) => e.preventDefault()}>
                        <span class='bi bi-type-italic'></span></button>
                    <button className={`tool ${activeFormats.underline ? 'active' : ''}`} onClick={() => onFormat('underline')} onMouseDown={(e) => e.preventDefault()}>
                        <span class='bi bi-type-underline'></span></button>
                    <button class='tool'>A</button>
                    <div id='size'>
                        <button class='tool'><span class='bi bi-dash'></span></button>
                        <input type='numeric' value='10' ></input>
                        <button class='tool'><span class='bi bi-plus'></span></button>
                    </div>
                    <button class='tool' onClick={() => onFormat('justifyLeft')} onMouseDown={(e) => e.preventDefault()}>
                        <span class='bi bi-text-left'></span></button>
                    <button class='tool' onClick={() => onFormat('justifyCenter')} onMouseDown={(e) => e.preventDefault()}>
                        <span class='bi bi-text-center'></span></button>
                    <button class='tool' onClick={() => onFormat('justifyRight')} onMouseDown={(e) => e.preventDefault()}>
                        <span class='bi bi-text-right'></span></button>
                    <button class='tool' onClick={() => onFormat('insertUnorderedList')} onMouseDown={(e) => e.preventDefault()}>
                        <span class='bi bi-list-ul'></span></button>
                    <button class='tool' onClick={() => onFormat('insertOrderedList')} onMouseDown={(e) => e.preventDefault()}>
                        <span class='bi bi-list-ol'></span></button>
                </div>
            </div>
        );
    }
}

export default ToolBar;
