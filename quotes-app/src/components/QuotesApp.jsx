// import { text } from "express";
import { useState } from "react"

const QuotesApp = () => {
    const [quote, setQuote] = useState({
        text: "ask not what country can do for you ask what you can do for a country",
        author: "Jhon Kenedy"
    })

    const [favorites, setFavorites] = useState([])

    const [showFavorites, setShowFavorite] = useState(false);


    const fetchNewQuote = async () => {
        const url = 'https://dummyjson.com/quotes';
        const response = await fetch(url);
        const data = await response.json();

        // pick random quote from the quotes array
        const randomIndex = Math.floor(Math.random() * data.quotes.length);
        const randomQuote = data.quotes[randomIndex];

        setQuote({
            text: randomQuote.quote,
            author: randomQuote.author || "Unknown",
        });

    }

    const toggleFavorite = () => {
        setShowFavorite(!showFavorites)
    }

    const addToFavorites = () => {
        const isAlradyInFavorites = favorites.some((fav) => fav.text === quote.text && fav.author === quote.author)

        if (!isAlradyInFavorites) {
            setFavorites([...favorites, quote])
        }

    }

    return (
        <div className="container">
            <div className="quotes-app">
                <h1 className="app-heading">Quote</h1>
                <i className="bx bxs-heart fav-icon" onClick={toggleFavorite}></i>
                <div className="quotes">
                    <i className="bx bxs-quote-alt-left left-quote"></i>
                    <p className="quote-text">{quote.text}</p>
                    <p className="quote-author">{quote.author}</p>
                    <i className="bx bxs-quote-alt-right right-quote"></i>
                </div>
                <div className="circles">
                    <div className="circles1"></div>
                    <div className="circles2"></div>
                    <div className="circles3"></div>
                    <div className="circles4"></div>
                </div>
                <div className="buttons">
                    <button className="btn btn-new" onClick={fetchNewQuote}>New Quotes</button>
                    <button className="btn btn-fav" onClick={addToFavorites}>Add to Favorites</button>
                </div>

                {showFavorites && (
                    <div className="favorites">
                        <button className="btn-close" onClick={toggleFavorite}>
                            <i className="bx bx-x"></i>
                        </button>
                        {favorites.map((favQuote, index) => (
                            <div className="fav-quote" key={index}>
                                <div className="fav-quote-delete">
                                    <i className="bx bx-x-circle" onClick={() => {
                                        const updatedfavorites = favorites.filter((item, i) =>
                                            i != index)
                                        setFavorites(updatedfavorites)
                                    }}></i>
                                </div>
                                <div className="fav-quote-contents">
                                    <div className="fav-quote-text">
                                        {favQuote.text}
                                    </div>
                                    <div className="fav-quote-author">
                                        {favQuote.author}
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                )}


            </div>
        </div>
    )
}

export default QuotesApp
