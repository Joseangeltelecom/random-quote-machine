import "./App.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSpring, animated, config } from "react-spring";

function App() {
  useSpring();

  const colors = [
    "#16a085",
    "#27ae60",
    "#2c3e50",
    "#f39c12",
    "#e74c3c",
    "#9b59b6",
    "#FB6964",
    "#342224",
    "#472E32",
    "#BDBB99",
    "#77B1A9",
    "#73A857",
  ];

  const [fetchedData, setFetchData] = useState([]);
  const [author, setAuthor] = useState("Steve Jobs");
  const [quote, setQuote] = useState(
    "The only way to do great work is to love what you do."
  );
  const [show, setShow] = useState(false);
  const [dataColor, setDataColor] = useState("brown");

  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(
        "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
      );
      setFetchData(data);
    };

    getData();
  }, []);

  function getRandomQuote() {
    return fetchedData.data.quotes[
      Math.floor(Math.random() * fetchedData.data.quotes.length)
    ];
  }

  function getQuote() {
    let RandomColor = Math.floor(Math.random() * colors.length);
    console.log(RandomColor);
    let randomQuote = getRandomQuote();
    setQuote(randomQuote.quote);
    setAuthor(randomQuote.author);
    setShow(!show);
    setDataColor(colors[RandomColor]);
  }

  const backgroundProp = useSpring({
    from: { backgroundColor: "white" },
    to: { backgroundColor: dataColor },
    delay: 400,
    config: config.stiff,
  });

  const fade = useSpring({
    to: { opacity: 1, color: dataColor },
    from: { opacity: 0, color: "white" },
    config: config.stiff,
    reverse: show,

    onRest: () => setShow(false),
  });
  return (
    <animated.div style={backgroundProp} className="App">
      <div id="wrapper">
        <div id="quote-box">
          <animated.div style={fade} class="quote-text">
            <i class="fa fa-quote-left"> </i>
            <span id="text">{quote}</span>
          </animated.div>
          <div class="quote-author">
            <animated.span style={fade} id="author">
              - {author}
            </animated.span>
          </div>
          <div class="buttons">
            <animated.a
              style={backgroundProp}
              href={`https://twitter.com/intent/tweet?text=${quote}`}
              class="button"
              id="tweet-quote"
              title="Tweet this quote!"
              target="_top"
            >
              <i class="fa fa-twitter"></i>
            </animated.a>
            <animated.button
              style={backgroundProp}
              className="button"
              id="new-quote"
              onClick={getQuote}
            >
              New quote
            </animated.button>
          </div>
        </div>
        <div class="footer">
          by
          <a href="https://github.com/Joseangeltelecom?tab=repositories">
            Jose Angel
          </a>
        </div>
      </div>
    </animated.div>
  );
}

export default App;
