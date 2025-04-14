# 🧠 Deepfake Detection Using Hybrid Transformer Models

This project implements a real-time deepfake detection system using a hybrid neural architecture that combines Recurrent Neural Networks (RNNs) and Transformer Encoders. Designed for robustness against modern video manipulation, the system intelligently identifies fake content even in cases where faces are partially hidden, compressed, or missing.

---

## 🎯 Objectives

- Detect deepfake videos using a hybrid Transformer + RNN model
- Provide high-confidence predictions through face-based logic
- Offer a web-based interface for uploading and testing videos
- Enable real-time, explainable predictions with robust handling of edge cases

---

## 🧩 Architecture Overview

The system is composed of:

1. **Face Detection Module** – Uses `MTCNN` to extract faces from video frames
2. **Feature Encoder** – Extracted faces are encoded using a GRU followed by a Transformer
3. **Classification Layer** – Outputs a binary label (`Real` or `Fake`) with confidence
4. **Dashboard** – A React frontend that allows drag-and-drop video upload and shows prediction results

---

## 📁 Project Structure

deepfake-detection-hybrid-transformer/ 
│ ├── backend/ # Flask API to handle predictions 
  │ ├── app.py # Runs the prediction logic │ └── requirements.txt # Dependencies for Flask backend │ ├── frontend/ # React dashboard UI │ ├── src/ │ │ └── App.js # Core upload logic and UI │ └── package.json │ ├── notebooks/ # Training & preprocessing │ ├── face_extraction_mtcnn.ipynb │ ├── hybrid_model_training.ipynb │ ├── .gitignore └── README.md

---

## ⚙️ Setup Instructions

### ▶️ Backend (Flask API)

```bash
cd backend
pip install -r requirements.txt
python app.py
Use ngrok or similar tunneling tool to expose localhost if running in Colab or behind firewall.

🌐 Frontend (React App)

cd frontend
npm install
npm start
Make sure to update the API URL in App.js with your current ngrok/public endpoint.

🔬 Model Summary
Face Detection: facenet-pytorch (MTCNN)

Temporal Modeling: GRU layer

Global Attention: Transformer Encoder

Output: Binary classification (Real or Fake) + Confidence score

📦 Example API Usage
POST /predict
Content-Type: multipart/form-data

Body:


video: <your_video.mp4>
Response:


{
  "prediction": "Fake",
  "confidence": 0.95
}
📈 Performance Summary
Model	Accuracy	Recall	Inference Speed
CNN Baseline	84.3%	82.1%	~1.4s/video
RNN (GRU) Only	89.2%	88.6%	~1.1s/video
Hybrid (Ours)	96.4%	96.1%	~0.3s/video
The model shows significant improvement in both robustness and speed compared to baselines.

🧪 Testing Examples
Upload videos directly via the dashboard or use the following sample for batch evaluation:


result = is_video_real_or_fake("sample.mp4")
print(result["prediction"], result["confidence"])


👩‍💻 Author
Suhani Gujrati
GitHub

📜 License
This project is licensed under the MIT License.
