import React, { useRef, useState, useEffect, useCallback } from "react";
import { saveAs } from "file-saver";
import htmlDocx from "html-docx-js/dist/html-docx";
import { jsPDF } from "jspdf";
import NavBar from "../components/NavBar.js";
import ToolBar from "../components/ToolBar.js";
import { database } from "../configuration.jsx";
import { ref, onValue, set, remove } from "firebase/database";
import { useAuth } from "../context/AuthContext";

function NotesPage() {
  /****** SUNNY ******/
  // this is how they are saved
  // i figure this type if structure would help with the database
  const [notes, setNotes] = useState([
    { id: "n1", name: "note1", content: "" },
  ]);
  const [currentNoteId, setCurrentNoteId] = useState("n1");
  const [noteName, setNoteName] = useState("note1");

  const documentRef = useRef(); // reference to editable div

  const { user: currentUser } = useAuth(); // get current signed in user

  const [fontSize, setFontSize] = useState("3"); // toolbar font size
  const [selectedFont, setSelectedFont] = useState("Arial"); // toolbar font
  const [fontColor, setFontColor] = useState("#000000"); // toolbar font color
  const [lastSaved, setLastSaved] = useState(null); // display last save time

  // tracks if the bold, italic, and underline buttons are active
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
  });

  // changes the format at current selection based on button pressed
  const handleFormat = (command, value = null) => {
    document.execCommand(command, false, value);

    // avoids the justify buttons messing with the font attributes
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
    const sanitized = currentFont.replace(/"/g, "'");
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
      // get the HTML content from the editor
      const content = documentRef.current.innerHTML;
      // create a basic HTML layout with the content in the body
      const html = `
      <html>
          <head>
              <meta charset="utf-8">
              <title>Document</title>
          </head>
          <body>${content}</body>
      </html>
    `;
      const converted = htmlDocx.asBlob(html);
      // use noteName in the filename
      saveAs(converted, `${noteName}.docx`);
    }
  };

  // basically turns the editor into a canvas and converts that to a pdf
  const downloadPdf = () => {
    if (documentRef.current) {
      // save the original background style
      const originalBackground = documentRef.current.style.backgroundColor;
      // temporarily set a white background
      documentRef.current.style.backgroundColor = "#ffffff";

      const pdf = new jsPDF("p", "pt", "a4");
      pdf.html(documentRef.current, {
        callback: function (pdf) {
          pdf.save(`${noteName}.pdf`);
          // revert background style
          documentRef.current.style.backgroundColor = originalBackground;
        },
        html2canvas: {
          scale: 0.725, // makes the download the proper size
        },
      });
    }
  };

  // when switching notes, update the noteName and editor content
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

  // updates the note name if the user changes the current note's name
  const updateNoteName = (noteId, newName) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteId ? { ...note, name: newName } : note,
      ),
    );
    if (noteId === currentNoteId) {
      setNoteName(newName);
    }

    // immediately saves the new name to the database
    if (currentUser) {
      const noteRef = ref(database, `notes/${currentUser.uid}/${noteId}`);

      let updatedContent = "";
      if (noteId === currentNoteId && documentRef.current) {
        updatedContent = documentRef.current.innerHTML;
      } else {
        const targetNote = notes.find((note) => note.id === noteId);
        updatedContent = targetNote ? targetNote.content : "";
      }

      set(noteRef, {
        name: newName,
        content: updatedContent,
        lastSaved: new Date().toISOString(),
      });
    }
  };

  // just keeps the default note names from duplicating
  const getNextNoteNumber = useCallback(() => {
    if (notes.length === 0) return 1;
    const numbers = notes
      .map((note) => {
        const match = note.name.match(/^note(\d+)$/);
        return match ? parseInt(match[1], 10) : 0;
      })
      .filter((num) => num > 0);
    const max = numbers.length ? Math.max(...numbers) : 0;
    return max + 1;
  }, [notes]);

  // creates a new note with a name and id and sets the conent to ""
  const createNewNote = useCallback(() => {
    const nextNumber = getNextNoteNumber();
    const defaultName = `note${nextNumber}`;
    const newId = `n${Date.now()}`; // unique ID from timestamp
    const newNote = { id: newId, name: defaultName, content: "" };

    setNotes((prevNotes) => [...prevNotes, newNote]);
    setCurrentNoteId(newId);
    setNoteName(defaultName);
    if (documentRef.current) {
      documentRef.current.innerHTML = "";
      documentRef.current.focus();
    }
    // saves the new note to the database
    if (currentUser) {
      const noteRef = ref(database, `notes/${currentUser.uid}/${newId}`);
      set(noteRef, {
        name: defaultName,
        content: "",
        lastSaved: new Date().toISOString(),
      });
    }
  }, [getNextNoteNumber, currentUser]); // Include any dependencies createNewNote uses.

  const deleteNote = (noteId) => {
    // remove the note from Firebase
    if (currentUser) {
      const noteRef = ref(database, `notes/${currentUser.uid}/${noteId}`);
      remove(noteRef).catch((error) => {
        console.error("Error deleting note from Firebase:", error);
      });
    }

    // update the list
    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.filter((note) => note.id !== noteId);

      // if the deleted note was the currently active note and
      // there are still notes remaining, switch to the first one
      if (noteId === currentNoteId && updatedNotes.length > 0) {
        const newCurrentNote = updatedNotes[0];
        setCurrentNoteId(newCurrentNote.id);
        setNoteName(newCurrentNote.name);
        if (documentRef.current) {
          documentRef.current.innerHTML = newCurrentNote.content;
          documentRef.current.focus();
        }
      } else if (noteId === currentNoteId && updatedNotes.length === 0) {
        // if there are no more notes, clear current note state
        // next useEffect will create new node
        setCurrentNoteId("");
        setNoteName("");
        if (documentRef.current) {
          documentRef.current.innerHTML = "";
        }
      }
      return updatedNotes;
    });
  };

  // waits for the notes list to hit 0
  useEffect(() => {
    if (notes.length === 0) {
      createNewNote();
    }
  }, [notes, createNewNote]);

  // generally keeps the document and toolbar components synched
  useEffect(() => {
    const document = documentRef.current; // gets document DOM reference

    // checks which formats are active
    const handleSelectionChange = () => {
      updateActiveFormats();
    };

    // checks specifically for keyup events
    const handleKeyUp = () => {
      updateActiveFormats();
    };

    // listens for any selection change within the document. clicking, moving cursor, etc.
    document.addEventListener("selectionchange", handleSelectionChange);
    document.addEventListener("keyup", handleKeyUp);

    // just removes listeners at the end
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [updateActiveFormats]);

  // updatea the local notes array and ensures the first note loads on entry
  useEffect(() => {
    if (!currentUser) return;

    const notesRef = ref(database, `notes/${currentUser.uid}`);
    onValue(notesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // convert the object to an array of notes
        const loadedNotes = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        setNotes(loadedNotes);

        // check if the current note exists in the loaded notes
        const current = loadedNotes.find((note) => note.id === currentNoteId);
        if (!current && loadedNotes.length > 0) {
          // if no valid current note is found, set the first note as current
          setCurrentNoteId(loadedNotes[0].id);
          setNoteName(loadedNotes[0].name);

          if (
            documentRef.current &&
            document.activeElement !== documentRef.current
          ) {
            documentRef.current.innerHTML = loadedNotes[0].content || "";
          }
        }
      }
    });
  }, [currentUser, currentNoteId]);

  // saves document content to firebase on DOM changes every 5 seconds
  // Also update the local notes state for the active note.
  useEffect(() => {
    if (!documentRef.current || !currentUser) return;

    let saveTimeout = null;

    const observer = new MutationObserver(() => {
      if (saveTimeout) clearTimeout(saveTimeout);

      saveTimeout = setTimeout(() => {
        const content = documentRef.current.innerHTML;

        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.id === currentNoteId ? { ...note, content: content } : note,
          ),
        );

        setLastSaved(new Date());

        const noteRef = ref(
          database,
          `notes/${currentUser.uid}/${currentNoteId}`,
        );
        set(noteRef, {
          name: noteName,
          content: content,
          lastSaved: new Date().toISOString(),
        });
      }, 5000); // 5 seconds
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
    <div style={{ position: "relative", minHeight: "100vh" }}>
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
      <div
        contentEditable="true"
        className="editor"
        ref={documentRef}
        suppressContentEditableWarning={true}
      ></div>
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
