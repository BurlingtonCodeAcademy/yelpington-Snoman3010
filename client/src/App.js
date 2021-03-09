import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Map from "./components/Map";
import { useEffect, useState } from "react";
import Nav from "./components/Nav";
import Restaurant from "./components/Restaurant";

function App() {
  //set up state variables
  const [mapObj, setMapObj] = useState(null);
  const [restaurantList, setRestaurantList] = useState([]);
  const [locations, setLocations] = useState([]);
  const [center, setCenter] = useState([44.4681, -73.176]);

  //fetch list of restaurants and locations
  useEffect(() => {
    if (restaurantList.length === 0) {
      fetch("/api")
        .then((res) => res.json())
        .then((namesList) => {
          setRestaurantList(namesList);
        });
    }
    if (locations.length === 0) {
      fetch("/api/location")
        .then((res) => res.json())
        .then((locationJson) => {
          setLocations(locationJson);
        });
    }
  });

  return (
    <BrowserRouter>
      <h1 id="title">Fake Yelp Thing</h1>
      <div id="main-content">
        <Nav restaurantList={restaurantList} />
        <Map setMapObj={setMapObj} center={center} locations={locations} />
        {/* display restaurant info if one is selected */}
        <Route
          exact
          path="/restaurant/:id"
          component={({ match }) => {
            return (
              <Restaurant
                restId={match.params.id}
                mapObj={mapObj}
                locations={locations}
              />
            );
          }}
        />
      </div>
      {/* set map to default view when returning to home page */}
      <Route
        exact
        path="/"
        component={() => {
          if (mapObj) {
            mapObj.setView(center, 18);
          }
          return null;
        }}
      />
    </BrowserRouter>
  );
}

export default App;
