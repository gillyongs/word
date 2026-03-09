import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Word() {
  const [words, setWords] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("wordData");

    if (data) {
      setWords(JSON.parse(data));
    }
  }, []);

  const toggleCard = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  const shuffleWords = () => {
    const shuffled = [...words].sort(() => Math.random() - 0.5);

    setWords(shuffled);
    setOpenIndex(null);
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

  const handleLongPress = (index) => {
    navigate("/wordedit/" + index);
  };

  return (
    <div className="container">
      <div className="header">
        <div className="title">📚 단어장</div>

        <div className="btnGroup">
          <button className="saveJsonBtn" onClick={downloadJSON}>
            💾
          </button>

          <button className="shuffleBtn" onClick={shuffleWords}>
            🔀
          </button>

          <button className="addBtn" onClick={() => navigate("/wordplus")}>
            + 단어
          </button>
        </div>
      </div>

      {words.map((w, i) => {
        let timer;

        return (
          <div
            className="card"
            key={i}
            onClick={() => toggleCard(i)}
            onMouseDown={() => {
              timer = setTimeout(() => handleLongPress(i), 600);
            }}
            onMouseUp={() => clearTimeout(timer)}
            onMouseLeave={() => clearTimeout(timer)}
            onTouchStart={() => {
              timer = setTimeout(() => handleLongPress(i), 600);
            }}
            onTouchEnd={() => clearTimeout(timer)}>
            <div className="word">{w.word}</div>

            {openIndex === i && (
              <>
                <div className="meaning">{w.meaning}</div>

                <div className="content">{w.content}</div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Word;
