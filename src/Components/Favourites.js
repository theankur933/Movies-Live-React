import React, { Component } from "react";
export default class Favourites extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      genre: [],
      currGenre: "All Genre",
      curText: "",
      currpage: 1,
      limit: 5,
    };
  }

  async componentDidMount() {
    let results = JSON.parse(localStorage.getItem("movies"));
    let genreId = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Sci-Fi",
      10770: "TV",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };
    let genreArr = [];
    results.map((movieObj) => {
      if (!genreArr.includes(genreId[movieObj.genre_ids[0]])) {
        genreArr.push(genreId[movieObj.genre_ids[0]]);
      }
    });
    genreArr.unshift("All Genre");
    // console.log(genreArr);
    this.setState({
      movies: [...results],
      genre: [...genreArr],
    });
  }

  handleCurrGenre = (genre) => {
    this.setState({
      currGenre: genre,
    });
  };

  handleText = (e) => {
    this.setState({
      curText: e.target.value,
    });
  };

  sortPopularityAsc = () => {
    let allMovies = this.state.movies;
    allMovies.sort((a, b) => {
      return a.popularity - b.popularity;
    });
    this.setState({
      movies: [...allMovies],
    });
  };
  sortPopularityDesc = () => {
    let allMovies = this.state.movies;
    allMovies.sort((a, b) => {
      return b.popularity - a.popularity;
    });
    this.setState({
      movies: [...allMovies],
    });
  };
  sortRatingAsc = () => {
    let allMovies = this.state.movies;
    allMovies.sort((a, b) => {
      return b.vote_average - a.vote_average;
    });
    this.setState({
      movies: [...allMovies],
    });
  };
  sortRatingDesc = () => {
    let allMovies = this.state.movies;
    allMovies.sort((a, b) => {
      return b.vote_average - a.vote_average;
    });
    this.setState({
      movies: [...allMovies],
    });
  };
  handlePageNum = (page) => {
    this.setState({
      currpage: page,
    });
  };
  handleSearch = (e) => {
    this.setState({
      limit: e.target.value,
    });
  };

  handleDelete = (id) => {
    let nMovies = this.state.movies.filter((movieObj) => {
      return movieObj.id != id;
    });
    this.setState({
      movies: [...nMovies],
    });
    localStorage.setItem("movies", JSON.stringify(nMovies));
  };
  render() {
    let genreId = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Sci-Fi",
      10770: "TV",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };
    let filterdArr = [];
    if (this.state.curText === "") {
      filterdArr = this.state.movies;
    } else {
      filterdArr = this.state.movies.filter((movieObj) => {
        let movieName = movieObj.original_title.toLowerCase();
        return movieName.includes(this.state.curText);
      });
    }
    if (this.state.currGenre !== "All Genre") {
      filterdArr = filterdArr.filter(
        (movieObj) => genreId[movieObj.genre_ids[0]] === this.state.currGenre
      );
    }

    let numOfPages = Math.ceil(filterdArr.length / this.state.limit);
    let pageArr = [];
    for (let i = 1; i <= numOfPages; i++) {
      pageArr.push(i);
    }
    let si = (this.state.currpage - 1) * this.state.limit;
    let li = si + this.state.limit - 1;
    filterdArr = filterdArr.slice(si, li + 1);

    return (
      <div className="row">
        <div className="col-3">
          <ul class="list-group">
            {this.state.genre.map((genre) =>
              this.state.currGenre === genre ? (
                <li class="list-group-item active" aria-current="true">
                  {genre}
                </li>
              ) : (
                <li
                  class="list-group-item"
                  aria-current="true"
                  onClick={() => this.handleCurrGenre(genre)}
                >
                  {genre}
                </li>
              )
            )}
          </ul>
        </div>
        <div className="col">
          <div className="row">
            <input
              type="text"
              className="col"
              placeholder="search"
              value={this.state.curText}
              onChange={this.handleText}
            ></input>
            <input
              type="number"
              className="col"
              value={this.state.limit}
              onChange={this.handleSearch}
            ></input>
          </div>

          <div className="row">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Genre</th>
                  <th scope="col">
                    <i
                      class="fa-solid fa-caret-up"
                      onClick={this.sortPopularityAsc}
                    />{" "}
                    Popularity{" "}
                    <i
                      class="fa-solid fa-caret-up"
                      onClick={this.sortPopularityDesc}
                    />
                  </th>
                  <th scope="col">
                    <i
                      class="fa-solid fa-caret-up"
                      onClick={this.sortRatingAsc}
                    />{" "}
                    Rating{" "}
                    <i
                      class="fa-solid fa-caret-down"
                      onClick={this.sortRatingDesc}
                    />{" "}
                  </th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {filterdArr.map((movieObj) => (
                  <tr>
                    <th scope="row">
                      <img
                        width="50px"
                        src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                      />
                      {movieObj.original_title}
                    </th>
                    <td>{genreId[movieObj.genre_ids[0]]}</td>
                    <td>{movieObj.popularity}</td>
                    <td>{movieObj.vote_average}</td>
                    <td>
                      <button
                        class="btn btn-outline-danger"
                        onClick={() => this.handleDelete(movieObj.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div style={{ marginLeft: "50rem" }}>
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              {pageArr.map((page) => (
                <li class="page-item">
                  <a class="page-link" onClick={() => this.handlePageNum(page)}>
                    {page}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}
