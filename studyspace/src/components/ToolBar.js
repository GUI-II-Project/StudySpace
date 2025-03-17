import '../notes.css';
import React from 'react';

class ToolBar extends React.Component {
    render() {
        return (
            <div className='format-bar d-flex align-items-center justify-content-center'>
                <ul className='format-buttons m-0 px-2 d-flex align-items-center justify-content-center'>
                    <div></div>
                    <button ><i class="bi bi-plus-circle"></i></button>
                    <button><i class="bi bi-download"></i></button>
                    <button><i class="bi bi-arrow-counterclockwise"></i></button>
                    <button><i class="bi bi-arrow-clockwise"></i></button>
                    <input type='text' placeholder='Times New...'></input>
                    <button><i class="bi bi-type-bold"></i></button>
                    <button><i class="bi bi-type-italic"></i></button>
                    <button><i class="bi bi-type-underline"></i></button>
                    <button>A</button>
                    <div id="size">
                        <button><i class="bi bi-dash"></i></button>
                        <input type="numeric" value="10" ></input>
                        <button><i class="bi bi-plus"></i></button>
                    </div>
                    <button><i class="bi bi-text-left"></i></button>
                    <button><i class="bi bi-text-center"></i></button>
                    <button><i class="bi bi-text-right"></i></button>
                    <button><i class="bi bi-list-ul"></i></button>
                    <button><i class="bi bi-list-ol"></i></button>
                </ul>
            </div>
        );
    }
}

export default ToolBar;
