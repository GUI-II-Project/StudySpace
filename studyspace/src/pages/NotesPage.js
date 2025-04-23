import React, { useRef, useState, useEffect, useCallback } from "react";
import { saveAs } from "file-saver";
import htmlDocx from "html-docx-js/dist/html-docx";
import { jsPDF } from "jspdf";
import NavBar from "../components/NavBar.js";
import ToolBar from "../components/ToolBar.js";
import Document from "../components/Document.js";
import { database } from "../configuration.jsx";
import { ref, onValue, set, remove } from "firebase/database";
import { useAuth } from "../context/AuthContext";

function NotesPage() {
  const [notes, setNotes] = useState([
    { id: "n1", name: "note1", content: "" },
  ]);
  const [currentNoteId, setCurrentNoteId] = useState("n1");
  const [noteName, setNoteName] = useState("note1");
  const documentRef = useRef();
  const hasInitialized = useRef(false);
  const { user: currentUser } = useAuth();

  const [fontSize, setFontSize] = useState("3");
  const [selectedFont, setSelectedFont] = useState("Arial");
  const [fontColor, setFontColor] = useState("#000000");
  const [lastSaved, setLastSaved] = useState(null);
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
  });

  const handleFormat = (command, value = null) => {
    document.execCommand(command, false, value);
    if (["justifyLeft", "justifyCenter", "justifyRight"].includes(command)) {
      document.execCommand("fontSize", false, fontSize);
      document.execCommand("fontName", false, selectedFont);
    }
    updateActiveFormats();
    if (command === "fontSize" && documentRef.current) {
      documentRef.current.focus();
    }
  };

  const updateActiveFormats = useCallback(() => {
    setActiveFormats({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
    });
    setFontSize((document.queryCommandValue("fontSize") || "3").toString());
    let currentFontColor = document.queryCommandValue("foreColor") || "#000000";
    setFontColor(rgbToHex(currentFontColor));
    setSelectedFont(
      (document.queryCommandValue("fontName") || "Arial").replace(/"/g, "'"),
    );
  }, []);

  const handleFontSizeChange = (newSize) => {
    const sizeNum = Math.min(7, Math.max(1, Number(newSize)));
    const sizeStr = sizeNum.toString();
    setFontSize(sizeStr);
    document.execCommand("fontSize", false, sizeStr);
    if (documentRef.current) documentRef.current.focus();
  };

  const handleFontChange = (fontName) => {
    setSelectedFont(fontName);
    document.execCommand("fontName", false, fontName);
    if (documentRef.current) documentRef.current.focus();
  };

  const handleFontColorChange = (color) => {
    setFontColor(color);
    document.execCommand("foreColor", false, color);
    if (documentRef.current) documentRef.current.focus();
  };

  const downloadDocx = () => {
    if (!documentRef.current) return;
    const content = documentRef.current.innerHTML;
    const html =
      "<html><head><meta charset='utf-8'><title>Document</title></head><body>" +
      content +
      "</body></html>";
    const converted = htmlDocx.asBlob(html);
    saveAs(converted, noteName + ".docx");
  };

  const downloadPdf = () => {
    if (!documentRef.current) return;
    const originalBackground = documentRef.current.style.backgroundColor;
    const originalWidth = documentRef.current.style.width;
    documentRef.current.style.backgroundColor = "#ffffff";
    documentRef.current.style.width = "820px";
    const pdf = new jsPDF("p", "pt", "a4");
    pdf.html(documentRef.current, {
      callback: function (pdf) {
        pdf.save(noteName + ".pdf");
        documentRef.current.style.backgroundColor = originalBackground;
        documentRef.current.style.width = originalWidth;
      },
      html2canvas: { scale: 0.725 },
    });
  };

  const onNoteChange = (noteId) => {
    setCurrentNoteId(noteId);
    const note = notes.find((n) => n.id === noteId);
    if (note) {
      setNoteName(note.name);
      if (documentRef.current) {
        documentRef.current.innerHTML = note.content;
        documentRef.current.focus();
      }
    }
  };

  const updateNoteName = (noteId, newName) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === noteId ? { ...note, name: newName || "" } : note,
      ),
    );
    if (noteId === currentNoteId) {
      setNoteName(newName);
    }
    if (currentUser) {
      const content = documentRef.current?.innerHTML || "";
      set(ref(database, `notes/${currentUser.uid}/${noteId}`), {
        name: newName || "",
        content: content,
        lastSaved: new Date().toISOString(),
      });
    }
  };

  const getNextNoteNumber = useCallback(() => {
    const numbers = notes
      .map((note) => {
        const m =
          typeof note.name === "string" && note.name.match(/^note(\d+)$/);
        return m ? +m[1] : 0;
      })
      .filter((n) => n > 0);
    return numbers.length ? Math.max(...numbers) + 1 : 1;
  }, [notes]);

  const createNewNote = useCallback(() => {
    const nextNumber = getNextNoteNumber();
    const defaultName = `note${nextNumber}`;
    const newId = `n${Date.now()}`;
    const newNote = { id: newId, name: defaultName, content: "" };
    setNotes((prev) => [...prev, newNote]);
    setCurrentNoteId(newId);
    setNoteName(defaultName);
    if (documentRef.current) {
      documentRef.current.innerHTML = "";
      documentRef.current.focus();
    }
    if (currentUser) {
      set(ref(database, `notes/${currentUser.uid}/${newId}`), {
        name: defaultName,
        content: "",
        lastSaved: new Date().toISOString(),
      });
    }
  }, [getNextNoteNumber, currentUser]);

  const deleteNote = (noteId) => {
    if (currentUser) {
      remove(ref(database, `notes/${currentUser.uid}/${noteId}`)).catch(
        console.error,
      );
    }
    const updated = notes.filter((n) => n.id !== noteId);
    if (updated.length === 0) {
      const newId = `n${Date.now()}`;
      const newNote = { id: newId, name: "note1", content: "" };
      setNotes([newNote]);
      setCurrentNoteId(newId);
      setNoteName("note1");
      if (documentRef.current) {
        documentRef.current.innerHTML = "";
        documentRef.current.focus();
      }
      if (currentUser) {
        set(ref(database, `notes/${currentUser.uid}/${newId}`), {
          name: "note1",
          content: "",
          lastSaved: new Date().toISOString(),
        });
      }
    } else {
      setNotes(updated);
      if (noteId === currentNoteId) onNoteChange(updated[0].id);
    }
  };

  useEffect(() => {
    if (!currentUser) return;
    const notesRef = ref(database, `notes/${currentUser.uid}`);
    const unsubscribe = onValue(notesRef, (snapshot) => {
      const data = snapshot.val() || {};
      const loaded = Object.entries(data).map(([id, value]) => ({
        id,
        name: value.name || "",
        content: value.content || "",
        lastSaved: value.lastSaved || new Date().toISOString(),
      }));
      setNotes(loaded);
      if (!hasInitialized.current && loaded.length > 0) {
        const first = loaded[0];
        setCurrentNoteId(first.id);
        setNoteName(first.name);
        if (documentRef.current) {
          documentRef.current.innerHTML = first.content || "";
        }
        hasInitialized.current = true;
      }
    });
    return () => unsubscribe();
  }, [currentUser]);

  useEffect(() => {
    if (!documentRef.current || !currentUser) return;
    let saveTimeout = null;
    const observer = new MutationObserver(() => {
      setLastSaved(null);
      if (saveTimeout) clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => {
        const content = documentRef.current.innerHTML;
        setNotes((prev) =>
          prev.map((note) =>
            note.id === currentNoteId ? { ...note, content } : note,
          ),
        );
        setLastSaved(new Date());
        set(ref(database, `notes/${currentUser.uid}/${currentNoteId}`), {
          name: noteName || "",
          content: content || "",
          lastSaved: new Date().toISOString(),
        });
      }, 3000);
    });
    observer.observe(documentRef.current, {
      childList: true,
      characterData: true,
      subtree: true,
    });
    return () => {
      if (saveTimeout) clearTimeout(saveTimeout);
      observer.disconnect();
    };
  }, [currentUser, currentNoteId, noteName]);

  return (
    <div
      style={{ position: "relative", minHeight: "100vh", overflowX: "hidden" }}
    >
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
        downloadPdf={downloadPdf}
        noteName={noteName}
        notes={notes}
        currentNoteId={currentNoteId}
        onNoteChange={onNoteChange}
        createNewNote={createNewNote}
        setNoteName={updateNoteName}
        deleteNote={deleteNote}
      />
      <Document documentRef={documentRef} />
      <div
        style={{
          position: "fixed",
          bottom: "6px",
          left: "10px",
          color: "white",
          backgroundColor: "grey",
          padding: "0px 4px",
          borderRadius: "4px",
          fontSize: "0.75rem",
          opacity: 0.8,
          pointerEvents: "none",
        }}
      >
        {lastSaved
          ? `Last saved at ${lastSaved.toLocaleTimeString()}`
          : "Not saved yet"}
      </div>
    </div>
  );
}

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
