import { Badge, Box, Image } from "@chakra-ui/react";
import helpImg from "/assets/help-img.png";
import helpImg2 from "/assets/help-img2.png";

export const HelpTab = () => {
  return (
    <>
      <Badge fontSize="1rem">Como interpretar el panel "General"</Badge>
      <Box display="flex" flexDir="column" alignItems="center">
        <Image width="80%" src={helpImg} />
      </Box>
      <Badge fontWeight="bold" fontSize="1rem">
        Como interpretar el panel "Por Pais"
      </Badge>
      <Box display="flex" flexDir="column" alignItems="center">
        <Image width="80%" src={helpImg2} />
      </Box>
    </>
  );
};
