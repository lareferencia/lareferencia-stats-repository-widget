import { Badge, Box, Button, ButtonGroup } from "@chakra-ui/react";
import { useState } from "react";
import { GeneralTabInfogram } from "./GeneralTabInfogram";
import { ByCountryTabInfogram } from "./ByCountryTabInfogram";
import { GeneralTabInfogramV2 } from "./GeneralTabInfogramV2";
import { ByCountryTabInfogramV2 } from "./ByCountryTabInfogramV2";

export const HelpTab = () => {
  const [version, setVersion] = useState<1 | 2>(1);

  return (
    <>
      {/* Version switcher */}
      <Box mt="6" mb="8" display="flex" alignItems="center" gap="4">
        <Badge fontSize="0.75rem" colorScheme="gray">Vista previa</Badge>
        <ButtonGroup size="sm" isAttached variant="outline">
          <Button
            onClick={() => setVersion(1)}
            colorScheme={version === 1 ? "teal" : "gray"}
            variant={version === 1 ? "solid" : "outline"}
          >
            Versión 1
          </Button>
          <Button
            onClick={() => setVersion(2)}
            colorScheme={version === 2 ? "teal" : "gray"}
            variant={version === 2 ? "solid" : "outline"}
          >
            Versión 2
          </Button>
        </ButtonGroup>
      </Box>

      <Box mt="2" mb="6">
        <Badge fontSize="1rem">Como interpretar el panel "General"</Badge>
      </Box>

      {version === 1 ? <GeneralTabInfogram /> : <GeneralTabInfogramV2 />}

      <Box mt="10" mb="6">
        <Badge fontWeight="bold" fontSize="1rem">
          Como interpretar el panel "Por País"
        </Badge>
      </Box>

      {version === 1 ? <ByCountryTabInfogram /> : <ByCountryTabInfogramV2 />}
    </>
  );
};
