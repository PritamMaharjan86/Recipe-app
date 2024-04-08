import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [recipe, setRecipe] = useState("");

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
    const api_url = `https://api.api-ninjas.com/v1/recipe?query=${recipe}`;
    try {
      const response = await fetch(api_url, {
        method: "get",
        headers: {
          "X-Api-Key": "6rZ6rEmt1bGPz9YUP31rPA==QK5ias8tqlCLrFxZ",
        },
      });
      var data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <div className="search-bar">
        <input
          className="input"
          type="text"
          placeholder="Search for recipe"
          onChange={(e) => handleChange(e)}
          onKeyUp={(e) => detectKey(e)}
        ></input>
      </div>
    </div>
  );
}

export default App;
