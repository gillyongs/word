import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import "./App.css";

function Upload() {
  const navigate = useNavigate();
  const fileInputRef = useRef();

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);

        localStorage.setItem("wordData", JSON.stringify(json));

        navigate("/word");
      } catch {
        alert("JSON 파일 형식이 아닙니다.");
      }
    };

    reader.readAsText(file);
  };

  const openFile = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="container uploadPage">
      <div className="title">단어 JSON 업로드</div>

      <button className="uploadBtn" onClick={openFile}>
        📂 JSON 파일 선택
      </button>

      <input type="file" accept=".json" ref={fileInputRef} onChange={handleUpload} style={{ display: "none" }} />
    </div>
  );
}

export default Upload;
