import { BsSearch } from "react-icons/bs";
import React from "react";
import { SearchVariant } from "../../../models/variant";
import { TextInput, useMantineTheme, Title, Loader } from "@mantine/core";

export default function Search({ variant, title, setPostList }) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const theme = useMantineTheme();

  React.useEffect(() => {
    fetch(`/api/posts/${searchTerm}`)
      .then(res => res.json())
      .then(data => {
        setPostList(data);
      })
      .catch(err => console.error(err));
  }, [isLoading, title]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  }

  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      // here is the logic of searching for specific post
      setIsLoading(true);

      fetch(`/api/posts/${searchTerm}`)
        .then(res => res.json())
        .then(data => {
          setPostList(data);
          setIsLoading(false);
        })
        .catch(err => {
          console.log(err);
          setIsLoading(false);
        });
    }
  }

  const variantCheck = (variant) => {
    switch (variant) {
      case SearchVariant.searchBar:
        return <TextInput
          placeholder="Search posts..."
          onChange={handleChange}
          onKeyDown={handleSearch}
          radius={"xl"}
          size="md"
          icon={isLoading ? <Loader size={18} /> : <BsSearch size={18} />}
          sx={{
            backgroundColor: theme.colors.background[0],
            color: theme.colors.white,
            width: "100%",
          }}
          disabled={isLoading}
        />;
      case SearchVariant.title:
        return <Title order={1}>{title}</Title>;
      default:
        return null;
    }
  }

  return (
    variantCheck(variant)
  )
}