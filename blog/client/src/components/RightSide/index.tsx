import React from "react";
import { Flex, Button, useMantineTheme } from "@mantine/core";
import { BsArrowUp } from "react-icons/bs";

const styles = {
  button: {
    position: 'fixed',
    bottom: '10px',
    right: '10px',
    padding: '10px 20px',
    background: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    zIndex: 1000, // 确保按钮始终位于页面的最上面
  },
};

const leftSide = () => {
  const theme = useMantineTheme();

  function ScrollToTopButton() {
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
      // 监听滚动事件
      const checkScrollPosition = () => {
        if (window.scrollY > 30 * 16) {  // 30rem，假设每rem为16px
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      };

      window.addEventListener('scroll', checkScrollPosition);

      // 清理事件监听器
      return () => window.removeEventListener('scroll', checkScrollPosition);
    }, []);

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };

    return (
      isVisible &&
      <Button
        onClick={scrollToTop}
        sx={{
          position: 'fixed',
          top: '5rem',
          right: '10%',
          borderRadius: '25px',
          width: '50px',
          height: '50px',
          backgroundColor: theme.colors.secondary[0]
        }}
      >
        <BsArrowUp />
      </Button>
    );
  }

  return (
    <Flex justify={'end'} sx={{ paddingInlineEnd: '2rem', position: 'fixed' }} >
      <ScrollToTopButton />
    </Flex>
  )
}

export default leftSide;