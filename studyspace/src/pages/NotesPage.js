import React, { useRef, useState, useEffect, useCallback } from "react";
import NavBar from "../components/NavBar.js";
import ToolBar from "../components/ToolBar.js";
import Document from "../components/Document.js";

function rgbToHex(rgb) {
    const result = rgb.match(/\d+/g);
    if (!result) return rgb;
    const [r, g, b] = result.map(Number);
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b)
        .toString(16)
        .slice(1)
        .toUpperCase();
}


function NotesPage() {
    const documentRef = useRef();

    // tracks if the bold, italic, and underline buttons are active
    const [activeFormats, setActiveFormats] = useState({
        bold: false,
        italic: false,
        underline: false,
    });

    const [fontSize, setFontSize] = useState("3");
    const [selectedFont, setSelectedFont] = useState("Inter");
    const [fontColor, setFontColor] = useState("#000000"); // default color black

    // changes the format at current selection based on button pressed
    const handleFormat = (command, value = null) => {
        document.execCommand(command, false, value);

        if (["justifyLeft", "justifyCenter", "justifyRight"].includes(command)) {
            document.execCommand("fontSize", false, fontSize);
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

        const currentFontSize = document.queryCommandValue("fontSize") || "3";
        setFontSize(currentFontSize.toString());
        
        let currentFontColor = document.queryCommandValue("foreColor") || "#000000";
        currentFontColor = rgbToHex(currentFontColor);
        setFontColor(currentFontColor);

        const currentFont = document.queryCommandValue("fontName") || "Inter";
        console.log("unsantitized: " + currentFont);
        const sanitized = currentFont.replace(/"/g, "'");
        console.log("santitized: " + sanitized);
        setSelectedFont(sanitized);
    }, []);

    // Handler to update the font size
    const handleFontSizeChange = (newSize) => {
        // Ensure the size stays within 1 and 7
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
            <ToolBar onFormat={handleFormat} 
                activeFormats={activeFormats}
                fontSize={fontSize}
                onFontSizeChange={handleFontSizeChange}
                selectedFont={selectedFont}
                onFontChange={handleFontChange} 
                fontColor={fontColor}
                onFontColorChange={handleFontColorChange}/>
            <Document documentRef={documentRef} />
        </div>
    );
}

export default NotesPage;
