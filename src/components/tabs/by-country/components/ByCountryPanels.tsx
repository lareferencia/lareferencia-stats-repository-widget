import { Box, Card, Grid, Text } from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";

import { FaRegEye } from "react-icons/fa";
import { LiaFileDownloadSolid } from "react-icons/lia";
import { GiClick } from "react-icons/gi";
import { IoFunnel } from "react-icons/io5";
import { MdNumbers } from "react-icons/md";
import { CountryObject } from "../../../../interfaces/byCountry.interface";
import { EventLabels } from "../../../../interfaces/stadistics.interface";
import { TFunction } from "i18next";

type Props = {
  country: CountryObject;
  eventLabels: EventLabels;
  t: TFunction;
};

const iconMap = {
  views: <FaRegEye />,
  downloads: <LiaFileDownloadSolid />,
  outlinks: <GiClick />,
  conversions: <IoFunnel />,
};

export const ByCountryPanels = ({ country, eventLabels, t }: Props) => {
  return (
    <Box>
      <Grid
        gridTemplateColumns={{
          base: "repeat(1, minmax(0px, 1fr))",
          md: "repeat(2, minmax(0px, 1fr))",
          lg: "repeat(5, minmax(0px, 1fr))",
        }}
        gap="4"
      >
        {/* Total panel */}
        <Card padding="4" shadow="sm" borderRadius="12">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid>
              <Box display="flex" gap="2">
                <Text as="span" fontWeight="600" color="gray" fontSize="1.1rem">
                  { t("country") }
                </Text>
                <Tooltip
                  label={t("tooltip-by-country-panel")}
                  fontSize="md"
                >
                  <InfoIcon fontSize="12px" color="teal" />
                </Tooltip>
              </Box>
              <Text as="span" fontWeight="700" fontSize="1.1rem" overflow='hidden' whiteSpace='nowrap' isTruncated >
                {country.name}
              </Text>
            </Grid>
            <Card
              p="4"
              bg="gray.100"
              variant="elevated"
              shadow="xs"
              borderRadius="12"
            >
              <MdNumbers />
            </Card>
          </Box>
        </Card>

        {/* Event panels */}

        {Object.keys(eventLabels).map((label, index) => (
          <Card padding="4" shadow="sm" borderRadius="12" key={index}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid>
                <Text as="span" fontWeight="600" fontSize="1.1rem" color="gray">
                  {eventLabels[label as keyof EventLabels]}
                </Text>
                <Text
                  as="span"
                  fontWeight='bold'
                  fontSize='1.3rem'
                >
                  {country[label as keyof EventLabels]?.toLocaleString() || 0}
                </Text>
              </Grid>
              <Card
                p="4"
                bg="gray.100"
                variant="elevated"
                shadow="xs"
                borderRadius="12"
              >
                {iconMap[label as keyof EventLabels]}
              </Card>
            </Box>
          </Card>
        ))}
      </Grid>
    </Box>
  );
};
