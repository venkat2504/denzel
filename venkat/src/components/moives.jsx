import React, { Component } from "react";
import axios from "axios";
import style from "styled-components";

class Movies extends Component {
  state = {
    data: [],
  };

  async componentDidMount() {
    const { data } = await axios.get("http://localhost:3030/denzel/movie/watch");

    this.setState({ data });
    // console.log("data", data);
  }

  render() {
    console.log("data", this.state.data);
    let optionItems = this.state.data.map((data) =>
      <option key={data.title}>{data.title}</option>
    );
    return (
      <div>
        <div className="container ">
          <div>
            <select>
              {optionItems}
            </select>
          </div>
          {this.state.data.map((data) => (
            <div className=" card ">
              <div className="img-container p-5 img">
                <div className="row">
                  <div calssName="col-2">
                    <img src={data.poster} alt={data.poster} width="90px" />
                  </div>
                  <div calssName="col-xs-5">
                    <h3> {data.title}</h3>
                    <h6> Rating:- {data.rating}</h6>
                    <h6> Metascore:- {data.metascore}</h6>
                    <div> Synopsis:- {data.synopsis}</div>

                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Movies;
