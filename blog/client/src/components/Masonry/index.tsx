import React from 'react';
import { Stack, Image, Grid, Container, useMantineTheme } from '@mantine/core';

export default function MasonryFlow() {
  const theme = useMantineTheme();
  const [artworks, setArtworks] = React.useState([]);
  const [columns, setColumns] = React.useState(3);
  const columnsDivision = splitIntoColumns(artworks, columns);

  React.useEffect(() => {
    fetch('/api/artworks')
      .then(res => res.json())
      .then(data => {
        setArtworks(data);
      })
      .catch(err => console.error(err));
  }, []);

  function splitIntoColumns(artworks, columnsCount) {
    const columns = Array.from({ length: columnsCount }, () => []);
    artworks.forEach((artwork, index) => {
      const columnIndex = index % columnsCount;
      columns[columnIndex].push(artwork);
    });
    return columns;
  }

  const ImageDisplay = ({ images }) => {
    return (
      <Stack>
        {images.map((img, index) => (
          <Image key={index} src={img} alt={img} radius={'lg'} width={'100%'} height={'auto'} />
        ))}
      </Stack>
    );
  }

  return (
    <Container sx={{
      width: '60%',
      backgroundColor: theme.colors.secondary[0],
      borderRadius: '10px',
      overflow: 'visible'
    }}>
      <Grid grow>
        {columnsDivision.map((columnImages, columnIndex) => (
          <Grid.Col key={columnIndex} span={columnIndex === 1 ? 2 : 1}>
            <ImageDisplay images={columnImages} />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}
