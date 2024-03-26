import { Box, styled, } from "@mui/material";
import { FunctionComponent,  } from "react";

import ArtistsRow from "./artist-slider";


interface MusicPlayerProps {
  handleSelectSong: (song: string, url: string, index: number) => void;
}

const MusicPlayer: FunctionComponent<MusicPlayerProps> = () => {
 



  return (
    <Container>
      <Box sx={{ padding: 10 }}>
        <ArtistsRow />
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
