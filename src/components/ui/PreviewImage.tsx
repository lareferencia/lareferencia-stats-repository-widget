import { Box, Img } from '@chakra-ui/react';
import previewImageSrc from '/assets/widget-preview.png'; 


export const PreviewImage = () => {
    
  return (
    <Box display='flex' justifyContent='center' alignContent='center'>
        <Img objectFit='cover'
          src={previewImageSrc} alt=""
        />
      </Box>
  )
}

