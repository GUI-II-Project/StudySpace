import React, { useEffect, useState } from "react";

const Quote = () => {
  const [quote, setQuote] = useState(
    "You get in life what you have the courage to ask for.",
  );
  const [author, setAuthor] = useState("Oprah Winfrey");

  useEffect(() => {
    const getQuote = async () => {
      try {
        const today = new Date().toISOString().split("T")[0];
        const storedQuote = JSON.parse(localStorage.getItem("quote"));

        if (storedQuote && storedQuote.date === today) {
          setQuote(storedQuote.quote);
          setAuthor(storedQuote.author);
        } else {
          const response = await fetch("https://qapi.vercel.app/api/random");
          const data = await response.json();
          if (data) {
            setQuote(data.quote);
            setAuthor(data.author);

            localStorage.setItem(
              "quote",
              JSON.stringify({
                quote: data.quote,
                author: data.author,
                date: today,
              }),
            );
          }
        }
      } catch (error) {
        console.error("Error fetching quote:", error);
      }
    };

    getQuote();
  }, []);

  return (
    <div
      style={{
        color: "white",
        textAlign: "center",
        paddingBottom: "2rem",
        paddingTop: "2rem",
      }}
    >
      <p>
        "{quote}" - {author}
      </p>
    </div>
  );
};

export default Quote;
