import React, { useRef, useEffect, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import "./map.css";
import axios from 'axios';

// Ortam değişkenini kullan
const MAPTILER_API_KEY = process.env.REACT_APP_MAPTILER_API_KEY;

const getDateNDaysAgo = (n) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
};

const isDateInRange = (quakeDateStr, fromDate, toDate) => {
  const [day, month, year] = quakeDateStr.split('/');
  const quakeDate = new Date(`${year}-${month}-${day}`);
  return quakeDate >= fromDate && quakeDate <= toDate;
};

const getCityCountry = async (coordinates) => {
  if (!coordinates) return "";
  const [lon, lat] = coordinates.split(',').map(c => c.trim());
  try {
    const response = await fetch(
      `https://api.maptiler.com/geocoding/${lon},${lat}.json?key=${process.env.REACT_APP_MAPTILER_API_KEY}&language=en`
    );
    const data = await response.json();
    if (data.features && data.features.length > 0) {
      const context = data.features[0].context || [];
      let city = context.find(c => c.id.startsWith("place"))?.text || "";
      let country = context.find(c => c.id.startsWith("country"))?.text || "";
      city = city.replace(/[^A-Za-z0-9 ,.-]/g, "");
      country = country.replace(/[^A-Za-z0-9 ,.-]/g, "");
      if (city && country) return `${city}, ${country}`;
      let placeName = data.features[0].place_name || "";
      placeName = placeName.replace(/[^A-Za-z0-9 ,.-]/g, "");
      return placeName;
    }
    return "";
  } catch {
    return "";
  }
};

