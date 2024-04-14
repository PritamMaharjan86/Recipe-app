import React, { useState, useEffect } from "react";

import "./App.css";
import Loader from "./components/loader";

function App() {
  const [recipe, setRecipe] = useState("");
  const [output, setOutput] = useState([]);
  const [loading, setLoading] = useState(false);

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

      <div className="display">
        <h2>Recipes</h2>

        {console.log(output)}
        {output.map((data, index) => {
          return (
            <>
              <div className="board" key={index}>
                <span>Title: {data.title}</span>
                <br />
                <span>Ingredients: {data.ingredients}</span>
                <br />
                <p>Instructions: {data.instructions}</p>
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

export default App;
