import React from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';
import RecipeAppProvider from './context/Provider';
import Login from './pages/Login';
import Profile from './pages/Profile';
import DoneFavorites from './pages/DoneFavorites';
import Explore from './pages/Explore';
import Recipes from './pages/Recipes';
import ItemID from './pages/ItemId';
import Loading from './components-global/Loading';
import BadRoute from './components-global/BadRoute/BadRoute';

const App = () => (
  <HashRouter basename='/recipe-app/'>
    <RecipeAppProvider>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/loading" component={Loading} />
        <Route exact path="/explorar" component={Explore} />
        <Route exact path="/receitas-favoritas" component={DoneFavorites} />
        <Route exact path="/receitas-feitas" component={DoneFavorites} />
        <Route exact path="/explorar/bebidas/area" component={BadRoute} />
        <Route exact path="/explorar/:type" component={Explore} />
        <Route exact path="/explorar/:type/:kindOfRecipe" component={Explore} />
        <Route exact path="/receitas/:type/:id" component={ItemID} />
        <Route exact path="/receitas/:type/:id/:making" component={ItemID} />
        <Route exact path="/perfil" component={Profile} />
        <Route exact path="/:type" component={Recipes} />
        <Route exact path="/:type" component={Recipes} />
      </Switch>
    </RecipeAppProvider>
  </HashRouter>
);

export default App;
