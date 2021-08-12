/* global document, google, window */
import {getTripData} from './datasource';
import {createOverlay} from './overlay';
import {loadScript} from './utils';

import flyTo from './flyTo';

// Set your Google Maps API key here or via environment variable
const GOOGLE_MAPS_API_KEY = process.env.GoogleMapsAPIKey; // eslint-disable-line
const GOOGLE_MAP_ID = '97fe3c86201cc1aa';
const GOOGLE_MAPS_API_URL = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&v=beta&map_ids=${GOOGLE_MAP_ID}`;

async function init() {
  const [_, allData] = await Promise.all([loadScript(GOOGLE_MAPS_API_URL), getTripData()]);
  const map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.72, lng: -74},
    tilt: 45,
    heading: 0,
    zoom: 15,
    mapId: GOOGLE_MAP_ID
  });

  const data = allData.slice(0, 100);
  const overlay = createOverlay(map, data);

  let truckToFollow = 9;

  function focusOnLocation(e) {
    overlay.truckToFollow = null;
    const {dataset} = e.srcElement;
    const lat = parseFloat(dataset.lat) || 40.72;
    const lng = parseFloat(dataset.lng) || -74;
    const tilt = parseFloat(dataset.tilt) || 0;
    const heading = parseFloat(dataset.heading) || 0;
    const zoom = parseFloat(dataset.zoom) || 15;
    flyTo(map, {lat, lng, tilt, heading, zoom});
  }

  ['city', 'depo', 'charging-station'].forEach(l => {
    document.getElementById(`focus-${l}-btn`).addEventListener('click', focusOnLocation);
  });

  function updateTruckToFollow() {
    overlay.truckToFollow = truckToFollow;
    document.getElementById('truck-to-follow').innerHTML = truckToFollow;
  }
  document.getElementById('next-btn').addEventListener('click', () => {
    truckToFollow = (truckToFollow + 1) % data.length;
    updateTruckToFollow();
  });
  document.getElementById('previous-btn').addEventListener('click', () => {
    truckToFollow = (truckToFollow + data.length - 1) % data.length;
    updateTruckToFollow();
  });
}

init();
