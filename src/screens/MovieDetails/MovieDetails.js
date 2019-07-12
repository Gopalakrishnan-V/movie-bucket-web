import React, { Component } from "react";
import { withRouter } from "react-router";
import { Image, Header, Icon } from "semantic-ui-react";
// import queryString from "query-string";
import axios from "axios";
import { baseImageUrl } from "../../helpers/Constants";
import "./MovieDetails.css";
import moment from "moment";
import _ from "lodash";

export class MovieDetails extends Component {
  state = {
    data: null,
    cast: [],
    crew: []
  };

  componentWillMount = async () => {
    const { id } = this.props.match.params;
    try {
      const { data: movieData } = await axios.get(
        `https://tmdb-proxy.herokuapp.com/3/movie/${id}?api_key=628f811dd14b86f8fea17c431c364235&language=en-US`
      );
      const { data: creditsData } = await axios.get(
        `https://tmdb-proxy.herokuapp.com/3/movie/${id}/credits?api_key=628f811dd14b86f8fea17c431c364235&language=en-US`
      );
      const { cast, crew } = creditsData;
      this.setState({ data: movieData, cast, crew });
    } catch (error) {}
  };

  render() {
    const { data, cast, crew } = this.state;
    if (!data) {
      return null;
    }

    const {
      backdrop_path,
      poster_path,
      title,
      tagline,
      genres,
      release_date,
      overview
    } = data;

    return (
      <div>
        <div
          style={{
            backgroundImage: `url(${baseImageUrl + backdrop_path})`
          }}
          className="cover"
        >
          <div className="overlay" />
        </div>
        <div className="row movie-content">
          <div className="column poster-left">
            <Image className="poster" src={baseImageUrl + poster_path} />
            <span
              className="text font-small"
              style={{ textAlign: "center", marginTop: 10 }}
            >
              {tagline}
            </span>
          </div>

          <div className="column movie-content-right">
            <Header as="h1" className="text-white" style={{ marginTop: 5 }}>
              {title}
            </Header>

            <div className="row chips-container">
              {genres.map((genre, index) => {
                return (
                  <span className="chip text-white font-small" key={index}>
                    {genre.name.toUpperCase()}
                  </span>
                );
              })}
            </div>
            <span className="text-white font-medium" style={{ marginTop: 15 }}>
              <Icon name="calendar alternate outline" />{" "}
              {moment(release_date).format("DD MMM, YYYY")}
            </span>

            <div className="column" style={{ marginTop: 50 }}>
              <Header as="h3">Synopsis</Header>
              <span className="font-medium">{overview}</span>
            </div>

            <div className="column" style={{ marginTop: 50 }}>
              <Header as="h3">Cast</Header>
              <div className="row" style={{ marginLeft: -15, marginTop: -10 }}>
                {_.slice(cast, 0, 10).map((item, index) => {
                  return (
                    <div
                      className="column"
                      key={index}
                      style={{ padding: 15, alignItems: "center" }}
                    >
                      <img
                        src={baseImageUrl + item.profile_path}
                        className="img-profile"
                      />
                      <span className="font-medium">{item.name}</span>
                      <span className="font-small">{item.character}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="column" style={{ marginTop: 50 }}>
              <Header as="h3">Crew</Header>
              <div className="row" style={{ marginLeft: -15, marginTop: -10 }}>
                {_.slice(crew, 0, 10).map((item, index) => {
                  const { profile_path } = item;
                  const dp = profile_path
                    ? baseImageUrl + profile_path
                    : "https://sherwin.scene7.com/is/image/sw/color-swatch?_tparam_size=250,250&layer=comp&_tparam_color=C2C0BB";
                  return (
                    <div
                      className="column"
                      key={index}
                      style={{ padding: 15, alignItems: "center" }}
                    >
                      <img src={dp} className="img-profile" />
                      <span className="font-medium">{item.name}</span>
                      <span className="font-small">{item.job}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(MovieDetails);
