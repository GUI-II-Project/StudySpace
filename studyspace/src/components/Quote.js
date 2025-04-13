import React, { useEffect, useState } from "react";

const Quote = () => {
  const [quote, setQuote] = useState(
    "You get in life what you have the courage to ask for.",
  );
  const [author, setAuthor] = useState("Oprah Winfrey");

  useEffect(() => {
    const getQuote = async () => {
      try {
        const response = await fetch("https://zenquotes.io/api/today");
        const data = await response.json();
        if (data && data[0]) {
          setQuote(data[0].q);
          setAuthor(data[0].a);
        }
      } catch (error) {
        console.error("Error fetching quote of the day:", error);
      }
    };

    getQuote();
  }, []);

  return (
    <div style={{ color: "white", textAlign: "center", paddingBottom: "2rem" }}>
      <p>
        "{quote}" - {author}
      </p>
    </div>
  );
};

export default Quote;
