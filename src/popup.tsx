import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { reverseText } from "./services/reverseText";

const Popup = () => {
  const [inputText, setInputText] = useState<string>("");
  const [reversedText, setReversedText] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReversedText(reverseText(inputText));
  };

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ja-JP";
      speechSynthesis.speak(utterance);
    } else {
      console.error("Speech synthesis not supported in this browser.");
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const messageFromBackground = params.get("message");

    inputRef.current?.focus();

    if (messageFromBackground) {
      setInputText(decodeURIComponent(messageFromBackground));
      setReversedText(reverseText(decodeURIComponent(messageFromBackground)));
    }
  }, []);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "10px" }}>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex" }}>
          <input
            type="text"
            ref={inputRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            style={{
              padding: "5px",
              fontSize: "14px",
              width: "280px",
            }}
          />
          <button
            type="submit"
            style={{
              width: "100px",
              marginLeft: "5px",
              padding: "5px 10px",
              fontSize: "14px",
              cursor: "pointer",
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
          >
            ぶんまわす
          </button>
        </div>
      </form>
      {reversedText && (
        <div
          style={{
            marginTop: "10px",
            padding: "10px",
            border: "1px solid #CCC",
            borderRadius: "5px",
            backgroundColor: "#F9F9F9",
          }}
        >
          <div onClick={() => speakText(reversedText)} style={{ display: "inline-block", cursor: "pointer" }}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#222"><path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320ZM400-606l-86 86H200v80h114l86 86v-252ZM300-480Z" /></svg>
          </div>
          <div>
            <strong>結果:</strong> {reversedText}
          </div>
        </div>
      )}
    </div>
  );
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
