import React, { useState, useRef } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [videoFile, setVideoFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const videoPreviewRef = useRef(null);

  const handleFileSelect = (file) => {
    if (file && file.type === "video/mp4") {
      setVideoFile(file);
      setResult(null);
    } else {
      alert("Please upload a valid MP4 file.");
    }
  };

  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const handleUpload = async () => {
    if (!videoFile) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("video", videoFile);

    try {
      const response = await axios.post(
        "https://dbdc-35-236-214-139.ngrok-free.app/predict",  // ✅ Paste your exact URL
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );      
      
      setResult(response.data);
    } catch (error) {
      console.error("Upload failed:", error.response?.data || error.message);
      setResult({ error: error.response?.data?.error || "Upload failed. Please try again." });
    }
    setLoading(false);
  };

  const confidenceBarColor = (confidence) => {
    if (confidence >= 0.8) return '#4caf50';
    if (confidence >= 0.5) return '#ff9800';
    return '#f44336';
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>🔍 Deepfake Detection Dashboard</h1>

        <div
          style={styles.dropzone}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <p>📥 Drag & drop an MP4 file here, or click to select</p>
          <input
            type="file"
            accept="video/mp4"
            onChange={handleInputChange}
            style={styles.fileInput}
          />
        </div>

        {videoFile && (
          <div style={{ marginTop: 20 }}>
            <p style={styles.fileName}>📁 {videoFile.name}</p>
            <video
              ref={videoPreviewRef}
              controls
              width="100%"
              style={{ marginTop: 10, borderRadius: 10 }}
              src={URL.createObjectURL(videoFile)}
            />
          </div>
        )}

        <button onClick={handleUpload} disabled={loading} style={styles.button}>
          {loading ? "⏳ Analyzing..." : "🚀 Upload & Predict"}
        </button>

        {result && (
          <div style={styles.resultBox}>
            <h3>🧠 Result</h3>
            {result.error ? (
              <p style={{ color: '#f44336' }}>{result.error}</p>
            ) : (
              <>
                <p>
                  <strong>Prediction:</strong>{" "}
                  <span style={{
                    color: result.prediction === 'Real' ? '#2e7d32' : '#c62828',
                    fontWeight: 'bold'
                  }}>
                    {result.prediction}
                  </span>
                </p>
                <p><strong>Confidence:</strong> {result.confidence}</p>
                <div style={styles.confidenceBarOuter}>
                  <div
                    style={{
                      ...styles.confidenceBarInner,
                      width: `${result.confidence * 100}%`,
                      backgroundColor: confidenceBarColor(result.confidence)
                    }}
                  />
                </div>
                <div style={styles.reasonBox}>

                  <p><strong>Inference Time:</strong> {result.inference_time}s</p>
                  <p><strong>Model:</strong> {result.model_used}</p>
                </div>

              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: 'linear-gradient(to right, #eef2f3, #d8e2dc)',
    minHeight: '100vh',
    padding: '3rem 1rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  card: {
    width: '100%',
    maxWidth: 700,
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: 12,
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    textAlign: 'center'
  },
  heading: {
    marginBottom: 20,
    color: '#1a237e'
  },
  dropzone: {
    border: '2px dashed #90caf9',
    padding: '2rem',
    borderRadius: 12,
    cursor: 'pointer',
    backgroundColor: '#f0f8ff',
    position: 'relative'
  },
  fileInput: {
    opacity: 0,
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    cursor: 'pointer'
  },
  fileName: {
    fontSize: 14,
    color: '#555'
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#1e88e5',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 20,
    marginBottom: 20
  },
  resultBox: {
    textAlign: 'left',
    marginTop: 20
  },
  confidenceBarOuter: {
    height: 10,
    width: '100%',
    backgroundColor: '#ddd',
    margin: '8px 0 10px',
    borderRadius: 5
  },
  confidenceBarInner: {
    height: '100%',
    borderRadius: 5
  },
  reasonBox: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 6,
    marginTop: 10,
    color: '#333'
  }
};

export default App;
