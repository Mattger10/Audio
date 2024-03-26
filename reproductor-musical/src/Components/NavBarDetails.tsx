import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import {  Button, styled } from "@mui/material";
import Container from "@mui/material/Container";

import recommendedData from "./recommended.json";

import artistas from "./artists.json";


interface NavBarDetailsProps {
  seleccionar: string;
  handleSelectSong: (song: string, url: string, index: number) => void;
  toggleAlbumSongs: (albumName: string) => void;
  handleShowOverview: () => void;
}

const NavBarDetails: React.FunctionComponent<NavBarDetailsProps> = ({
  seleccionar,

  handleShowOverview
}) => {
  const seleccionarArtista = artistas.find(
    (artista) => artista.name === seleccionar
  );
  // const [showAlbumSongs, setShowAlbumSongs] = React.useState(false);
  // const [selectedArtist, setSelectedArtist] = React.useState<string>("");
  // const [selectedAlbum, setSelectedAlbum] = React.useState<string | null>(null);
  // const [showMusicTable, setShowMusicTable] = React.useState(false);
  // const [initialAlbumShown, setInitialAlbumShown] = React.useState(false); // New state

  // const toggleAlbumSongs1 = (albumName: string) => {
  //   setSelectedAlbum(albumName);
  //   setInitialAlbumShown(true);
  //   setShowAlbumSongs(true); // Set showAlbumSongs to true when showing Album
  // };

  // const handleShowOverview1 = () => {
  //   setShowAlbumSongs(false); // Hide Album when showing Overview
  //   setShowMusicTable(true); // Show MusicTable when showing Overview
  //   setSelectedAlbum(null); // Reset selected album when showing Overview
  // };

  // const handleImageClick = (name: string) => {
  //   setSelectedArtist(name);
  // };

  if (seleccionarArtista) {
    return (
      <AppBar
        position="static"
        sx={{
          position: "absolute",
          top: "21rem",
          left: "14rem",
          backgroundColor: "transparent",
          height: "7vh",
          width: "78vw",
          borderBottom: "2px solid rgba(254, 254, 254, 0.214)",
          boxShadow: "none",
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", width: "90rem" },
            }}
          >
            {recommendedData.map((artist) => {
              return artist ? (
                <Ul>
                  <StyledButton onClick={handleShowOverview}>
                    OVERVIEW
                  </StyledButton>

                  
                  <StyledButton> ALBUMS </StyledButton>
                  {/* <StyledButton onClick={() => toggleAlbumSongs(seleccionarArtista?.name)}> ALBUMS </StyledButton> */}
                </Ul>
              ) : null;
            })}
          </Box>
        </Container>
        <Box></Box>
      </AppBar>
    );
  } else {
    return null;
  }
};

export default NavBarDetails;

const Ul = styled("ul")(() => ({
  listStyleType: "none",
  display: "flex",
  marginTop: "1rem",
  marginLeft: "-4rem",
}));

const StyledButton = styled(Button)(() => ({
  border: "none",
  backgroundColor: "none",
  height: "3rem",
  color: "#6e717a",
  fontSize: "12px",
  fontWeight: "bold",
  letterSpacing: "0.2rem",
  cursor: "pointer",
  padding: "0px 20px 0px 20px ",
  width: "250px",
  "&:hover": {
    borderBottom: "3px solid #ed215e",
    backgroundColor: "transparent",
    borderRadius: "0px",
    color: "#fff",
  },

  "&:selectedButton": {
    borderBottom: "3px solid #fff",
  },
}));
