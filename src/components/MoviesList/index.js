import { Component } from "react";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import "./index.css";
class MoviesList extends Component {
  state = { movieDetails: [], isCompanyInfoOpen: false };

  componentDidMount() {
    this.fetchData();
  }
  fetchData = async () => {
    const Api = "https://hoblist.com/api/movieList";
    const body = {
      category: "movies",
      language: "kannada",
      genre: "all",
      sort: "voting",
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    };
    try {
      const res = await fetch(Api, requestOptions);

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      this.setState({ movieDetails: data.result });
      localStorage.setItem("result", JSON.stringify(data.result));
    } catch (err) {
      console.log("Error fetching movie data", err);
    }
  };
  increaseVote = (id) => {
    const { movieDetails } = this.state;
    const votes = movieDetails.map((data) =>
      data._id === id ? { ...data, totalVoted: data.totalVoted + 1 } : data
    );
    this.setState({ movieDetails: votes });
    localStorage.setItem("result", JSON.stringify(votes));
  };

  decreaseVote = (id) => {
    const { movieDetails } = this.state;
    const votes = movieDetails.map((data) =>
      data._id === id ? { ...data, totalVoted: data.totalVoted - 1 } : data
    );
    this.setState({ movieDetails: votes });
    localStorage.setItem("result", JSON.stringify(votes));
  };

  openCompanyInfoModal = () => {
    this.setState({ isCompanyInfoOpen: true });
  };

  closeCompanyInfoModal = () => {
    this.setState({ isCompanyInfoOpen: false });
  };

  render() {
    const { movieDetails, isCompanyInfoOpen } = this.state;
    return (
      <div className="movie-list-container">
        <button onClick={this.openCompanyInfoModal} className="menu-item">
          Company Info
        </button>
        {movieDetails.map((movieItem) => (
          <div key={movieItem._id} className="card">
            <div className="vote-container">
              <button onClick={() => this.increaseVote(movieItem._id)}>
                <AiOutlineArrowUp size={40} />
              </button>
              <p className="vote-count">{movieItem.noOfvotesInc}</p>
              <button onClick={() => this.decreaseVote(movieItem._id)}>
                <AiOutlineArrowDown size={40} />
              </button>
              <p className="vote-label">Votes</p>
            </div>
            <img
              src={movieItem.poster}
              alt="Movie Poster"
              className="movie-image"
            />
            <div className="movie-details">
              <h1 className="movie-title">Title : </h1>
              <h3 className="movie-title">{movieItem.title}</h3>
            </div>

            <div className="movie-details">
              <h3 className="movie-title">Genre:</h3>
              <h3 className="movie-title">{movieItem.genre}</h3>
            </div>

            <div className="movie-info">
              <h3 className="info-key">Starring:</h3>
              <h3 className="info-value">{movieItem.stars}</h3>
            </div>

            <div className="movie-info">
              <h3 className="info-value">
                {movieItem.duration} Mins | {movieItem.language}
              </h3>
            </div>
            <div className="movie-info">
              <h3 className="views">
                {movieItem.pageViews} Views | Voted by {movieItem.totalVoted}
              </h3>
            </div>
            <button className="watch-trailer-button">Watch trailer</button>
          </div>
        ))}
        {isCompanyInfoOpen && (
          <div className="company-info-modal">
            <h2>Company Info</h2>
            <p>Company: Geeksynergy Technologies Pvt Ltd</p>
            <p>Address: Sanjayanagar, Bengaluru-56</p>
            <p>Phone: XXXXXXXXX09</p>
            <p>Email: XXXXXX@gmail.com</p>
            <button onClick={this.closeCompanyInfoModal}>Close</button>
          </div>
        )}
      </div>
    );
  }
}

export default MoviesList;
