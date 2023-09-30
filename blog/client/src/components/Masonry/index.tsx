import React from 'react';
import { useDisclosure } from '@mantine/hooks';
import {
  Stack, Image, Grid, Container,
  useMantineTheme, Card, Modal, Group, Blockquote
} from '@mantine/core';

export default function MasonryFlow() {
  const theme = useMantineTheme();
  const [artworks, setArtworks] = React.useState([]);
  const [columns, setColumns] = React.useState(3);
  const [artworkModal, setArtworkModal] = React.useState('');
  const [opened, { open, close }] = useDisclosure(false);
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

  function imageOnClick(e) {
    setArtworkModal(e.target.src);
    open();
  }

  function ArtworkDetail() {
    return (
      <Card w={'100%'} p={'md'}>
        <Group align='flex-start' sx={{ borderRadius: 'xl' }} >
          <Card.Section w={'30%'} sx={{ borderRadius: 'lg' }}>
            <Image src={artworkModal} radius={'lg'} />
          </Card.Section>
          <Stack align={'flex-end'} >
            <Blockquote color="pink" mt="xl">
              Life is like an npm install – you never know what you are going to get.
            </Blockquote>
          </Stack>
        </Group>
      </Card>
    )
  }

  const ImageDisplay = ({ images }) => {
    return (
      <Stack>
        {images.map((img, index) => (
          <Card
            padding={'0.2rem'}
            radius={'lg'}
            key={index}
            sx={{
              background: 'linear-gradient(45deg, #f09433 0%, #f7ca45 25%, #d4e157 50%, #81d4fa 75%, #5c6bc0 100%, #FF0000 100%)',
            }}
          >
            <Image key={index} src={img} alt={img}
              radius={'lg'} width={'100%'} height={'auto'}
              sx={{
                cursor: 'pointer'
              }}
              onClick={e => imageOnClick(e)}
            />
          </Card>
        ))}
      </Stack>
    );
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="Artwork" xOffset={'-10%'} size={'70vw'}
      >
        <ArtworkDetail />
      </Modal>
      <Container sx={{
        width: '60%',
        backgroundColor: theme.colors.background[0],
        borderRadius: 'lg',
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
    </>
  );
}
