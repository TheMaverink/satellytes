import React, { useRef } from "react";
import * as THREE from "three";

import EarthDayMap from "../../assets/textures/globe/8k_earth_daymap.jpg";
import EarthNormalMap from "../../assets/textures/globe/8k_earth_normal_map.jpg";
import EarthSpecularMap from "../../assets/textures/globe/8k_earth_specular_map.jpg";
import EarthCloudsMap from "../../assets/textures/globe/8k_earth_clouds.jpg";

const Globe = (props) => {
  const earthRef = useRef();
  const cloudsRef = useRef();

  return <div>Globe</div>;
};

export default Globe;
