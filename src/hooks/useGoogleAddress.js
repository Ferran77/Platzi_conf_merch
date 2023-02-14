import { useState, useEffect } from 'react';
import axios from 'axios';

const useGoogleAddress = (address) => {
  const [map, setMap] = useState({});
  const API = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyD0ihyUuf8yb-OBrcAzFqs6QLYfslD2bA4`;

  useEffect(() => {
    async function handler() {
      const response = await axios(API);
      setMap(response.data.results[0].geometry.location);
    }
    handler();
  }, []);
  return map;
};

export default useGoogleAddress;
