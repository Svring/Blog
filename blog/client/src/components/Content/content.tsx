import React from 'react';
import {
  Container, useMantineTheme,
  Image, Text, Code, Title, Anchor, Divider
} from "@mantine/core";
import ReactMarkdown from 'react-markdown';

export default function Content({ content, encode }) {
  const theme = useMantineTheme();

  function CustomH1(props) {
    return <Title id={encode(props.children[0])} {...props} style={{ color: 'pink' }} />;
  }

  function CustomH2(props) {
    return <Title id={encode(props.children[0])} order={2} {...props} sx={{ color: 'white', padding: '1rem' }} />;
  }

  function CustomH3(props) {
    return <Title id={encode(props.children[0])} order={3} {...props} sx={{ color: 'white', padding: '1rem' }} />;
  }

  function CustomH4(props) {
    return <Title id={encode(props.children[0])} order={4} {...props} sx={{ color: 'white', padding: '1rem' }} />;
  }

  function CustomCode(props) {
    return <Code block {...props}
      sx={{
        overflow: 'auto',
        backgroundColor: theme.colors.secondary[0],
        margin: '1rem 0',
      }} />
  }

  function CostumP(props) {
    return <Text {...props} size={'lg'} style={{ color: theme.colors.white[1] }}></Text>
  }

  function CustomImg(props) {
    return <Image {...props}
      sx={{ maxWidth: '100%', paddingBlock: '1rem' }} />
  }

  function CustomAnchor(props) {
    return <Anchor {...props} color="cyan" underline='never' sx={{}} />
  }

  function CustomDivider(props) {
    return <Divider {...props} variant='dashed'
      labelPosition='center' my={'md'} />
  }

  const newComponents = {
    h1: CustomH1,
    h2: CustomH2,
    h3: CustomH3,
    h4: CustomH4,
    img: CustomImg,
    p: CostumP,
    pre: CustomCode,
    a: CustomAnchor,
    hr: CustomDivider
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
