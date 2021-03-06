import { useMap } from "react-leaflet";
//Get map object out of the map component
function ReturnMap(props){
    props.setMapObj(useMap())
    return null;
}

export default ReturnMap;