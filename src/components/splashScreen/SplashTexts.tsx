import { Box, Heading } from '@chakra-ui/react'
import React from 'react'

export const SplashText: React.FC<{}> = ({}) => {
  return (
    <Box pos="relative" zIndex="5">
      <Heading
        as="h2"
        mb="1rem"
        size={'xl'}
        color="mainWhite"
        letterSpacing="2px"
        position="relative"
      >
        KHONGCHAI.G
      </Heading>
      <Box
        bg="mainGradient"
        margin="0 auto"
        w="fit-content"
        backgroundClip="text"
      >
        <Heading as="h3" fontWeight="bold" size="lg">
          Portfolio
        </Heading>
      </Box>
    </Box>
  )
}
