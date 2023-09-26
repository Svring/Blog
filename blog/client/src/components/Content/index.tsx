import React from "react";
import { SearchVariant, ContentVariant, CarouselVariant } from '../../../models/variant';

import Content from './content';
import PostList from "./postList";

import { Paper, useMantineTheme } from "@mantine/core";

const Contain = ({
  variant,
  content,
  postList,
  setContentVariant,
  setCarouselVariant,
  setSearchVariant,
  setContent,
  setButtonGroupVariant,
  setTitle
}) => {
  const theme = useMantineTheme();

  return (
    <Paper
      shadow="md"
      radius={'md'}
      sx={{
        width: '50%',
        maxHeight: '100%',
        padding: '0.5rem',
        backgroundColor: theme.colors.background[0]
      }}
    >
      {
        variant === ContentVariant.content ? (
          <Content content={content.replace(/^#\s.*\n?/, "")} />
        ) : (
          <PostList
            postList={postList}
            setContent={setContent}
            setCarouselVariant={setCarouselVariant}
            setContentVariant={setContentVariant}
            setSearchVariant={setSearchVariant}
            setButtonGroupVariant={setButtonGroupVariant}
            setTitle={setTitle}
          />
        )
      }
    </Paper>
  );
};

export default Contain;