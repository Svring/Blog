import React from "react";
import { CarouselVariant } from "../../../models/variant";
import { Stack, Button, Collapse, useMantineTheme, List, Title, Text } from "@mantine/core";

export default function TableOfItems({ variant, captions, timeline }) {
  const theme = useMantineTheme();

  function RecurList({ data = [] }) {
    const [open, setOpen] = React.useState(false);

    return (
      <List>
        {
          data.map((item, index) => (
            <List.Item icon={'-'} key={index} onClick={() => setOpen(!open)} >
              <Title order={5} color={theme.colors.gray[6]} >{item.label}</Title>
              {item.children && <RecurList data={item.children} />}
            </List.Item>
          ))
        }
      </List>
    );
  }

  return (
    <Stack
      align="center"
      sx={{
        backgroundColor: theme.colors.background[0],
        width: '50%',
      }}
    >
      <RecurList data={variant === CarouselVariant.headline ? captions : timeline} />
    </Stack>
  )
}