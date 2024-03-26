import { FunctionComponent, useEffect, useState } from "react";

interface ReproductorSearchProps {
  songToPlay: string | null;
}

const ReproductorSearch: FunctionComponent<ReproductorSearchProps> = ({ songToPlay }) => {
  const [currentSong, setCurrentSong] = useState<string | null>(null);

  useEffect(() => {
    setCurrentSong(songToPlay);
  }, [songToPlay]);

  useEffect(() => {
    // Aquí puedes agregar la lógica para reproducir la canción actual (currentSong)
    // Puedes usar librerías o APIs de reproducción de audio, como HTML5 audio o alguna biblioteca de audio externa
    // Por simplicidad, en este ejemplo, solo mostraremos el nombre de la canción que se está reproduciendo
    if (currentSong) {
      console.log(`Reproduciendo: ${currentSong}`);
    }
  }, [currentSong]);

  return null; // El componente no renderiza nada visible, solo maneja la lógica de reproducción
};

export default ReproductorSearch;
