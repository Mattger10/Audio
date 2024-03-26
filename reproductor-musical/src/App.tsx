import { Route, Routes, useLocation } from "react-router-dom";
import MusicPlayer from "./Components/index";
import { useEffect, useState } from "react";
import Reproductor from "./Components/Reproductor";
import ReproductorArtists from "./Components/ReproductorArtists";
import ArtistsDetails from "./Components/ArtistDetails";
import RockNacional from "./Components/RockNacional";
import PagRockNacional from "./Components/PagRockNacional";
import ReproductorRock from "./Components/ReproductorRock";
import PagFavoritos from "./Components/pagFavoritos";
import ReproductorFavoritos from "./Components/ReproductorFavoritos";
import rocknacional from "./Components/Rocknacional.json";
import recommended from "./Components/recommended.json";
import artistas from "./Components/artists.json";
import PagSearch from "./Components/pagSearch";
import Recommended from "./Components/recommended";
import ResponsiveAppBar from "./Components/ResponsiveAppBar";
import ArtistsRow from "./Components/artist-slider";
import Artistas from "./Components/artist-slider";
import ArtistasDetails from "./Components/ArtistDetails";
import styled from "styled-components";



const App: React.FC = () => {
  const [seleccionarCancion, setSeleccionarCancion] = useState<string | null>(
    null
  );
  const [showReproductor, setShowReproductor] = useState(false);
  const [selectedSong, setSelectedSong] = useState<string>("");
  const [favoritos, setFavoritos] = useState<string[]>(() => {
    const storedFavoritos = localStorage.getItem("favoritos");
    return storedFavoritos ? JSON.parse(storedFavoritos) : [];
  });

  const [showReproductorArtists, setShowReproductorArtists] = useState(false);
  const [showReproductorRock, setShowReproductorRock] = useState(false);
  const [showReproductorRecommended, setShowReproductorRecommended] =
    useState(false);
  const [mostrarReproductor, setMostrarReproductor] = useState(false);
  const [mostrarReproductorFavoritos, setMostrarReproductorFavoritos] =
    useState(false);
    const [currentSong, setCurrentSong] = useState<Song | null>(null);


  const handleSelectSong = (song: string, url: string) => {
    setSeleccionarCancion(song);
    setSelectedSong(song);
    setShowReproductor(true);
    setShowReproductorRock(true);
    setShowReproductorArtists(true);
    setShowReproductorRecommended(true);
    setMostrarReproductorFavoritos(true);
  };

  const handleSelect = (song: string) => {
    setSeleccionarCancion(song);
    setSelectedSong(song);
    setMostrarReproductorFavoritos(true); // Mostrar el reproductor de favoritos
  };

  const handleCloseReproductor = () => {
    setShowReproductor(false);
    setShowReproductorArtists(false);
    setShowReproductorRock(false);
    setShowReproductorRecommended(false);
    setMostrarReproductorFavoritos(false);
  };

  const location = useLocation();

  const allSongs = [
    ...rocknacional[0].songs,
    ...recommended[0].songs,
    ...artistas.flatMap((artista) => artista.songs),
  ];

  // Filtrar las canciones favoritas de todas las canciones disponibles
  const cancionesFavoritas = allSongs.filter((song) =>
    favoritos.includes(song.songName)
  );

  const handlePlaySong = (song: Song) => {
    setCurrentSong(song); // Establece la canción seleccionada
  };


  

  return (
    <div>
      <Img />
      <ResponsiveAppBar />
      
      <Routes>
        <Route
          path="/"
          element={<Artistas />}
        />
       <Route
          path="/artistas/:id"
          element={<ArtistasDetails onPlaySong={handlePlaySong} handleSelectSong={handleSelectSong}/>}
        />
        <Route
          path="/rocknacional"
          element={<PagRockNacional handleSelectSong={handleSelectSong} />}
        />
        <Route
          path="/exitos"
          element={<Recommended handleSelectSong={handleSelectSong} />}
        />
        <Route
          path="/favoritos"
          element={<PagFavoritos handleSelect={handleSelect} />}
        />
        <Route
          path="/search"
          element={
            <PagSearch
              handleSelect={handleSelect}
              handleSelectSong={handleSelectSong}
            />
          }
        />
      </Routes>
      {(location.pathname === "/" ||
        location.pathname.startsWith("/artistas") ||
        location.pathname.startsWith("/rocknacional") ||
        location.pathname.startsWith("/exitos") ||
        location.pathname.startsWith("/favoritos") ||
        location.pathname.startsWith("/search")) &&
        seleccionarCancion &&
        showReproductor &&
        cancionesFavoritas && (
          <div>
            <Reproductor
              seleccionar={seleccionarCancion}
              onClose={handleCloseReproductor}
            />

            <ReproductorArtists
              seleccionar={seleccionarCancion}
              onClose={handleCloseReproductor}
            />

            <ReproductorRock
              seleccionar={seleccionarCancion}
              onClose={handleCloseReproductor}
            />
          </div>
        )}

      {(location.pathname === "/" ||
        location.pathname.startsWith("/artistas") ||
        location.pathname.startsWith("/rocknacional") ||
        location.pathname.startsWith("/exitos") ||
        location.pathname.startsWith("/favoritos") ||
        location.pathname.startsWith("/search")) &&
        mostrarReproductorFavoritos &&
        seleccionarCancion && (
          <div>
            <ReproductorFavoritos
              cancionesFavoritas={cancionesFavoritas}
              seleccionarCancion={seleccionarCancion}
              onClose={handleCloseReproductor}
            />
          </div>
        )}
    </div>
  );
};

export default App;

const Img = styled("div")(() => ({
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundColor: "#111111",
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  zIndex: "-9999",
}));
