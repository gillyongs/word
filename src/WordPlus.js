import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function WordPlus() {
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const saveWord = () => {
    const data = localStorage.getItem("wordData");
    let words = data ? JSON.parse(data) : [];

    const newWord = {
      id: Date.now(),
      word,
      meaning,
      content,
    };

    words.push(newWord);

    localStorage.setItem("wordData", JSON.stringify(words));

    navigate("/word");
  };

  return (
    <div className="container">
      <div className="title">단어 추가</div>

      <input className="input" placeholder="word" value={word} autoCapitalize="none" onChange={(e) => setWord(e.target.value)} />

      <input className="input" placeholder="meaning" value={meaning} onChange={(e) => setMeaning(e.target.value)} />

      <textarea rows={10} className="input" placeholder="content" value={content} autoCapitalize="none" onChange={(e) => setContent(e.target.value)} />

      <button className="saveBtn" onClick={saveWord}>
        저장
      </button>
    </div>
  );
}

export default WordPlus;
