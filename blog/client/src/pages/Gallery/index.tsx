import React from "react";
import { Flex, Space } from "@mantine/core";
import ButtonGroup from "../../components/ButtonGroup";
import MasonryFlow from "../../components/Masonry";
import { ButtonGroupVariant } from "../../../models/variant";

export default function Gallery() {
  return (
    <Flex sx={{
      width: '100%',
      minHeight: '100%',
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'column'
    }} >
      <ButtonGroup variant={ButtonGroupVariant.noGallery} />
      <Space h="md" />
      <MasonryFlow />
    </Flex>
  );
}