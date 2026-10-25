import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  MapPin, 
  Search, 
  Layers, 
  Navigation, 
  ExternalLink, 
  Building2, 
  BookOpen, 
  HeartHandshake, 
  Sparkles,
  Maximize2,
  Compass,
  CheckCircle2
} from 'lucide-react';
import { Region, CharityOpportunity, StudentVIAProject, TuitionRequest } from '../types';

interface SingaporeOneMapProps {
  selectedRegion: Region;
  onSelectRegion: (region: Region) => void;
  opportunities: CharityOpportunity[];
  projects: StudentVIAProject[];
  requests: TuitionRequest[];
}

interface RegionCoordinates {
  center: [number, number];
  zoom: number;
  label: string;
}

const REGION_CONFIG: Record<Region, RegionCoordinates> = {
  All: { center: [1.3521, 103.8198], zoom: 11.5, label: 'Islandwide Singapore' },
  Central: { center: [1.3200, 103.8450], zoom: 13, label: 'Central Region (Bishan, Toa Payoh, City)' },
  East: { center: [1.3520, 103.9450], zoom: 13, label: 'East Region (Tampines, Bedok, Pasir Ris)' },
  West: { center: [1.3400, 103.7250], zoom: 13, label: 'West Region (Jurong, Clementi, Bukit Batok)' },
  North: { center: [1.4300, 103.8000], zoom: 13, label: 'North Region (Woodlands, Yishun, Sembawang)' },
  'North-East': { center: [1.3850, 103.8950], zoom: 13, label: 'North-East Region (Sengkang, Punggol, Serangoon)' },
  Online: { center: [1.3521, 103.8198], zoom: 11.5, label: 'Virtual / Online islandwide' },
};

// Known Singapore coordinate points for mapped venues
const COMMUNITY_VENUES = [
  {
    id: 'venue-1',
    name: 'Willing Hearts Soup Kitchen',
    region: 'East' as Region,
    lat: 1.3142,
    lng: 103.9104,
    type: 'Charity Drive',
    address: '1 Lorong J Telok Kurau, Singapore 425792',
    activity: 'Daily meal packaging (4.0h VIA)',
    color: '#d97706',
  },
  {
    id: 'venue-2',
    name: 'Apex Harmony Lodge',
    region: 'East' as Region,
    lat: 1.3789,
    lng: 103.9632,
    type: 'Senior Tech Buddy',
    address: '10 Pasir Ris Walk, Singapore 518240',
    activity: 'Digital smartphone clinic for elders',
    color: '#d97706',
  },
  {
    id: 'venue-3',
    name: 'Waterways Watch Society',
    region: 'Central' as Region,
    lat: 1.3038,
    lng: 103.8646,
    type: 'Environmental Clean-up',
    address: '4876 Beach Road, Kallang Riverside Park',
    activity: 'Marina & Kallang kayak cleanup',
    color: '#0284c7',
  },
  {
    id: 'venue-4',
    name: 'MINDS Hub Margaret Drive',
    region: 'West' as Region,
    lat: 1.2965,
    lng: 103.8058,
    type: 'Special Needs Buddy',
    address: '800 Margaret Drive, Singapore 149310',
    activity: 'Weekend crafts and therapeutic recreation',
    color: '#e11d48',
  },
  {
    id: 'venue-5',
    name: 'Animal Lovers League Shelter',
    region: 'North' as Region,
    lat: 1.3853,
    lng: 103.7156,
    type: 'Animal Care',
    address: '59 Sungei Tengah Rd, The Animal Lodge',
    activity: 'Dog walking & rescue care (4.0h VIA)',
    color: '#16a34a',
  },
  {
    id: 'venue-6',
    name: 'Food from the Heart Hub',
    region: 'East' as Region,
    lat: 1.3364,
    lng: 103.8824,
    type: 'Food Rations Packing',
    address: '130 Joo Seng Road #03-01',
    activity: 'Bread & grocery care packs redistribution',
    color: '#d97706',
  },
  {
    id: 'venue-7',
    name: 'Bishan Public Library (Free Tuition Corner)',
    region: 'Central' as Region,
    lat: 1.3506,
    lng: 103.8485,
    type: 'Free Tuition Hub',
    address: '5 Bishan Place, #01-01, Singapore 579841',
    activity: 'Primary 5 Math & Science peer tutoring',
    color: '#9333ea',
  },
  {
    id: 'venue-8',
    name: 'Jurong Regional Library (Tuition Hub)',
    region: 'West' as Region,
    lat: 1.3326,
    lng: 103.7397,
    type: 'Free Tuition Hub',
    address: '21 Jurong East Central 1, Singapore 609732',
    activity: 'Primary 3 English reading & science experiments',
    color: '#9333ea',
  },
  {
    id: 'venue-9',
    name: 'Woodlands Regional Library',
    region: 'North' as Region,
    lat: 1.4361,
    lng: 103.7865,
    type: 'Free Tuition Hub',
    address: '900 South Woodlands Drive, #01-00',
    activity: 'Primary 2 phonics & numeracy mentor circle',
    color: '#9333ea',
  },
  {
    id: 'venue-10',
    name: 'Tampines Regional Library @ Our Tampines Hub',
    region: 'East' as Region,
    lat: 1.3533,
    lng: 103.9405,
    type: 'Free Tuition Hub',
    address: '1 Tampines Walk, Our Tampines Hub',
    activity: 'Primary 6 PSLE math heuristics guidance',
    color: '#9333ea',
  },
];

