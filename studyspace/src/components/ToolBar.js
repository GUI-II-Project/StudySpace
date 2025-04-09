import "../css/notes.css";
import React from "react";

class ToolBar extends React.Component {
  handleIncreaseFont = () => {
    const newSize = Math.min(7, Number(this.props.fontSize) + 1).toString();
    this.props.onFontSizeChange(newSize);
  };

  // Decrease the font size value, ensuring it doesn't go below 1
  handleDecreaseFont = () => {
    const newSize = Math.max(1, Number(this.props.fontSize) - 1).toString();
    this.props.onFontSizeChange(newSize);
  };

  render() {
    const {
      onFormat,
      activeFormats,
      fontSize,
      onFontSizeChange,
      fontColor,
      onFontColorChange,
    } = this.props;
    return (
      <div className="format-bar d-flex align-items-center justify-content-center">
        <div className="format-buttons m-0 px-2 d-flex align-items-center justify-content-center">
         {/*  <button
            className="tool"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="bi bi-plus-circle"></i>
          </button>
          <ul className="dropdown-menu">
            <li>
              <button className="dropdown-item">
                <u>New Note</u>
              </button>
            </li>
          </ul> */}
          <button class="tool" onClick={this.props.downloadDocx}>
            <i className="bi bi-download"></i>
          </button>
          <button
            className="tool"
            onClick={() => onFormat("undo")}
            onMouseDown={(e) => e.preventDefault()}
          >
            <i className="bi bi-arrow-counterclockwise"></i>
          </button>
          <button
            className="tool"
            onClick={() => onFormat("redo")}
            onMouseDown={(e) => e.preventDefault()}
          >
            <i className="bi bi-arrow-clockwise"></i>
          </button>
          <select
            value={this.props.selectedFont}
            onChange={(e) => this.props.onFontChange(e.target.value)}
          >
            <option value="Arial">Arial</option>
            <option value="'Times New Roman', Times, serif">
              Times New Roman
            </option>
            <option value="'Courier New'">Courier New</option>
            <option value="Georgia">Georgia</option>
            <option value="Inter">Inter</option>
          </select>
          <button
            className={`tool ${activeFormats.bold ? "active" : ""}`}
            onClick={() => onFormat("bold")}
            onMouseDown={(e) => e.preventDefault()}
          >
            <i className="bi bi-type-bold"></i>
          </button>
          <button
            className={`tool ${activeFormats.italic ? "active" : ""}`}
            onClick={() => onFormat("italic")}
            onMouseDown={(e) => e.preventDefault()}
          >
            <i className="bi bi-type-italic"></i>
          </button>
          <button
            className={`tool ${activeFormats.underline ? "active" : ""}`}
            onClick={() => onFormat("underline")}
            onMouseDown={(e) => e.preventDefault()}
          >
            <i className="bi bi-type-underline"></i>
          </button>
          <input
            type="color"
            className="tool circular"
            value={fontColor}
            onChange={(e) => onFontColorChange(e.target.value)}
            title="Change font color"
          />
          <div id="size">
            <button className="tool" onClick={this.handleDecreaseFont}>
              <i className="bi bi-dash"></i>
            </button>
            <select
              onChange={(e) => onFontSizeChange(e.target.value)}
              value={fontSize}
            >
              <option value="1">xxsmall</option>
              <option value="2">xsmall</option>
              <option value="3">small</option>
              <option value="4">medium</option>
              <option value="5">large</option>
              <option value="6">xlarge</option>
              <option value="7">xxlarge</option>
            </select>
            <button className="tool" onClick={this.handleIncreaseFont}>
              <i className="bi bi-plus"></i>
            </button>
          </div>
          <button
            className="tool"
            onClick={() => onFormat("justifyLeft")}
            onMouseDown={(e) => e.preventDefault()}
          >
            <i className="bi bi-text-left"></i>
          </button>
          <button
            className="tool"
            onClick={() => onFormat("justifyCenter")}
            onMouseDown={(e) => e.preventDefault()}
          >
            <i className="bi bi-text-center"></i>
          </button>
          <button
            className="tool"
            onClick={() => onFormat("justifyRight")}
            onMouseDown={(e) => e.preventDefault()}
          >
            <i className="bi bi-text-right"></i>
          </button>
          <button
            className="tool"
            onClick={() => onFormat("insertUnorderedList")}
            onMouseDown={(e) => e.preventDefault()}
          >
            <i className="bi bi-list-ul"></i>
          </button>
          <button
            className="tool"
            onClick={() => onFormat("insertOrderedList")}
            onMouseDown={(e) => e.preventDefault()}
          >
            <i className="bi bi-list-ol"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default ToolBar;
