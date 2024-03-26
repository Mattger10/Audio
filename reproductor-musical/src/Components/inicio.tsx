import { FunctionComponent, } from "react";
import { styled } from "@mui/material";


interface InicioProps {}

const Inicio: FunctionComponent<InicioProps> = () => {




  return (
    <Container>
      <Img />
     
   
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