export default function Map({ showMap, dateFilter, onQuakeSelectMobile, quak }) {
  const [markers, setMarkers] = useState([]);
  const [cityMap, setCityMap] = useState({});
  const [popup, setPopup] = useState({ visible: false, x: 0, y: 0, quake: null });

  useEffect(() => {
    const fetchCities = async () => {
      const map = {};
      if (Array.isArray(quak)) {
        await Promise.all(
          quak.map(async (marker) => {
            if (marker.coordinates) {
              map[marker.id] = await getCityCountry(marker.coordinates);
            }
          })
        );
      }
      setCityMap(map);
    };
    if (Array.isArray(quak) && quak.length > 0) {
      fetchCities();
    } else {
      setCityMap({});
    }
  }, [quak]);

  useEffect(() => {
    const closePopup = (e) => {
      if (
        popup.visible &&
        e.target &&
        !document.querySelector(".quake-popup")?.contains(e.target)
      ) {
        setPopup(p => ({ ...p, visible: false }));
      }
    };

    const closePopupOnScroll = () => {
      if (popup.visible) setPopup(p => ({ ...p, visible: false }));
    };

    const closePopupOnWheel = () => {
      if (popup.visible) setPopup(p => ({ ...p, visible: false }));
    };

    if (popup.visible) {
      window.addEventListener("mousedown", closePopup);
      window.addEventListener("scroll", closePopupOnScroll, true);
      if (mapContainer.current) {
        mapContainer.current.addEventListener("scroll", closePopupOnScroll, true);
        mapContainer.current.addEventListener("wheel", closePopupOnWheel, true); 
      }
      document.addEventListener("scroll", closePopupOnScroll, true);
      document.addEventListener("wheel", closePopupOnWheel, true);
    }
    return () => {
      window.removeEventListener("mousedown", closePopup);
      window.removeEventListener("scroll", closePopupOnScroll, true);
      if (mapContainer.current) {
        mapContainer.current.removeEventListener("scroll", closePopupOnScroll, true);
        mapContainer.current.removeEventListener("wheel", closePopupOnWheel, true);
      }
      document.removeEventListener("scroll", closePopupOnScroll, true);
      document.removeEventListener("wheel", closePopupOnWheel, true); 
    };
  }, [popup.visible]);

  const mapContainer = useRef(null);  
  const ist = { lng: 28.97709, lat: 41.011467 };
  const [zoom] = useState(1.5);

  maptilersdk.config.apiKey = MAPTILER_API_KEY;

  useEffect(() => {
    const map = new maptilersdk.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/b89836a1-3239-4824-bf17-5aef32dc5664/style.json?key=${MAPTILER_API_KEY}`,
      center: [ist.lng, ist.lat],
      zoom: zoom,
    });

    const earthquakesToDisplay = Array.isArray(quak) ? quak : [];

    const newMarkers = earthquakesToDisplay.map(marker => {
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
        setMarkerStyle(child, "https://quakify.mcskn.com/Point.png", 20);
      } else if (marker.magnitude >= 5 && marker.magnitude < 7) {
        setMarkerStyle(child, "https://quakify.mcskn.com/Point.png", 45, 13, "12px");
      } else {
        setMarkerStyle(child, "https://quakify.mcskn.com/Point.png", 65);
      }
      
      child.addEventListener("mouseover", function () {
        document.getElementById("info").innerHTML =
          (cityMap[marker.id] || "Yükleniyor...") +
          "    /    " +
          marker.magnitude +
          "   /   " +
          marker.depth +
          "km";
      });
      
      child.addEventListener("mouseleave", function () {
        document.getElementById("info").innerHTML = "";
      });

      child.addEventListener("click", function (e) {
        e.stopPropagation();
        if (window.innerWidth <= 640) {
          if (onQuakeSelectMobile) {
            onQuakeSelectMobile({
              city: cityMap[marker.id] || "Yükleniyor...",
              magnitude: marker.magnitude,
              depth: marker.depth,
              date: marker.date,
              time: marker.time,
              coordinates: marker.coordinates
            });
          }
        } else {
          setPopup({
            visible: true,
            x: e.clientX,
            y: e.clientY,
            quake: {
              city: cityMap[marker.id] || "Yükleniyor...",
              magnitude: marker.magnitude,
              depth: marker.depth,
              date: marker.date,
              time: marker.time,
            }
          });
        }
      });

      const newMarker = new maptilersdk.Marker({ element: child })
        .setLngLat(marker.coordinates.split(","))
        .addTo(map);
      
      return newMarker;
    });

    setMarkers(newMarkers);

    return () => {
      map.remove(); 
    };
  }, [ist.lng, ist.lat, zoom, quak, cityMap, onQuakeSelectMobile]);

  const setMarkerStyle = (child, backgroundImage, width, paddingTop = 22, fontSize = "15px") => {
    child.style.backgroundImage = `url(${backgroundImage})`;
    child.style.width = `${width}px`;
    child.style.height = `${width}px`;
    child.style.paddingTop = `${paddingTop}px`;
    child.style.fontSize = fontSize;
  };

  return (
    <div className="map-wrap" style={{ position: "relative" }}>
      <div id="info" className="w-60 left-2 h-8  text-white inter-light mt-1 fixed z-20"></div>
      <div
        id="main-content"
        ref={mapContainer}
        className="map hidden sm:block"
      />
      {popup.visible && popup.quake && (
        <div
          className="quake-popup backdrop-blur bg-opacity-20 hidden sm:block"
          style={{
            position: "fixed",
            left: popup.x + 15,
            top: popup.y + 15,
            width: 350,
            height: 120,
            borderRadius: 20,
            background: "rgba(30,30,30,0.97)",
            color: "#fff",
            zIndex: 9999,
            boxShadow: "0 4px 24px #0008",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            animation: "popupIn 0.25s cubic-bezier(.68,-0.55,.27,1.55)",
            userSelect: "none",
            pointerEvents: "auto"
          }}
          onMouseDown={e => e.stopPropagation()}
        >
          <div>
          <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>{popup.quake.city}</div>
          <div>Mag: <b>{popup.quake.magnitude}</b></div>
          <div>Depth: <b>{popup.quake.depth} km</b></div>
          <div style={{ fontSize: 12, marginTop: 2 }}>{popup.quake.date} {popup.quake.time}</div>
          </div>
        </div>
      )}
      <style>
        {`
        @keyframes popupIn {
          0% { opacity: 0; transform: scale(0.7) translateY(20px);}
          100% { opacity: 1; transform: scale(1) translateY(0);}
        }
        `}
      </style>
    </div>
  );
}
