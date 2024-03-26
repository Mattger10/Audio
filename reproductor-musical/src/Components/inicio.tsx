import { FunctionComponent, useState } from "react";
import { Box, styled } from "@mui/material";
import ArtistsRow from "./artist-slider";
import ResponsiveAppBar from "./ResponsiveAppBar";

interface InicioProps {}

const Inicio: FunctionComponent<InicioProps> = () => {
  const [selectedArtist, setSelectedArtist] = useState<string>("");
  const [mostrarTabla, setMostrarTabla] = useState(false);

  const handleImageClick = (name: string) => {
    setSelectedArtist(name);
  };

  const alternarMostrarTabla = () => {
    setMostrarTabla((prevMostrarTabla) => !prevMostrarTabla);
  };

  return (
    <Container>
      <Img />
      <ResponsiveAppBar
        mostrarTabla={mostrarTabla}
        alternarMostrarTabla={alternarMostrarTabla}
      />
      <Box sx={{ padding: 5 }}>
        <ArtistsRow onImageClick={handleImageClick} />
      </Box>
    </Container>
  );
};

export default Inicio;

const Container = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

const Img = styled("div")(() => ({
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundColor: "#151829",
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  zIndex: "-9999",
}));
