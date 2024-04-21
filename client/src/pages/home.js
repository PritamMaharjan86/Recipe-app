import React, { useState, useEffect } from "react";

import "./home.css";
import Loader from "../components/loader";

function Home() {
  const [recipe, setRecipe] = useState("");
  const [output, setOutput] = useState([]);
  const [loading, setLoading] = useState(false);
  const [like, setLike] = useState(false);

  const handleLike = (e) => {
    setLike(true);
  };

  const handleChange = (e) => {
    setRecipe(e.target.value);
    console.log("recipe", recipe);
  };

  const detectKey = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    // calling API with headers
    const api_url = `https://api.api-ninjas.com/v1/recipe?query=${recipe}`;
    try {
      const response = await fetch(api_url, {
        method: "get",
        headers: {
          "X-Api-Key": "6rZ6rEmt1bGPz9YUP31rPA==QK5ias8tqlCLrFxZ",
        },
      });

      const data = await response.json();

      setOutput(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  console.log("output", output);
  return (
    <div className="App">
      <div className="search-bar">
        <input
          className="input"
          type="text"
          placeholder="Search for recipe"
          // to get event from handleChange
          onChange={(e) => handleChange(e)}
          onKeyUp={(e) => detectKey(e)}
        ></input>
        {loading && (
          <div className="blur-background">
            <Loader />
          </div>
        )}
      </div>

      <div className="recipes">
        <h1>Recipes</h1>

        {output.map((data, index) => {
          return (
            <>
              <div className="likeButton">
                <button onClick={handleLike}>{like ? "Unlike" : "Like"}</button>
              </div>
              <div className="board" key={index}>
                <span>
                  <h2>{data.title} </h2>
                </span>
                <br />
                <span>Ingredients</span>
                <div>
                  {data.ingredients.split("|").map((i, index) => (
                    <li key={index}>{i}</li>
                  ))}
                </div>
                <br />
                <span>Instructions </span>
                {data.instructions}
                <br />
              </div>
              <br />
            </>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
