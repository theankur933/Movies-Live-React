import React, { Component } from "react";
import axios from "axios";
export default class List extends Component {
  constructor() {
    super();
    this.state = {
      hover: "",
      parr: [1],
      currPage: 1,
      movies: [],
      fm: [], //this will store the id for added favourite
    };
  }
  handleEnter = (id) => {
    this.setState({
      hover: id,
    });
  };
  handleLeave = () => {
    this.setState({
      hover: "",
    });
  };

  changeMovie = async () => {
    console.log(this.state.currPage);
    console.log("movie changed");
    let res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=32c3d6c3f2e25bdbb3a269c9e549ab51&language=en-US&page=${this.state.currPage}`
    );
    // console.log(res.data);
    this.setState({
      movies: [...res.data.results],
    });
  };

  handlePrev = () => {
    if (this.state.currPage != 1) {
      this.setState(
        {
          currPage: this.state.currPage - 1,
        },
        this.changeMovie
      );
    }
  };
  handleNext = () => {
    let tempArr = [];
    for (let i = 1; i <= this.state.parr.length + 1; i++) {
      tempArr.push(i);
    }
    this.setState(
      {
        parr: [...tempArr],
        currPage: this.state.currPage + 1,
      },
      this.changeMovie
    );
  };
  handlepageNum = (pageNum) => {
    this.setState(
      {
        currPage: pageNum,
      },
      this.changeMovie
    );
  };

  handleFavourites = (movieObj) => {
    let localStorageMovies = JSON.parse(localStorage.getItem("movies")) || [];

    if (this.state.fm.includes(movieObj.id)) {
      localStorageMovies = localStorageMovies.filter(
        (movie) => movie.id != movieObj.id
      );
    } else localStorageMovies.push(movieObj);
    console.log(localStorageMovies);

    localStorage.setItem("movies", JSON.stringify(localStorageMovies));

    let tempData = localStorageMovies.map((movieObj) => movieObj.id);
    this.setState({
      fm: [...tempData],
    });
  };

  async componentDidMount() {
    let res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=32c3d6c3f2e25bdbb3a269c9e549ab51&language=en-US&page=${this.state.currPage}`
    );
    // console.log(res.data);
    this.setState({
      movies: [...res.data.results],
    });
  }

  render() {
    // console.log("render is called ")
    // let movie = movies.results;
    return (
      <>
        {this.state.movies.length === 0 ? (
          <div className="spinner-border text-secondary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div>
            <h3 className="text-center">
              <strong>Trending movies</strong>
            </h3>
            <div>
              <div className="movies-list">
                {this.state.movies.map((movieObj) => (
                  <div>
                    <div
                      className="card movie-card"
                      onMouseEnter={() => this.handleEnter(movieObj.id)}
                      onMouseLeave={this.handleLeave}
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                        className="card-img-top Movie-img "
                        alt="..."
                        style={{ width: "20vw", heigth: "40vh" }}
                      />

                      <h5 className="card-title movie-title">
                        {movieObj.original_title}
                      </h5>

                      <div className="button-wrapper">
                        {this.state.hover === movieObj.id && (
                          <a
                            class="btn btn-danger movie-button"
                            onClick={() => this.handleFavourites(movieObj)}
                          >
                            {this.state.fm.includes(movieObj.id)
                              ? "Remove from favourite"
                              : "Add to favourite"}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pegination">
              <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <li class="page-item">
                    <a class="page-link" onClick={this.handlePrev}>
                      Previous
                    </a>
                  </li>
                  {this.state.parr.map((pageNum) => (
                    <li class="page-item">
                      <a
                        class="page-link"
                        onClick={() => {
                          this.handlepageNum(pageNum);
                        }}
                      >
                        {pageNum}
                      </a>
                    </li>
                  ))}
                  <li class="page-item">
                    <a class="page-link" onClick={this.handleNext}>
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}
      </>
    );
  }
}
