import React, { useState, useEffect } from "react";

export default function VoiceAssistant({ showAlert, onTextRecognized }) {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = "en-US";
      recognitionInstance.onresult = (event) => {
        const recognizedText = event.results[0][0].transcript;
        onTextRecognized(recognizedText);
        showAlert("Text recognized: " + recognizedText, "success");
      };
      recognitionInstance.onerror = (event) => {
        showAlert("Error recognizing text: " + event.error, "danger");
      };
      setRecognition(recognitionInstance);
    } else {
      showAlert(
        "Speech recognition is not supported in this browser.",
        "danger"
      );
    }
  }, [onTextRecognized, showAlert]);

  const toggleListening = () => {
    if (recognition) {
      if (isListening) {
        recognition.stop();
        showAlert("Stopped listening.", "info");
      } else {
        recognition.start();
        showAlert("Listening for speech...", "info");
      }
      setIsListening(!isListening);
    }
  };

  return (
    <button
      className={`btn mx-2 my-1 ${
        isListening ? "btn-secondary" : "btn-primary"
      }`}
      onClick={toggleListening}
    >
      {isListening ? "Stop Listening" : "Start Listening"}
    </button>
  );
}