export const SingaporeOneMap: React.FC<SingaporeOneMapProps> = ({
  selectedRegion,
  onSelectRegion,
  opportunities,
  projects,
  requests,
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  const [postalInput, setPostalInput] = useState('');
  const [isSearchingPostal, setIsSearchingPostal] = useState(false);
  const [postalSearchResult, setPostalSearchResult] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Charity' | 'Tuition'>('All');

  const regions: Region[] = ['All', 'Central', 'East', 'West', 'North', 'North-East'];

  // Initialize Leaflet Map with keyless OneMap Tile Layer
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Create map instance
    const initialConfig = REGION_CONFIG[selectedRegion] || REGION_CONFIG.All;
    const map = L.map(mapContainerRef.current, {
      center: initialConfig.center,
      zoom: initialConfig.zoom,
      minZoom: 11,
      maxZoom: 18,
      zoomControl: false,
    });

    // Add zoom control at bottom right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // OneMap Singapore Keyless Raster Tile Layer
    // Standard URL: https://www.onemap.gov.sg/maps/tiles/Default/{z}/{x}/{y}.png
    const oneMapTiles = L.tileLayer('https://www.onemap.gov.sg/maps/tiles/Default/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 11,
      detectRetina: true,
      attribution:
        '<img src="https://www.onemap.gov.sg/web-assets/images/logo/om_logo.png" style="height:14px;width:14px;vertical-align:text-bottom;display:inline-block;margin-right:4px;"/> <a href="https://www.onemap.gov.sg/" target="_blank" rel="noopener noreferrer" style="color:#d97706;font-weight:600;">OneMap</a> &copy; Singapore Land Authority',
    });

    oneMapTiles.addTo(map);

    // Markers layer group
    const markersGroup = L.layerGroup().addTo(map);
    markersLayerRef.current = markersGroup;
    mapInstanceRef.current = map;

    // Initial render of markers
    renderVenueMarkers(map, markersGroup, activeFilter);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Sync region flyTo when selectedRegion changes from parent
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const config = REGION_CONFIG[selectedRegion];
    if (config) {
      mapInstanceRef.current.flyTo(config.center, config.zoom, {
        duration: 1.2,
        easeLinearity: 0.25,
      });
    }
  }, [selectedRegion]);

  // Re-render markers when activeFilter changes
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;
    renderVenueMarkers(mapInstanceRef.current, markersLayerRef.current, activeFilter);
  }, [activeFilter, selectedRegion]);

  const renderVenueMarkers = (
    map: L.Map, 
    group: L.LayerGroup, 
    filter: 'All' | 'Charity' | 'Tuition'
  ) => {
    group.clearLayers();

    COMMUNITY_VENUES.forEach((venue) => {
      // Check category filter
      if (filter === 'Charity' && venue.type.includes('Tuition')) return;
      if (filter === 'Tuition' && !venue.type.includes('Tuition')) return;

      const isCurrentRegion = selectedRegion === 'All' || venue.region === selectedRegion;

      // Custom HTML DivIcon for sharp, crisp rendering
      const isTuition = venue.type.includes('Tuition');
      const badgeBg = isTuition ? 'bg-purple-600' : 'bg-amber-600';
      const ringColor = isCurrentRegion ? 'ring-3 ring-amber-400 scale-110 shadow-lg' : 'opacity-85 shadow-sm';

      const customIcon = L.divIcon({
        className: 'custom-venue-marker',
        html: `
          <div class="flex items-center justify-center w-8 h-8 rounded-full ${badgeBg} text-white font-bold transition-transform ${ringColor}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              ${isTuition 
                ? '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10"/><path d="M6 10h10"/>'
                : '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>'
              }
            </svg>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -16],
      });

      const marker = L.marker([venue.lat, venue.lng], { icon: customIcon });

      // Rich popup with OneMap SG styling
      const popupHtml = `
        <div style="font-family:'Plus Jakarta Sans',sans-serif;padding:6px;min-width:210px;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;">
            <span style="font-size:10px;font-weight:700;text-transform:uppercase;color:${venue.color};">${venue.type}</span>
            <span style="font-size:10px;background:#f1f5f9;color:#475569;padding:2px 6px;border-radius:4px;font-weight:600;">${venue.region}</span>
          </div>
          <h4 style="font-size:13px;font-weight:800;color:#0f172a;margin:0 0 4px 0;line-height:1.3;">${venue.name}</h4>
          <p style="font-size:11px;color:#64748b;margin:0 0 6px 0;">${venue.address}</p>
          <div style="font-size:11px;background:#fef3c7;color:#92400e;padding:4px 8px;border-radius:6px;font-weight:600;margin-bottom:8px;">
            ${venue.activity}
          </div>
          <button id="btn-select-${venue.id}" style="width:100%;background:#0f172a;color:#ffffff;border:none;border-radius:6px;padding:6px 10px;font-size:11px;font-weight:700;cursor:pointer;">
            Filter to ${venue.region} Region
          </button>
        </div>
      `;

      marker.bindPopup(popupHtml);

      // Event listener for popup action
      marker.on('popupopen', () => {
        setTimeout(() => {
          const btn = document.getElementById(`btn-select-${venue.id}`);
          if (btn) {
            btn.onclick = () => {
              onSelectRegion(venue.region);
              map.closePopup();
            };
          }
        }, 50);
      });

      marker.addTo(group);
    });
  };

  // Search postal code or address using the /api/onemap endpoint we built earlier!
  const handlePostalSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = postalInput.trim();
    if (!query) return;

    setIsSearchingPostal(true);
    setPostalSearchResult(null);

    try {
      const res = await fetch(`/api/onemap?searchVal=${encodeURIComponent(query)}`);
      const data = await res.json();

      if (data?.results && data.results.length > 0) {
        const first = data.results[0];
        const lat = parseFloat(first.LATITUDE);
        const lng = parseFloat(first.LONGITUDE);

        if (!isNaN(lat) && !isNaN(lng) && mapInstanceRef.current) {
          mapInstanceRef.current.flyTo([lat, lng], 16, { duration: 1.5 });

          // Add a temporary search highlight marker
          const searchIcon = L.divIcon({
            className: 'search-pulse-marker',
            html: `
              <div class="relative flex items-center justify-center">
                <span class="absolute w-10 h-10 bg-amber-400 rounded-full animate-ping opacity-60"></span>
                <span class="relative w-8 h-8 bg-amber-500 rounded-full border-2 border-white text-white font-bold flex items-center justify-center shadow-lg text-xs">
                  📍
                </span>
              </div>
            `,
            iconSize: [32, 32],
            iconAnchor: [16, 16],
          });

          const searchMarker = L.marker([lat, lng], { icon: searchIcon }).addTo(mapInstanceRef.current);
          searchMarker.bindPopup(`
            <div style="font-family:'Plus Jakarta Sans',sans-serif;padding:6px;max-width:220px;">
              <span style="font-size:10px;font-weight:700;color:#d97706;">OneMap SG Verified Location</span>
              <h4 style="font-size:12px;font-weight:700;color:#0f172a;margin:2px 0;">${first.BUILDING || first.ADDRESS}</h4>
              <p style="font-size:10px;color:#64748b;margin:0;">Postal: ${first.POSTAL}</p>
            </div>
          `).openPopup();

          setPostalSearchResult(`${first.BUILDING || first.ROAD_NAME} (${first.POSTAL})`);
        }
      } else {
        setPostalSearchResult('No results found on OneMap SG for this query.');
      }
    } catch (err) {
      console.error('Postal search error:', err);
      setPostalSearchResult('Error connecting to OneMap SG.');
    } finally {
      setIsSearchingPostal(false);
    }
  };

  const currentConfig = REGION_CONFIG[selectedRegion] || REGION_CONFIG.All;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden mb-12">
      {/* Map Control Header Bar */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/70 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider mb-0.5">
            <Compass className="w-4 h-4 text-amber-600" />
            <span>Singapore OneMap Interactive Tile Explorer</span>
          </div>
          <h3 className="text-lg font-extrabold text-slate-900 font-display flex items-center gap-2">
            <span>Explore Opportunities by Singapore Region</span>
          </h3>
          <p className="text-xs text-slate-500">
            Powered by Singapore Land Authority (SLA) OneMap keyless tiles. Click any region or venue to filter opportunities.
          </p>
        </div>

        {/* Postal Code & Address OneMap Search */}
        <form onSubmit={handlePostalSearch} className="flex items-center gap-2 shrink-0">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={postalInput}
              onChange={(e) => setPostalInput(e.target.value)}
              placeholder="Singapore Postal / Landmark (e.g. 178903)..."
              className="pl-8 pr-3 py-1.5 text-xs bg-white rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-200 outline-none w-56 sm:w-64"
            />
          </div>
          <button
            type="submit"
            disabled={isSearchingPostal}
            className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors disabled:opacity-50 cursor-pointer"
          >
            {isSearchingPostal ? 'Locating...' : 'Locate'}
          </button>
        </form>
      </div>

      {/* Region Selector Pills Linked Directly to Search by Region */}
      <div className="px-4 sm:px-6 py-3 bg-white border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-500 font-semibold mr-1 flex items-center gap-1">
            <Navigation className="w-3.5 h-3.5 text-amber-600" /> Focus Region:
          </span>
          {regions.map((reg) => {
            const isSelected = selectedRegion === reg;
            return (
              <button
                key={reg}
                onClick={() => onSelectRegion(reg)}
                className={`px-3 py-1 font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-500 to-rose-600 text-white shadow-xs scale-105'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {reg}
              </button>
            );
          })}
        </div>

        {/* Layer Filters */}
        <div className="flex items-center gap-1 text-xs">
          <span className="text-slate-400 text-[11px] mr-1 hidden sm:inline">Show Venues:</span>
          <button
            onClick={() => setActiveFilter('All')}
            className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold transition-colors ${
              activeFilter === 'All' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            All Venues
          </button>
          <button
            onClick={() => setActiveFilter('Charity')}
            className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold transition-colors ${
              activeFilter === 'Charity' ? 'bg-amber-600 text-white' : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            Charity Drives
          </button>
          <button
            onClick={() => setActiveFilter('Tuition')}
            className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold transition-colors ${
              activeFilter === 'Tuition' ? 'bg-purple-600 text-white' : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            Free Tuition Hubs
          </button>
        </div>
      </div>

      {postalSearchResult && (
        <div className="px-5 py-2 bg-amber-50 text-amber-900 border-b border-amber-200/60 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{postalSearchResult}</span>
          </div>
          <button
            onClick={() => setPostalSearchResult(null)}
            className="text-amber-800 hover:text-amber-950 font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Map Container Viewport */}
      <div className="relative w-full h-[400px] sm:h-[480px] bg-slate-100">
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* Floating Region Info Badge Overlay */}
        <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-slate-200 shadow-md text-xs pointer-events-none max-w-xs">
          <div className="text-[11px] uppercase tracking-wider font-bold text-amber-700">
            Selected Region
          </div>
          <div className="text-sm font-extrabold text-slate-900 mt-0.5">
            {currentConfig.label}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            Linked to homepage filters below
          </div>
        </div>

        {/* Legend Overlay at bottom left */}
        <div className="absolute bottom-4 left-4 z-10 bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-200 shadow-sm text-[11px] flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-600 inline-block"></span>
            <span className="text-slate-700 font-medium">Charity Centre</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-purple-600 inline-block"></span>
            <span className="text-slate-700 font-medium">Tuition Library Hub</span>
          </div>
        </div>
      </div>
    </div>
  );
};
