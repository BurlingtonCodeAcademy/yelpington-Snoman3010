import ReturnMap from "./ReturnMap";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Link } from "react-router-dom";

function Map(props) {
  return (
    //set up map
    <MapContainer
      style={{ height: "85vh", width: "50vw" }}
      zoom={18}
      center={props.center}
    >
      <ReturnMap setMapObj={props.setMapObj} />
      <TileLayer
        url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
        attribution='<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {props.locations.map((location, index) => {
        //Map locations array to map pins and add popup holding a link to each pin 
        return (
          <Marker key={index} position={[location.lat, location.long]}>
            <Popup>
              <Link
                to={`/restaurant/${location.name
                  .toLowerCase()
                  .replaceAll("'", "")
                  .replaceAll(" ", "-")}`}
              >
                {location.name}
              </Link>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

export default Map;
