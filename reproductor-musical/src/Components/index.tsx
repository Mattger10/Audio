import { Box, styled, Button, Typography } from "@mui/material";
import { FunctionComponent, useState, useEffect } from "react";
import ArtistInfo from "./artist-info";
import ResponsiveAppBar from "./ResponsiveAppBar";
import MusicTable from "./music-table";
import Recommended from "./recommended";
import ArtistsRow from "./artist-slider";
import Reproductor from "./Reproductor";
import RockNacional from "./RockNacional";

interface MusicPlayerProps {
  handleSelectSong: (song: string, url: string, index: number) => void;
}

const MusicPlayer: FunctionComponent<MusicPlayerProps> = ({
  handleSelectSong,
}) => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [seleccionarArtista, setSeleccionarArtista] = useState<string>("");

  const alternarMostrarTabla = () => {
    setMostrarTabla((prevShowTable) => !prevShowTable);
  };

  const handleImageClick = (name: string) => {
    setSeleccionarArtista(name);
  };

  return (
    <Container>
      <Box sx={{ padding: 10 }}>
        <ArtistsRow onImageClick={handleImageClick} />
      </Box>
    </Container>
  );
};

export default MusicPlayer;

const Container = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));
