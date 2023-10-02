import React from "react";
import List from './list';
import { Stack, useMantineTheme } from "@mantine/core";
import "./style.css";

// State about the number of items should be managed here
const Carousel = ({ variant = '', content = {}, timeline = {}, encode }) => {
  const theme = useMantineTheme();
  const [captions, setCaptions] = React.useState([]);

  function extractHeadersFromMD(md) {
    if (!md) return [];

    // Remove code blocks
    md = md.replace(/```[\s\S]*?```/g, '');
    // 使用正则表达式匹配所有标题
    const matches = [...md.matchAll(/(#+) (.+)/g)];

    if (!matches.length) {
      return [];
    }

    const organized = [];

    // 辅助函数，用于在正确的层级上插入标题
    const insertToTree = (level, label, tree) => {
      if (!tree) return; // 新增加的保护逻辑

      if (level === 1) {
        tree.push({ label, children: [] });
      } else {
        if (tree[tree.length - 1]) { // 确保最后一个元素存在
          insertToTree(level - 1, label, tree[tree.length - 1].children);
        }
      }
    };

    matches.forEach(match => {
      const level = match[1].length;  // 通过 # 的数量判断标题的等级
      const label = match[2];
      insertToTree(level, label, organized);
    });

    // 删除没有子标题的空 children 属性
    const cleanupEmptyChildren = (arr) => {
      arr.forEach(item => {
        if (item && item.children && item.children.length === 0) { // 添加item的检查
          delete item.children;
        } else if (item && item.children) {
          cleanupEmptyChildren(item.children);
        }
      });
    };
    cleanupEmptyChildren(organized);
    return organized;
  }

  React.useEffect(() => {
    setCaptions(extractHeadersFromMD(content));
    console.log(extractHeadersFromMD(content));
  }, [content]);

  return (
    <Stack
      align='center'
      sx={{
        position: 'fixed',
        top: '40%',
        left: '3%',
        transform: 'translateY(-50%)',
        width: '10%'
      }}
    >
      <List variant={variant} captions={captions} timeline={timeline} encode={encode} />
    </Stack>

  );
};

export default Carousel;