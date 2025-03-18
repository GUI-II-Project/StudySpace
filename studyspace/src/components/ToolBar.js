import '../notes.css';
import React from 'react';

class ToolBar extends React.Component {
    render() {
        const { onFormat, activeFormats } = this.props;
        return (
            <div className='format-bar d-flex align-items-center justify-content-center'>
                <div className='format-buttons m-0 px-2 d-flex align-items-center justify-content-center'>
                    <button class='tool' type='button' data-bs-toggle='dropdown' aria-expanded='false' >
                        <i class='bi bi-plus-circle'></i></button>
                    <ul className='dropdown-menu'>
                        <li><button className='dropdown-item'><u>New Note</u></button></li>
                    </ul>
                    <button class='tool'><i class='bi bi-download'></i></button>
                    <button class='tool' onClick={() => onFormat('undo')} onMouseDown={(e) => e.preventDefault()}>
                        <i class='bi bi-arrow-counterclockwise'></i></button>
                    <button class='tool' onClick={() => onFormat('redo')} onMouseDown={(e) => e.preventDefault()}>
                        <i class='bi bi-arrow-clockwise'></i></button>
                    <input type='text' placeholder='Times New...'></input>
                    <button className={`tool ${activeFormats.bold ? 'active' : ''}`} onClick={() => onFormat('bold')} onMouseDown={(e) => e.preventDefault()}>
                        <i class='bi bi-type-bold'></i></button>
                    <button className={`tool ${activeFormats.italic ? 'active' : ''}`} onClick={() => onFormat('italic')} onMouseDown={(e) => e.preventDefault()}>
                        <i class='bi bi-type-italic'></i></button>
                    <button className={`tool ${activeFormats.underline ? 'active' : ''}`} onClick={() => onFormat('underline')} onMouseDown={(e) => e.preventDefault()}>
                        <i class='bi bi-type-underline'></i></button>
                    <button class='tool'>A</button>
                    <div id='size'>
                        <button class='tool'><i class='bi bi-dash'></i></button>
                        <input type='numeric' value='10' ></input>
                        <button class='tool'><i class='bi bi-plus'></i></button>
                    </div>
                    <button class='tool' onClick={() => onFormat('justifyLeft')} onMouseDown={(e) => e.preventDefault()}>
                        <i class='bi bi-text-left'></i></button>
                    <button class='tool' onClick={() => onFormat('justifyCenter')} onMouseDown={(e) => e.preventDefault()}>
                        <i class='bi bi-text-center'></i></button>
                    <button class='tool' onClick={() => onFormat('justifyRight')} onMouseDown={(e) => e.preventDefault()}>
                        <i class='bi bi-text-right'></i></button>
                    <button class='tool' onClick={() => onFormat('insertUnorderedList')} onMouseDown={(e) => e.preventDefault()}>
                        <i class='bi bi-list-ul'></i></button>
                    <button class='tool' onClick={() => onFormat('insertOrderedList')} onMouseDown={(e) => e.preventDefault()}>
                        <i class='bi bi-list-ol'></i></button>
                </div>
            </div>
        );
    }
}

export default ToolBar;
