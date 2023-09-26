import React from "react";
import ButtonGroup from "../../components/ButtonGroup";
import Background from "../../components/Background/index";
import { ButtonGroupVariant } from "../../../models/variant";
import { Flex } from "@mantine/core";

const Exhibit = ({ }) => {
  return (
    <Flex sx={{
      width: '100%',
      height: '100vh',
      justifyContent: 'center',
      alignItems: 'flex-start'
    }} >
      <Background />
      <ButtonGroup variant={ButtonGroupVariant.noExhibit} />
    </Flex>
  );
}

export default Exhibit;