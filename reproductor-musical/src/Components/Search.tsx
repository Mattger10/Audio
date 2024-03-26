import { FunctionComponent, useState } from "react";
import { Box, styled, Typography } from "@mui/material";
import RockNacionalData from "./Rocknacional.json";
import RecomendadosData from "./recommended.json";
import ArtistasData from "./artists.json";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";


interface Song {
  songName: string;
  number: string;
  duration: string;
  artists_evolved: string[];
  album: string;
  icon?: string;
  song_url: string;
  artista?: string;
  letra?: string;
}

interface Data {
  songs: Song[];
  name?: string;
  bio?: string;
  photo_url?: string;
}

interface SearchProps {
  handleSelect: (song: string) => void;
  handleSelectSong: (song: string, url: string, index: number) => void;
}

const Search: FunctionComponent<SearchProps> = ({
  handleSelect,
  handleSelectSong,
}) => {
  const allData: Data[] = [
    ...RockNacionalData,
    ...RecomendadosData,
    ...ArtistasData,
  ];
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Data[]>(allData);
  const [, setSongToPlay] = useState<string | null>(null);

  const handleSearch = (term: string) => {
    if (term.trim() === "") {
      setSearchResults(allData); // Show all songs without filtering
      return;
    }

    const matchedSongs: Song[] = [];

    allData.forEach((data) => {
      const songsMatchingTerm: Song[] = data.songs.filter(
        (song) =>
          song.songName.toLowerCase().includes(term.toLowerCase()) ||
          song.artists_evolved.some((artist) =>
            artist.toLowerCase().includes(term.toLowerCase())
          ) ||
          song.artista?.toLowerCase().includes(term.toLowerCase())
      );

      matchedSongs.push(...songsMatchingTerm);
    });

    setSearchResults([{ name: "", songs: matchedSongs }]);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist(); // Persist the event before updating the state
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    handleSearch(searchTerm);
  };

  const handlePlayPause = (url: string, song: string, index: number) => {
    handleSelect(song);
    handleSelectSong(song, url, index);
    setSongToPlay(song); // Al hacer clic en el botón de reproducción, establecemos la canción que se reproducirá
  };

  return (
    <Box sx={{ padding: 10, marginTop: "0rem" }}>
      <Input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="¿Qué estás buscando?"
      />
      {searchResults.map((data, dataIndex) => (
        <div>
          <Typography
            sx={{
              position: "absolute",
              marginTop: "-3.5rem",
              marginLeft: "11rem",
              fontSize: 34,
              color: "#ed215e",
            }}
          >
            {data.name}
          </Typography>
          <StyledUlContainer key={dataIndex}>
            <StyledUl>
              {data.songs.map((song, songIndex) => (
                <StyledLi key={songIndex}>
                  <Img src={song.icon} alt="" width="200px" height="200px" />
                  <Typography
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      color: "#fff",
                      fontSize: "14px",
                    }}
                  >
                    {song.songName}
                  </Typography>
                  <Typography
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      color: "#fff",
                      fontSize: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    {song.artista}
                  </Typography>
                  {/* <Typography
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: "10px",
                    marginBottom: "10px",
                    marginTop: "-10px",
                  }}
                >
                  {song.artista}
                </Typography> */}
                  <PlayCircleOutlineIcon
                    sx={{
                      position: "absolute",
                      marginLeft: "1.5rem",
                      marginTop: "-14rem",
                      cursor: "pointer",
                      fontSize: "150px",
                      color: "transparent",
                      transition: "color 0.3s ease",
                      "&:hover": {
                        color: "#ed215e",
                      },
                    }}
                    onClick={() =>
                      handlePlayPause(song.song_url, song.songName, songIndex)
                    }
                  />
                </StyledLi>
              ))}
            </StyledUl>
          </StyledUlContainer>
        </div>
      ))}
    </Box>
  );
};

export default Search;

const StyledUl = styled("ul")({
  display: "flex",
  justifyContent: "flex-start",
  flexWrap: "wrap",
  padding: 0,
  margin: 0,
  listStyle: "none",
  gap: "20px",
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
  ":hover": {
    opacity: 0.7,
  },
});

const Input = styled("input")({
  position: "fixed",
  top: 1, // Adjust this value to set the desired distance from the top of the screen
  left: "71%", // Center the input horizontally on the screen
  transform: "translateX(-50%)", // Center the input horizontally on the screen
  backgroundColor: "rgba(254, 254, 254, 0.214)",
  color: "white",
  padding: "10px 55px 10px 55px",
  marginTop: "1rem",
  border: "none",
  borderRadius: "5px",
  fontSize: "15px",
  zIndex: "9999",
});

const StyledUlContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "5rem",
});
