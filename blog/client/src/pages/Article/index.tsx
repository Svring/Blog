import React from "react";

import ButtonGroup from "../../components/ButtonGroup";
import Search from "../../components/Search";
import Carousel from "../../components/Carousel";
import Content from "../../components/Content";
import RightSide from "../../components/RightSide";

import {
  SearchVariant, ContentVariant,
  CarouselVariant, ButtonGroupVariant
} from '../../../models/variant';

import { Flex, Group, Stack, useMantineTheme } from "@mantine/core";

import CryptoJs from 'crypto-js';

const Article = ({ }) => {
  // Mantine theme provider
  const theme = useMantineTheme();

  // Reset Article component
  const [reset, setReset] = React.useState(false);

  // Three states are defined here: content, postList, timeline
  // - content is the markdown content of the current article
  // - postList is the list of articles in database
  // - timeline is the list of dates for the posts timeline
  const [content, setContent] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [postList, setPostList] = React.useState([]);
  const [timeline, setTimeline] = React.useState([]);

  // Three components: search, carousel and content, each with two variants
  // - search could be used for searchBar or title
  // - carousel could show postList or timeline
  // - content shows the markdown content or postList
  const [searchVariant, setSearchVariant] = React.useState(SearchVariant.searchBar);
  const [carouselVariant, setCarouselVariant] = React.useState(CarouselVariant.timeline);
  const [contentVariant, setContentVariant] = React.useState(ContentVariant.postList);
  const [buttonGroupVariant, setButtonGroupVariant] =
    React.useState(ButtonGroupVariant.noArticle);

  React.useEffect(() => {
    /*     fetch('/api')
          .then(res => res.json())
          .then(data => {
            setContent(data.content);
          })
          .catch(err => console.error(err)); */

    fetch('/api/time')
      .then(res => res.json())
      .then(data => {
        setTimeline(data);
      })
      .catch(err => console.error(err));

    if (reset) {
      setSearchVariant(SearchVariant.searchBar);
      setCarouselVariant(CarouselVariant.timeline);
      setContentVariant(ContentVariant.postList);
      setButtonGroupVariant(ButtonGroupVariant.noArticle);
      setContent('');
      setTimeline([]);
      setPostList([]);
      setTitle('');
      setReset(false);
    }

  }, [reset]);

  function encodeTitle(text) {
    if (typeof text !== "string") {
      text = JSON.stringify(text);
    }
    console.log(text, CryptoJs.enc.Base64.stringify(CryptoJs.SHA256(text)).slice(0, 20));
    return CryptoJs.enc.Base64.stringify(CryptoJs.SHA256(text)).slice(0, 8);
  }

  return (
    <Stack align="center" justify="center" spacing={'24px'} >
      <ButtonGroup variant={buttonGroupVariant} reset={setReset} />
      <Flex justify={'center'} sx={{ width: '24rem' }}>
        <Search variant={searchVariant} title={title} setPostList={setPostList} />
      </Flex>
      <Group position="center" align="center" sx={{ width: '100%' }}>
        <Carousel variant={carouselVariant} content={content} timeline={timeline} encode={encodeTitle} />
        <Content
          variant={contentVariant}
          content={content}
          postList={postList}
          setCarouselVariant={setCarouselVariant}
          setContentVariant={setContentVariant}
          setSearchVariant={setSearchVariant}
          setContent={setContent}
          setButtonGroupVariant={setButtonGroupVariant}
          setTitle={setTitle}
          encode={encodeTitle}
        />
        <RightSide />
      </Group>
    </Stack>
  )
}

export default Article;