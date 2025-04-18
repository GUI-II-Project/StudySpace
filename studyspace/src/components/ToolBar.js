import "../css/notes.css";
import React from "react";

class ToolBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editingActiveNote: false,
      editedNoteName: "",
      compact: window.innerWidth <= 640,
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  // this whole thing hinges on this 'compact' variable
  handleResize = () => {
    const compact = window.innerWidth <= 745;
    if (compact !== this.state.compact) this.setState({ compact });
  };

  incFont = () =>
    this.props.onFontSizeChange(
      Math.min(7, +this.props.fontSize + 1).toString(),
    );
  decFont = () =>
    this.props.onFontSizeChange(
      Math.max(1, +this.props.fontSize - 1).toString(),
    );

  // shared function for mobile dropdowns
  renderDropdown(icon, items) {
    const { onFormat } = this.props;
    const { toolProps } = this;
    return (
      <div className="dropdown">
        <button
          className="tool"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          {...toolProps}
        >
          <span className={`bi ${icon}`}></span>
        </button>
        <ul
          className="dropdown-menu"
          style={{ "--bs-dropdown-min-width": "0" }}
          data-bs-auto-close="false"
        >
          {items.map((it) => (
            <li key={it.cmd}>
              <button
                className="dropdown-item tool"
                onClick={() => onFormat(it.cmd)}
              >
                {it.icon && <span className={`bi ${it.icon}`}></span>}
                {it.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // if compact, build dropdown, otherwise do normal
  renderFormatGroup() {
    const { compact } = this.state;
    const { onFormat, activeFormats } = this.props;
    if (!compact)
      return ["bold", "italic", "underline"].map((cmd) => (
        <button
          key={cmd}
          className={`tool ${activeFormats[cmd] ? "active" : ""}`}
          onClick={() => onFormat(cmd)}
          onMouseDown={(e) => e.preventDefault()}
          {...this.toolProps}
        >
          <span
            className={`bi bi-type-${
              cmd === "bold"
                ? "bold"
                : cmd === "italic"
                  ? "italic"
                  : "underline"
            }`}
          ></span>
        </button>
      ));
    return this.renderDropdown("bi-type", [
      { icon: "bi-type-bold", cmd: "bold" },
      { icon: "bi-type-italic", cmd: "italic" },
      { icon: "bi-type-underline", cmd: "underline" },
    ]);
  }

  // if compact, build dropdown, otherwise do normal
  renderAlignGroup() {
    const { compact } = this.state;
    const { onFormat } = this.props;
    if (!compact)
      return [
        { icon: "bi-text-left", cmd: "justifyLeft" },
        { icon: "bi-text-center", cmd: "justifyCenter" },
        { icon: "bi-text-right", cmd: "justifyRight" },
      ].map((b) => (
        <button
          key={b.cmd}
          className="tool"
          onClick={() => onFormat(b.cmd)}
          onMouseDown={(e) => e.preventDefault()}
          {...this.toolProps}
        >
          <span className={`bi ${b.icon}`}></span>
        </button>
      ));
    return this.renderDropdown("bi-text-left", [
      { icon: "bi-text-left", cmd: "justifyLeft" },
      { icon: "bi-text-center", cmd: "justifyCenter" },
      { icon: "bi-text-right", cmd: "justifyRight" },
    ]);
  }

  // if compact, build dropdown, otherwise do normal
  renderListGroup() {
    const { compact } = this.state;
    const { onFormat } = this.props;
    if (!compact)
      return [
        { icon: "bi-list-ul", cmd: "insertUnorderedList" },
        { icon: "bi-list-ol", cmd: "insertOrderedList" },
      ].map((b) => (
        <button
          key={b.cmd}
          className="tool"
          onClick={() => onFormat(b.cmd)}
          onMouseDown={(e) => e.preventDefault()}
          {...this.toolProps}
        >
          <span className={`bi ${b.icon}`}></span>
        </button>
      ));
    return this.renderDropdown("bi-list-ul", [
      { icon: "bi-list-ul", cmd: "insertUnorderedList" },
      { icon: "bi-list-ol", cmd: "insertOrderedList" },
    ]);
  }

  render() {
    const {
      notes,
      currentNoteId,
      createNewNote,
      onNoteChange,
      deleteNote,
      setNoteName,
      downloadDocx,
      downloadPdf,
      onFormat,
      fontSize,
      onFontSizeChange,
      fontColor,
      onFontColorChange,
      selectedFont,
      onFontChange,
    } = this.props;

    const { compact } = this.state;

    // if compact, no margin, otherwise, do normal
    this.toolProps = compact ? { style: { margin: "0" } } : {};

    return (
      <div
        className="format-bar d-flex align-items-center justify-content-center"
        // makes toolbar smaller to fit mobile view
        style={{ maxWidth: compact ? 395 : 775 }}
      >
        <div className="format-buttons m-0 px-2 d-flex align-items-center justify-content-center">
          {/* Note dropdown */}
          <button
            className="tool"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            {...this.toolProps}
          >
            <span className="bi bi-plus-circle"></span>
          </button>
          <ul className="dropdown-menu" data-bs-auto-close="false">
            {notes.map((note) => (
              <li key={note.id} className="w-120 d-flex align-items-center">
                {note.id === currentNoteId ? (
                  this.state.editingActiveNote ? (
                    <input
                      className="form-control"
                      value={this.state.editedNoteName}
                      autoFocus
                      onChange={(e) =>
                        this.setState({ editedNoteName: e.target.value })
                      }
                      onBlur={() => {
                        this.setState({ editingActiveNote: false });
                        setNoteName(note.id, this.state.editedNoteName);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          this.setState({ editingActiveNote: false });
                          setNoteName(note.id, this.state.editedNoteName);
                        }
                      }}
                    />
                  ) : (
                    <button
                      className="dropdown-item active"
                      style={{ cursor: "text", backgroundColor: "#dbca49" }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.setState({
                          editingActiveNote: true,
                          editedNoteName: note.name,
                        });
                      }}
                    >
                      {note.name}
                    </button>
                  )
                ) : (
                  <button
                    className="dropdown-item"
                    onClick={() => onNoteChange(note.id)}
                  >
                    {note.name}
                  </button>
                )}
                <button
                  className="trash-button ms-1"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    deleteNote(note.id);
                  }}
                >
                  <span className="bi bi-trash"></span>
                </button>
              </li>
            ))}
            <li>
              <button className="dropdown-item" onClick={createNewNote}>
                <u>New Note</u>
              </button>
            </li>
          </ul>
          {/* download */}
          <button
            className="tool"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            {...this.toolProps}
          >
            <span className="bi bi-download"></span>
          </button>
          <ul className="dropdown-menu">
            <li>
              <button className="dropdown-item" onClick={downloadDocx}>
                MS Word (.docx)
              </button>
            </li>
            <li>
              <button className="dropdown-item" onClick={downloadPdf}>
                PDF Document (.pdf)
              </button>
            </li>
          </ul>

          {/* undo/redo */}
          <button
            className="tool"
            onClick={() => onFormat("undo")}
            onMouseDown={(e) => e.preventDefault()}
          >
            <span className="bi bi-arrow-counterclockwise"></span>
          </button>
          <button
            className="tool"
            onClick={() => onFormat("redo")}
            onMouseDown={(e) => e.preventDefault()}
          >
            <span className="bi bi-arrow-clockwise"></span>
          </button>

          {/* font family select */}
          <select
            className={`${compact ? "compact" : ""}`}
            value={selectedFont}
            onChange={(e) => onFontChange(e.target.value)}
          >
            <option value="Arial">Arial</option>
            <option value="'Times New Roman', Times, serif">
              Times New Roman
            </option>
            <option value="'Courier New'">Courier New</option>
            <option value="Georgia">Georgia</option>
            <option value="Inter">Inter</option>
          </select>

          {/* format group */}
          {this.renderFormatGroup()}

          {/* color */}
          <input
            type="color"
            className="tool circular"
            value={fontColor}
            onChange={(e) => onFontColorChange(e.target.value)}
          />

          {/* font size block */}
          <div id="size" style={{ width: compact ? 43 : 130 }}>
            <button
              className={`tool ${compact ? "d-none" : ""}`}
              onClick={this.decFont}
            >
              <span className="bi bi-dash"></span>
            </button>
            <select
              className={`${compact ? "compact" : ""}`}
              value={fontSize}
              onChange={(e) => onFontSizeChange(e.target.value)}
            >
              {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                <option key={n} value={n}>
                  {
                    [
                      "xxsmall",
                      "xsmall",
                      "small",
                      "medium",
                      "large",
                      "xlarge",
                      "xxlarge",
                    ][n - 1]
                  }
                </option>
              ))}
            </select>
            <button
              className={`tool ${compact ? "d-none" : ""}`}
              onClick={this.incFont}
            >
              <span className="bi bi-plus"></span>
            </button>
          </div>

          {/* alignment group */}
          {this.renderAlignGroup()}

          {/* list group */}
          {this.renderListGroup()}
        </div>
      </div>
    );
  }
}

export default ToolBar;
