import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Word() {
  const [words, setWords] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("wordData");

    if (data) {
      setWords(JSON.parse(data));
    }
  }, []);

  const toggleCard = (id) => {
    if (openId === id) {
      setOpenId(null);
    } else {
      setOpenId(id);
    }
  };

  const shuffleWords = () => {
    const shuffled = [...words].sort(() => Math.random() - 0.5);
    setWords(shuffled);
    setOpenId(null);
  };

  const sortWords = () => {
    const sorted = [...words].sort((a, b) => a.word.localeCompare(b.word, "ko"));
    setWords(sorted);
    setOpenId(null);
  };

  const downloadJSON = () => {
    const data = localStorage.getItem("wordData");

    const blob = new Blob([data], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "words.json";

    a.click();

    URL.revokeObjectURL(url);
  };

  const handleLongPress = (id) => {
    navigate("/wordedit/" + id);
  };

  const filteredWords = words.filter((w) => (w.word + w.meaning + w.content).toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="container">
      <div className="header">
        <div className="title">📚 단어장</div>

        <div className="btnGroup">
          <button onClick={sortWords}>🔤</button>
          <button onClick={downloadJSON}>💾</button>
          <button onClick={shuffleWords}>🔀</button>
        </div>
      </div>

      <input className="searchBox" type="text" placeholder="🔍 단어 검색" value={search} onChange={(e) => setSearch(e.target.value)} />

      {filteredWords.map((w) => {
        let timer;

        return (
          <div
            className="card"
            key={w.id}
            onClick={() => toggleCard(w.id)}
            onMouseDown={() => {
              timer = setTimeout(() => handleLongPress(w.id), 900);
            }}
            onMouseUp={() => clearTimeout(timer)}
            onMouseLeave={() => clearTimeout(timer)}
            onTouchStart={() => {
              timer = setTimeout(() => handleLongPress(w.id), 900);
            }}
            onTouchEnd={() => clearTimeout(timer)}>
            <div className="word">{w.word}</div>

            {openId === w.id && (
              <>
                <div className="meaning">{w.meaning}</div>
                <div className="content">{w.content}</div>
              </>
            )}
          </div>
        );
      })}

      <button className="floatingAddBtn" onClick={() => navigate("/wordplus")}>
        + 단어
      </button>
    </div>
  );
}

export default Word;
