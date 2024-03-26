import React, { useState } from "react";
import { Box, styled, Typography } from "@mui/material";
import albums from "./albums.json";

interface AlbumProps {
  selectedAlbum: string | null;
  toggleAlbumSongs: (albumName: string) => void;
}

const Album: React.FC<AlbumProps> = ({ selectedAlbum}) => {
  const album = albums.find((artist) => artist.name === selectedAlbum);
  const [selectedAlbumName, setSelectedAlbumName] = useState<string | null>(
    null
  );

  const toggleAlbumSongs1 = (albumName: string) => {
    if (selectedAlbumName === albumName) {
      setSelectedAlbumName(null);
    } else {
      setSelectedAlbumName(albumName);
    }
  };

  

  if (!album) {
    return null;
  }

  return (
    <div>
      <Row>
        {album.albums.map((album, index) => (
          <StyledUlContainer key={index}>
            <StyledUl>
              <StyledLi key={index}>
                <Img
                  width={200}
                  height={200}
                  src={album.albumCover}
                  alt=""
                  onClick={() => toggleAlbumSongs1(album.albumName)}
                />

                <Typography
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: "14px",
                  }}
                >
                  {album.albumName}
                </Typography>
                <Typography
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#fff",
                    fontSize: "10px",
                    marginBottom: "10px",
                  }}
                >
                  {album.artist}
                </Typography>
                
              </StyledLi>
            </StyledUl>
          </StyledUlContainer>
        ))}
      </Row>
    </div>
  );
};

export default Album;

const StyledUlContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "0rem",
  marginBottom: "5rem",
});

const StyledUl = styled("ul")({
  display: "flex",
  justifyContent: "flex-start",
  flexWrap: "wrap",
  padding: 0,
  margin: 0,
  listStyle: "none",
  gap: "20px", // Espacio entre los elementos <li>
  width: "80%",
});

const StyledLi = styled("li")({
  backgroundColor: "#222432",
  width: "200px",
  height: "auto",
  borderRadius: "10px",
});

const Img = styled("img")({
  borderTopLeftRadius: "10px",
  borderTopRightRadius: "10px",
  backgroundColor: "black",
  cursor: "pointer",
  ":hover": {
    opacity: 0.7,
  },
});

const Row = styled(Box)(() => ({
  marginTop: "7rem",
  display: "grid", // Cambiamos el display a "grid"
  gridTemplateColumns: "repeat(6, 1fr)", // Especificamos que queremos 6 columnas de igual ancho
  gap: "30px",
  width: "100%",
  borderBottom: "1px solid white",
}));
