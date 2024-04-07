import React, { useRef, useEffect, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import "./map.css";
import axios from 'axios';
import geojson from './quakes.json';

export default function Map() {
  const [quak, setQuak] = useState([]);
  const [markers, setMarkers] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost/quakify/backend/api.php');
        setQuak(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  
  const mapContainer = useRef(null);  
  const ist = { lng: 28.97709, lat: 41.011467 };
  const [zoom] = useState(1.5);

  maptilersdk.config.apiKey = "MTCoW3CI3wRY7K9lPnAI";

  useEffect(() => {
    const map = new maptilersdk.Map({
      container: mapContainer.current,
      style: "https://api.maptiler.com/maps/b89836a1-3239-4824-bf17-5aef32dc5664/style.json?key=MTCoW3CI3wRY7K9lPnAI",
      center: [ist.lng, ist.lat],
      zoom: zoom,
    });
    
    const newMarkers = quak.map(marker => {
      const child = document.createElement("div");
      child.className = "marker"; 
      child.textContent = marker.magnitude;
      child.style.textAlign = "center";
      child.style.margin = "auto";
      child.style.paddingTop = 22 + "px";
      child.style.color = "white";
      child.style.fontFamily = "inter";
      child.style.fontSize = "15px";
      child.style.alignItems = "center";
      
      if (marker.magnitude < 5) {
        setMarkerStyle(child, "http://blog.mlickn.com.tr/images/less.png", 20);
      } else if (marker.magnitude >= 5 && marker.magnitude < 7) {
        setMarkerStyle(child, "http://blog.mlickn.com.tr/images/middle.png", 45, 13, "12px");
      } else {
        setMarkerStyle(child, "http://blog.mlickn.com.tr/images/high.png", 65);
      }
      
      child.addEventListener("mouseover", function () {
        document.getElementById("info").innerHTML =
          marker.city +
          "    /    " +
          marker.magnitude +
          "   /   " +
          marker.depth +
          "km";
      });
      
      child.addEventListener("mouseleave", function () {
        document.getElementById("info").innerHTML = "";
      });

      // add marker to map
      const newMarker = new maptilersdk.Marker({ element: child })
        .setLngLat(marker.coordinates.split(","))
        .addTo(map);
      
      return newMarker;
    });

    setMarkers(newMarkers);

    return () => {
      map.remove(); // Unmounting cleanup
    };
  }, [ist.lng, ist.lat, zoom, quak]);

  const setMarkerStyle = (child, backgroundImage, width, paddingTop = 22, fontSize = "15px") => {
    child.style.backgroundImage = `url(${backgroundImage})`;
    child.style.width = `${width}px`;
    child.style.height = `${width}px`;
    child.style.paddingTop = `${paddingTop}px`;
    child.style.fontSize = fontSize;
  };

  return (
    <div className="map-wrap">
      <div id="info" className="w-60 left-2 h-8  text-white inter-light mt-1 fixed z-20"></div>
      <div ref={mapContainer} className="map" />
    </div>
  );
}
