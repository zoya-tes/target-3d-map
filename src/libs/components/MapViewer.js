/* eslint-disable react/prop-types */
import { Viewer, ImageryLayer } from "resium";
import React from "react";
import { ArcGisMapServerImageryProvider } from "cesium";
const cs = require('cesium')
window.Cesium = cs

const Map3DViewer = () => {
  
  // const imageryProvider = new ArcGisMapServerImageryProvider({
  //   url: "//services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer",
  // });
  return (
    <>
      <Viewer>
        {/* <ImageryLayer imageryProvider={imageryProvider} /> */}
      </Viewer>
    </>
  );
};
export default Map3DViewer;
