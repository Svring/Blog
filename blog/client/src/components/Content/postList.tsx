import React from "react";
import {
  SearchVariant, ContentVariant,
  CarouselVariant, ButtonGroupVariant
} from '../../../models/variant';
import { List, Text, Title, MantineProvider, Divider, Group } from "@mantine/core";

const PostList = ({ postList, setContent, setContentVariant,
  setCarouselVariant, setSearchVariant, setButtonGroupVariant, setTitle, encode }) => {
  const [sortedList, setSortedList] = React.useState(postList);

  React.useEffect(() => {
    setSortedList(groupByYear(postList));
  }, [postList]);

  const openPost = (id) => {
    fetch(`/api/post/${id}`)
      .then(res => res.json())
      .then(data => {
        setContent(data.content);
        setTitle(data.title)
        setContentVariant(ContentVariant.content);
        setCarouselVariant(CarouselVariant.headline);
        setSearchVariant(SearchVariant.title);
        setButtonGroupVariant(ButtonGroupVariant.noGallery)
      })
      .catch(err => console.error(err));
  }

  const DataDisplay: React.FC<DataProps> = ({ data }) => {
    return (
      <MantineProvider theme={{ colorScheme: 'dark', fontFamily: 'Charter' }}>
        <List spacing={'md'}>
          {Object.entries(data)
            .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
            .map(([year, items]) => (
              <List.Item icon={<Text color="gray" >.</Text>} key={year}>
                <Title order={2}>{year}</Title>
                <List>
                  {items.map(item => (
                    <List.Item icon={'-'} key={Number(item.id)}>
                      <Group spacing={'md'}>
                        <Title order={4}>{item.month + '/' + item.day}</Title>
                        <Divider orientation="vertical" color="white" />
                        <Title
                          order={3}
                          onClick={() => openPost(item.id)}
                          sx={{ cursor: 'pointer' }}
                        >
                          {item.title}
                        </Title>
                      </Group>
                    </List.Item>
                  ))}
                </List>
              </List.Item>
            ))}
        </List>
      </MantineProvider>
    )
  }

  return DataDisplay({ data: sortedList });
}

function groupByYear(data) {
  const sortedData = data.sort((a, b) => {
    if (a.year !== b.year) {
      return b.year - a.year;
    }
    if (a.month !== b.month) {
      return b.month - a.month;
    }
    return b.day - a.day;
  });

  return sortedData.reduce((acc, item) => {
    if (!acc[item.year]) {
      acc[item.year] = [];
    }
    acc[item.year].push(item);
    return acc;
  }, {});
}


interface DataItem {
  title: string;
  year: number;
  month: number;
  day: number;
  id: String;
}

interface DataProps {
  data: {
    [key: number]: DataItem[];
  };
}

export default PostList;
