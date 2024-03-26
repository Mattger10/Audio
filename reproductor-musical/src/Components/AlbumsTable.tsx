import { FunctionComponent, useEffect, useState } from "react";
import albums from "./albums.json"

interface AlbumsTableProps {
    selectedAlbum: string | null;
}

const AlbumsTable: FunctionComponent<AlbumsTableProps> = ({selectedAlbum}) => {
    const album = albums.find((artist) => artist.name === selectedAlbum);
  const [selectedAlbumName, setSelectedAlbumName] = useState<string | null>(
    null
  );

  return (
    <div>
      {album?.albums.map((album, index) => (
        <div key={index}>
          {selectedAlbum === album.albumName && (
            <ul>
              {album.songs.map((song, songIndex) => (
                <li key={songIndex}>{song.songName}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default AlbumsTable;
