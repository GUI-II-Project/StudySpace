import React, { useRef, useState, useEffect, useCallback } from "react";
import { saveAs } from "file-saver";
import NavBar from "../components/NavBar.js";
import ToolBar from "../components/ToolBar.js";
import Document from "../components/Document.js";

function NotesPage() {
  const documentRef = useRef();

  const [fontSize, setFontSize] = useState("3");
  const [selectedFont, setSelectedFont] = useState("Arial");
  const [fontColor, setFontColor] = useState("#000000");

  // tracks if the bold, italic, and underline buttons are active
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
  });

  // changes the format at current selection based on button pressed
  const handleFormat = (command, value = null) => {
    document.execCommand(command, false, value);

    // avoids the justify buttons messing with the font atributes
    if (["justifyLeft", "justifyCenter", "justifyRight"].includes(command)) {
      document.execCommand("fontSize", false, fontSize);
      document.execCommand("fontName", false, selectedFont);
    }

    updateActiveFormats();

    if (command === "fontSize" && documentRef.current) {
      documentRef.current.focus();
    }
  };

  // checks if the format buttons are active and updates the state
  const updateActiveFormats = useCallback(() => {
    const newFormats = {
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
    };
    setActiveFormats(newFormats);

    // checks current fontSize and updates toolbar. Default small
    const currentFontSize = document.queryCommandValue("fontSize") || "3";
    setFontSize(currentFontSize.toString());

    // checks current fontColor and updates toolbar. Default black
    let currentFontColor = document.queryCommandValue("foreColor") || "#000000";
    currentFontColor = rgbToHex(currentFontColor);
    setFontColor(currentFontColor);

    // checks current fontName and updates toolbar. Default Arial
    const currentFont = document.queryCommandValue("fontName") || "Arial";
    console.log("unsantitized: " + currentFont);
    const sanitized = currentFont.replace(/"/g, "'");
    console.log("santitized: " + sanitized);
    setSelectedFont(sanitized);
  }, []);

  const handleFontSizeChange = (newSize) => {
    // ensure the size stays within 1 and 7
    const sizeNum = Math.min(7, Math.max(1, Number(newSize)));
    const sizeStr = sizeNum.toString();
    setFontSize(sizeStr);
    document.execCommand("fontSize", false, sizeStr);
    if (documentRef.current) {
      documentRef.current.focus();
    }
  };

  const handleFontChange = (fontName) => {
    setSelectedFont(fontName);
    document.execCommand("fontName", false, fontName);
    if (documentRef.current) {
      documentRef.current.focus();
    }
  };

  const handleFontColorChange = (color) => {
    setFontColor(color);
    document.execCommand("foreColor", false, color);
    if (documentRef.current) {
      documentRef.current.focus();
    }
  };

  const downloadDocx = () => {
    if (documentRef.current) {
      const content = documentRef.current.innerHTML;

      // creates Blob object that converts html to work with docx
      const converted = new Blob(["\ufeff", content], {
        type: "application/msword",
      });
      // trigger a download
      saveAs(converted, "note.docx");
    }
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
    document.addEventListener("selectionchange", handleSelectionChange);
    // checks specifically for keyup events
    if (document) {
      document.addEventListener("keyup", handleKeyUp);
    }

    // just removes listeners at the end
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
      if (document) {
        document.removeEventListener("keyup", handleKeyUp);
      }
    };
  }, [updateActiveFormats]);

  return (
    <div>
      <NavBar />
      <ToolBar
        onFormat={handleFormat}
        activeFormats={activeFormats}
        fontSize={fontSize}
        onFontSizeChange={handleFontSizeChange}
        selectedFont={selectedFont}
        onFontChange={handleFontChange}
        fontColor={fontColor}
        onFontColorChange={handleFontColorChange}
        downloadDocx={downloadDocx}
      />
      <Document documentRef={documentRef} />
    </div>
  );
}

// this just converts the rgb value from the color picker to hex
// to be used when updating the color picker's value on change
function rgbToHex(rgb) {
  const result = rgb.match(/\d+/g);
  if (!result) return rgb;
  const [r, g, b] = result.map(Number);
  return (
    "#" +
    ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
  );
}

export default NotesPage;
