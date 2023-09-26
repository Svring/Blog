import React from 'react';
import { Link } from "react-router-dom";
import { Group } from "@mantine/core";
import { ButtonGroupVariant } from "../../../models/variant";

interface ButtonGroupProps {
  variant: string;
  reset?: (prevState: boolean) => void; // 添加可选的 reset 函数
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ variant, reset }) => {

  const LinkButton = ({ variant }) => {
    return (
      <Link
        style={{ color: "white" }}
        to={`/${variant}`}
        onClick={() => {
          if (variant === 'article') {
            reset(true);
          }
        }}
      >
        {variant.toUpperCase()}
      </Link>
    )
  }

  const NewButtonGroup = ({ variant }) => {
    const buttonConfig = {
      [ButtonGroupVariant.noExhibit]: ["article", "gallery"],
      [ButtonGroupVariant.noGallery]: ["exhibit", "article"],
      [ButtonGroupVariant.noArticle]: ["exhibit", "gallery"],
    };

    return (
      <Group position="center"
        sx={{
          fontWeight: 700,
          fontSize: '1.5rem',
          fontFamily: 'athelas bold',
          gap: '2rem',
          paddingTop: '1rem',
          zIndex: 1
        }}
      >
        {buttonConfig[variant].map(variantItem => (
          <LinkButton key={variantItem} variant={variantItem} />
        ))}
      </Group>
    )
  }

  return (
    <NewButtonGroup variant={variant} />
  );
};

export default ButtonGroup;
