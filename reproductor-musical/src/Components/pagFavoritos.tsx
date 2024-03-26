import { Box, styled } from "@mui/material";
import { FunctionComponent, useState } from "react";
import ResponsiveAppBar from "./ResponsiveAppBar";
import Favoritos from "./Favoritos";

interface PagFavoritosProps {
  handleSelect: (song: string) => void;
}

const PagFavoritos: FunctionComponent<PagFavoritosProps> = ({
  handleSelect,
}) => {
  const [mostrarTabla, setMostrarTabla] = useState(true);

  const alternarMostrarTabla = () => {
    setMostrarTabla((prevShowTable) => !prevShowTable);
  };

  return (
    <Container>
      <Favoritos mostrarTabla={true} handleSelect={handleSelect} />
    </Container>
  );
};

export default PagFavoritos;

const Container = styled("div")(() => ({}));
