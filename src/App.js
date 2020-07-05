import React,{useEffect,useState} from 'react';
import Recipe from "./Recipe.js";
import './App.css';

const App = () => {
  const APP_ID = "b6985e25";
  const APP_KEY = "213068f5849d29aea0c05ed63221d213";

  useEffect(() => {
    //console.log("Effect is running");
    getRecipes();
  }, []); //we added an array because, we dont want to run useEffect everytime in background, instead store it in array.


const[recipes, setRecipes] = useState([]);
const [search, setSearch] = useState("");
const [query,setQuery] = useState('chicken');

useEffect(() => {
  getRecipes();
},[query]);

const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);

    //fetch()
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    //setSearch('');//need to empty search result
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="form1">
        <input type="text" className="search" value={search} onChange={updateSearch} />
        <button type="submit" className="search-button">
         Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map(recipe =>(
          <Recipe 
          key = {recipe.recipe.label}
          title={recipe.recipe.label} 
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
  
}

export default App;
