import React from 'react';
import './App.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";

function App() {

  return (
    <div>
        <AppHeader/>
        <div className={"container"}>
            <BurgerIngredients rolls={[]} sauces={[]}/>
        </div>
    </div>
  );
}

export default App;
