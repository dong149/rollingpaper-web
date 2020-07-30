import React, { useState, useEffect } from "react";
import "../styles/editor.scss";

const Editor = (props) => {
  return (
    <div className="editor">
      <header className="editor-header">
        <span className="editor-header-cancel">취소</span>
      </header>

      <div className="editor-textarea">
        <div className="editor-textarea-input" contenteditable="true"></div>
      </div>
      <div className="editor-from">
        <span>From.</span>
        <div className="editor-from-text">
          <input
            className="editor-from-text-input"
            type="text"
            placeholder="보내는이"
          />
        </div>
      </div>
      <footer className="editor-footer">
        <button className="editor-footer-btn">저장</button>
      </footer>
    </div>
  );
};

export default Editor;
