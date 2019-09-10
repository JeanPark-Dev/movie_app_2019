import React from 'react';
import axios from "axios";
import Movie from "./Movie";
import "./App.css";

class App extends React.Component{
  state = {
    isLoading: true,
    movies: []
  };
  getMovies = async () => {
    const { 
      data: { 
        data: {movies}
      }
    } = await axios.get("https://yts.lt/api/v2/list_movies.json?sort_by=rating");
    this.setState({movies: movies, isLoading: false});
    console.log(this.state.movies);
  }

  componentDidMount() {
    this.getMovies();
  }
  render() {
    const { isLoading, movies } = this.state;
    return (
      <div >{ isLoading 
        ? (
          <div>
            <span class="load_text">Loading...</span>
          </div>
        )
        : movies.map(movie => (
          <div class="movie__list">
            <Movie 
              key={movie.id}
              id={movie.id}
              year={movie.year}
              title={movie.title}
              summary={movie.summary}
              poster={movie.medium_cover_image}
            />
          </div>
        ))}
    </div>
    );
    
  }
}

export default App;
