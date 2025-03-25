import "../css/notes.css";
import React from "react";

class Document extends React.Component {
  // react class that runs right when the component is added to the DOM
  componentDidMount() {
    if (this.props.documentRef && this.props.documentRef.current) {
      // adds event listener for keydown to check for 'tab'
      this.props.documentRef.current.addEventListener(
        "keydown",
        this.handleKeyDown,
      );

      // Set the default font size to "medium" (numeric value 4)
      this.props.documentRef.current.focus();
      document.execCommand("fontSize", false, "3");
      document.execCommand("fontName", false, "Inter");
    }
  }
  // runs righ before the component is removed from the DOM
  componentWillUnmount() {
    if (this.props.documentRef && this.props.documentRef.current) {
      // removes event listener
      this.props.documentRef.current.removeEventListener(
        "keydown",
        this.handleKeyDown,
      );
    }
  }

  handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();

      // gets the cursor location
      const selection = window.getSelection();
      if (!selection.rangeCount) return;
      const range = selection.getRangeAt(0);

      // creates a span element with class tab-space to create a tab
      const tabSpan = document.createElement("span");
      tabSpan.className = "tab-space";
      tabSpan.innerHTML = "\u2003";
      tabSpan.contentEditable = "false"; // makes sure user can't type inside span

      range.insertNode(tabSpan);

      // moves the cursor after the tab space
      range.setStartAfter(tabSpan);
      range.collapse(true); // removes any selection
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  render() {
    return (
      <div
        contentEditable="true"
        className="editor"
        ref={this.props.documentRef}
        style={{ fontFamily: this.props.selectedFont }}
        suppressContentEditableWarning={true}
      ></div>
    );
  }
}

export default Document;
