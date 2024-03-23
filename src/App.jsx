import { useEffect, useState } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";

function App() {
  const url =
    "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

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

  const [quotes, setQuotes] = useState([]);
  const [index, setIndex] = useState(null);
  const [color, setColor] = useState("");
  const [tweetURL, setTweetURL] = useState("");

  const fetchQuotes = async () => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  const randomQuote = () => {
    const randomNumber = Math.floor(Math.random() * quotes.length);
    setIndex(randomNumber);

    const randomColorNumber = Math.floor(Math.random() * colors.length);
    setColor(colors[randomColorNumber]);
  };

  const stringToTweetURL = () => {
    if (quotes.length > 0) {
      console.log(index);
      const quote = quotes[index].quote;
      const author = quotes[index].author;
      const tweetString = `"${quote}" - ${author}`;
      const convertedString = tweetString
        .split(" ")
        .join("%20")
        .split("@")
        .join("%40")
        .split("!")
        .join("%21");
      const tweetURL = `https://twitter.com/intent/tweet?text=${convertedString}`;
      setTweetURL(tweetURL);
    }
  };

  useEffect(() => {
    fetchQuotes()
      .then((data) => {
        setQuotes(data.quotes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    randomQuote();
  }, [quotes]);

  useEffect(() => {
    stringToTweetURL();
  }, [index]);

  if (quotes.length === 0) {
    return <section>Loading...</section>;
  } else {
    return (
      <>
        <section
          style={{
            backgroundColor: color,
          }}
        >
          <div className="wrapper relative z-[2]">
            <div className="rounded relative w-[450px] bg-white py-10 px-[50px] table">
              <div
                className="text-center w-[450px] h-auto clear-both font-medium text-[1.75em] transition duration-500 ease-in-out"
                style={{ color: color }}
              >
                <FontAwesomeIcon
                  className="text-[1em] mr-[0.4em]"
                  icon={faQuoteLeft}
                />
                <span>{quotes[index].quote}</span>
              </div>
              <div
                className="w-[450px] h-auto clear-both pt-5 text-[1em] text-right transition-colors duration-500 ease-in-out"
                style={{ color: color }}
              >
                <span>- {quotes[index].author}</span>
              </div>
              <div className="w-[450px] m-auto block font-medium">
                <a
                  className="float-left pt-2 text-center font-[1.2em] mr-[5px] h-[30px] w-10 border-none rounded text-white outline-none mt-[30px] cursor-pointer pb-[30px] transition duration-500 ease-in-out"
                  style={{ backgroundColor: color }}
                  href={tweetURL}
                  target="_blank"
                  type="button"
                >
                  <FontAwesomeIcon icon={faXTwitter} />
                </a>
                <button
                  className="float-right h-10 border-none rounded text-white outline-none text-[0.85em] pt-2 px-[18px] pb-1.5 mt-[30px] opacity-[1] transition duration-500 ease-in-out"
                  onClick={randomQuote}
                  style={{ backgroundColor: color }}
                >
                  New Quote
                </button>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default App;
