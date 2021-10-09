import { CircleMarker, Popup } from "react-leaflet";
import numeral from "numeral";

const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    multiplier: 800,
  },
  recovered: {
    hex: "#7dd71d",
    multiplier: 1200,
  },
  deaths: {
    hex: "#fb4443",
    multiplier: 2000,
  },
};

export const sortData = (data) => {
  const sortedData = [...data];
  sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortedData;
};

/// Draw circles on the map with interactive tooltop
export const showDataOnMap = (data, casesType = "cases") =>
  data.map((country) => (
    <CircleMarker
      center={[country.countryInfo.lat, country.countryInfo.long]}
      radius={100}
      fillOpacity={0.4}
      fillColor={"red"}
      color={"red"}
    >
      <Popup>
        <h1>I'm popup</h1>
      </Popup>
    </CircleMarker>
  ));
