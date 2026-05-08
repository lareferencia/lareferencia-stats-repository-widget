import { Box, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { GeneralTabInfogram } from "./GeneralTabInfogram";
import { ByCountryTabInfogram } from "./ByCountryTabInfogram";

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <Box mb="6">
    <Text
      fontWeight="700"
      fontSize="1.05rem"
      color="gray.700"
      display="inline-block"
      borderBottom="3px solid"
      borderColor="teal.400"
      pb="1"
    >
      {children}
    </Text>
  </Box>
);

export const HelpTab = () => {
  const { t } = useTranslation();

  return (
    <Box minH="100%">
      <Box mt="8" >
        <SectionTitle>{t("help-general-title")}</SectionTitle>
        <GeneralTabInfogram />
      </Box>

      <Box mt="10">
        <SectionTitle>{t("help-country-title")}</SectionTitle>
        <ByCountryTabInfogram />
      </Box>
    </Box>
  );
};
