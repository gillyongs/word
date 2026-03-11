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
    const data = JSON.parse(localStorage.getItem("wordData")) || [];

    const target = data.find((w) => w.id == id);

    if (target) {
      setWord(target.word);
      setMeaning(target.meaning);
      setContent(target.content);
    }
  }, [id]);

  const saveEdit = () => {
    const data = JSON.parse(localStorage.getItem("wordData")) || [];

    const newData = data.map((w) => (w.id == id ? { ...w, word, meaning, content } : w));

    localStorage.setItem("wordData", JSON.stringify(newData));

    navigate("/word");
  };

  const deleteWord = () => {
    const data = JSON.parse(localStorage.getItem("wordData")) || [];

    const newData = data.filter((w) => w.id != id);

    localStorage.setItem("wordData", JSON.stringify(newData));

    navigate("/word");
  };

  return (
    <div className="container">
      <div className="title">단어 수정</div>

      <input className="input" autoCapitalize="none" value={word} onChange={(e) => setWord(e.target.value)} />

      <input className="input" value={meaning} onChange={(e) => setMeaning(e.target.value)} />

      <textarea className="input" autoCapitalize="none" rows={10} value={content} onChange={(e) => setContent(e.target.value)} />

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
