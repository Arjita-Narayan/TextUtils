import React, { useState } from "react";
import VoiceAssistant from "./VoiceAssistant";

export default function TextForm(props) {
  const { text, setText, showAlert, heading, mode } = props;
  const [fontFamily, setFontFamily] = useState("Arial");

  // Copy Text to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    showAlert("Text Copied to clipboard", "success");
  };

  // Convert text to uppercase
  const handleUpClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
    showAlert("Converted to uppercase", "success");
  };

  // Convert text to lowercase
  const handleLowClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
    showAlert("Converted to lowercase", "success");
  };

  // Clear text area
  const handleClearClick = () => {
    setText("");
    showAlert("Text Cleared", "success");
  };

  // Handle text change
  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  // Handle font family change
  const handleFontFamilyChange = (event) => {
    setFontFamily(event.target.value);
    showAlert("Font Changed", "success");
  };

  // Word count and reading time calculation
  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const charCount = text.length;
  const readingTime = (0.008 * wordCount).toFixed(2); // Approx 200 words per minute reading speed

  // Combined style object for textarea
  const textAreaStyle = {
    backgroundColor: mode === "dark" ? "#13466e" : "white",
    color: mode === "dark" ? "white" : "#042743",
    fontFamily: fontFamily,
  };

  return (
    <>
      <div
        className="container"
        style={{
          color: mode === "dark" ? "white" : "#042743",
        }}
      >
        <h1>{heading}</h1>

        <div className="mb-3">
          <textarea
            className="form-control"
            value={text}
            onChange={handleTextChange}
            id="myBox"
            rows="8"
            style={textAreaStyle} // Apply combined style
          ></textarea>
        </div>

        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-2 my-1"
          onClick={handleUpClick}
        >
          Convert to Uppercase
        </button>

        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-2 my-1"
          onClick={handleLowClick}
        >
          Convert to Lowercase
        </button>

        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-2 my-1"
          onClick={handleClearClick}
        >
          Clear
        </button>

        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-2 my-1"
          onClick={handleCopy}
        >
          Copy Text
        </button>

        <VoiceAssistant
          showAlert={showAlert}
          onTextRecognized={setText} // Directly set the text recognized
        />

        <select
          className="form-select my-3"
          value={fontFamily}
          onChange={handleFontFamilyChange}
          aria-label="Font Family"
        >
          <option value="Arial">Arial</option>
          <option value="Verdana">Verdana</option>
          <option value="Courier New">Courier New</option>
          <option value="Georgia">Georgia</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Tahoma">Tahoma</option>
          <option value="Trebuchet MS">Trebuchet MS</option>
          <option value="Lucida Console">Lucida Console</option>
        </select>
      </div>

      <div
        className="container my-3"
        style={{ color: mode === "dark" ? "white" : "#042743" }}
      >
        <h2>Your Text Summary</h2>
        <p>
          {wordCount} {wordCount === 1 ? "word" : "words"} and {charCount}{" "}
          {charCount === 1 ? "character" : "characters"}
        </p>
        <p>{readingTime} minutes read</p>
        <h3>Preview</h3>
        <p style={{ fontFamily: fontFamily }}>
          {text.length > 0 ? text : "Nothing to preview!"}
        </p>
      </div>
    </>
  );
}
