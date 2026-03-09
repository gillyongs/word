import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./App.css";

function WordEdit() {
  const { id } = useParams();

  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("wordData"));

    const target = data[id];

    setWord(target.word);
    setMeaning(target.meaning);
    setContent(target.content);
  }, [id]);

  const saveEdit = () => {
    const data = JSON.parse(localStorage.getItem("wordData"));

    data[id] = { word, meaning, content };

    localStorage.setItem("wordData", JSON.stringify(data));

    navigate("/word");
  };

  const deleteWord = () => {
    const data = JSON.parse(localStorage.getItem("wordData"));

    data.splice(id, 1);

    localStorage.setItem("wordData", JSON.stringify(data));

    navigate("/word");
  };

  return (
    <div className="container">
      <div className="title">단어 수정</div>

      <input className="input" value={word} onChange={(e) => setWord(e.target.value)} />

      <input className="input" value={meaning} onChange={(e) => setMeaning(e.target.value)} />

      <textarea className="input" rows="5" value={content} onChange={(e) => setContent(e.target.value)} />

      <button className="saveBtn" onClick={saveEdit}>
        수정 저장
      </button>

      <button className="deleteBtn" onClick={deleteWord}>
        삭제
      </button>
    </div>
  );
}

export default WordEdit;
