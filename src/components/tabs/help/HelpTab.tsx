import { Badge, Box } from "@chakra-ui/react";
import { GeneralTabInfogram } from "./GeneralTabInfogram";
import { ByCountryTabInfogram } from "./ByCountryTabInfogram";

export const HelpTab = () => {
  return (
    <>
      <Box mt="8" mb="6">
        <Badge fontSize="1rem">Como interpretar el panel "General"</Badge>
      </Box>
      <GeneralTabInfogram />

      <Box mt="10" mb="6">
        <Badge fontWeight="bold" fontSize="1rem">
          Como interpretar el panel "Por País"
        </Badge>
      </Box>
      <ByCountryTabInfogram />
    </>
  );
};
