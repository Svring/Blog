import React from 'react';
import { Container, useMantineTheme, Image, Text } from "@mantine/core";
import ReactMarkdown from 'react-markdown';

export default function Content({ content }) {
  const theme = useMantineTheme();

  function CustomH1(props) {
    return <h1 {...props} style={{ color: 'pink' }} />;
  }

  function CostumP(props) {
    return <Text {...props} size={'lg'} style={{ color: theme.colors.white[1] }}></Text>
  }

  function CustomImg(props) {
    return <Image {...props} sx={{ maxWidth: '100%' }} />
  }

  function CustomCodeBlock(props) {
    return (
      <div style={{ padding: "1em" }}>
        <pre {...props} style={{ overflow: "auto" }} />
      </div>
    );
  }

  const newComponents = {
    h1: CustomH1,
    img: CustomImg,
    p: CostumP,
    pre: CustomCodeBlock
  }

  return (
    <Container
      size={'66rem'}
      px={'md'}
      sx={{
        backgroundColor: theme.colors.background[0],
        height: '100%',
        padding: '1rem',
        fontFamily: 'athelas',
      }}
    >
      <ReactMarkdown children={content} components={newComponents} />
    </Container>
  )
}
