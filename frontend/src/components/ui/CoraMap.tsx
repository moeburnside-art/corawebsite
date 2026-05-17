'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const campCoraPosition: [number, number] = [47.5761, 3.7789];

const campIcon = L.divIcon({
  className: '',
  html: `<div style="
    background:#8B1A1A;color:white;font-weight:bold;font-size:11px;
    padding:4px 8px;border:2px solid #C9A84C;white-space:nowrap;
    box-shadow:0 2px 8px rgba(0,0,0,0.4);
  ">⛺ Camp de Cora</div>`,
  iconAnchor: [60, 15],
});

const routePoints: [number, number][] = [
  [47.580, 3.778],
  [47.578, 3.778],
  [47.5761, 3.7789],
  [47.574, 3.780],
  [47.572, 3.776],
];

export default function CoraMap() {
  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
  }, []);

  return (
    <MapContainer
      center={campCoraPosition}
      zoom={13}
      style={{ height: '100%', width: '100%', minHeight: '320px' }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={campCoraPosition} icon={campIcon}>
        <Popup>
          <strong>Camp de Cora</strong><br />
          Saint-Moré, Yonne 89270<br />
          Monument Historique depuis 1971
        </Popup>
      </Marker>
      <Polyline positions={routePoints} color="#8B1A1A" weight={3} opacity={0.7} dashArray="6 4" />
    </MapContainer>
  );
}
