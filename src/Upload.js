import { useNavigate } from "react-router-dom";
import "./App.css";

function Upload() {
  const navigate = useNavigate();

  const handleUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const json = JSON.parse(event.target.result);

      localStorage.setItem("wordData", JSON.stringify(json));

      navigate("/word");
    };

    reader.readAsText(file);
  };

  return (
    <div className="container">
      <div className="title">JSON 업로드</div>

      <input type="file" accept=".json" onChange={handleUpload} />
    </div>
  );
}

export default Upload;
