import {
  Box,
  Card,
  Grid,
  Text,
  Icon,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Tooltip,
} from "@chakra-ui/react";
import { InfoIcon, WarningTwoIcon } from "@chakra-ui/icons";
import { FaRegEye, FaGlobe, FaLanguage } from "react-icons/fa";
import { LiaFileDownloadSolid } from "react-icons/lia";
import { GiClick } from "react-icons/gi";
import { IoFunnel } from "react-icons/io5";
import { MdNumbers, MdOutlineBarChart } from "react-icons/md";
import { BsCalendarRange, BsStack } from "react-icons/bs";
import { useTranslation } from "react-i18next";

const StepButton = ({
  number,
  title,
  subtitle,
  color,
}: {
  number: string;
  title: string;
  subtitle: string;
  color: string;
}) => (
  <AccordionButton _hover={{ bg: "gray.50" }} borderRadius="12" px="4" py="3">
    <Box display="flex" alignItems="center" gap="4" flex="1" textAlign="left">
      <Box
        bg={color}
        color="white"
        borderRadius="full"
        w="36px"
        h="36px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontWeight="800"
        fontSize="1rem"
        flexShrink={0}
        shadow="sm"
      >
        {number}
      </Box>
      <Box>
        <Text fontWeight="700" fontSize="0.9rem" color="gray.800" lineHeight="1.2">
          {title}
        </Text>
        <Text fontSize="0.72rem" color="gray.400" lineHeight="1.3" mt="0.5">
          {subtitle}
        </Text>
      </Box>
    </Box>
    <AccordionIcon color="gray.400" />
  </AccordionButton>
);

const ControlChip = ({
  icon,
  label,
  sublabel,
  color = "teal",
}: {
  icon: React.ReactNode;
  label: string;
  sublabel: string;
  color?: string;
}) => (
  <Box
    display="flex"
    alignItems="center"
    gap="3"
    bg="white"
    border="1px solid"
    borderColor="gray.100"
    borderRadius="10"
    p="3"
    shadow="xs"
  >
    <Box
      bg={`${color}.100`}
      color={`${color}.600`}
      borderRadius="8"
      p="2"
      fontSize="1.2rem"
      display="flex"
      alignItems="center"
      flexShrink={0}
    >
      {icon}
    </Box>
    <Box>
      <Text fontWeight="600" fontSize="0.8rem" color="gray.700" lineHeight="1.2">
        {label}
      </Text>
      <Text fontSize="0.7rem" color="gray.400" lineHeight="1.3" mt="0.5">
        {sublabel}
      </Text>
    </Box>
  </Box>
);

const MetricCard = ({
  icon,
  label,
  tooltip,
  color = "teal",
}: {
  icon: React.ReactNode;
  label: string;
  tooltip: string;
  color?: string;
}) => (
  <Tooltip label={tooltip} fontSize="xs" placement="top" hasArrow borderRadius="8">
    <Card
      p="3"
      borderRadius="10"
      shadow="sm"
      border="1px solid"
      borderColor="gray.100"
      cursor="default"
      _hover={{ borderColor: `${color}.200`, shadow: "md" }}
      transition="all 0.15s"
    >
      <Box display="flex" flexDir="column" alignItems="center" gap="2" textAlign="center">
        <Box
          bg={`${color}.50`}
          color={`${color}.500`}
          borderRadius="8"
          p="2.5"
          fontSize="1.2rem"
          display="flex"
          alignItems="center"
        >
          {icon}
        </Box>
        <Text fontWeight="700" fontSize="0.82rem" color="gray.700">
          {label}
        </Text>
        <Icon as={InfoIcon} color="gray.300" fontSize="0.7rem" />
      </Box>
    </Card>
  </Tooltip>
);

export const GeneralTabInfogram = () => {
  const { t } = useTranslation();

  return (
    <Accordion allowMultiple defaultIndex={[]}>

      {/* Step 1 — Controls */}
      <AccordionItem border="1px solid" borderColor="gray.100" borderRadius="12" mb="3" overflow="hidden">
        <StepButton
          number="1"
          title={t("help-step1-title")}
          subtitle={t("help-step1-subtitle")}
          color="teal"
        />
        <AccordionPanel pb="4" px="4">
          <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)" }} gap="3">
            <ControlChip icon={<FaGlobe />} label={t("help-step1-repo-label")} sublabel={t("help-step1-repo-sub")} color="teal" />
            <ControlChip icon={<BsCalendarRange />} label={t("help-step1-dates-label")} sublabel={t("help-step1-dates-sub")} color="blue" />
            <ControlChip icon={<BsStack />} label={t("help-step1-level-label")} sublabel={t("help-step1-level-sub")} color="purple" />
            <ControlChip icon={<FaLanguage />} label={t("help-step1-lang-label")} sublabel={t("help-step1-lang-sub")} color="orange" />
          </Grid>
        </AccordionPanel>
      </AccordionItem>

      {/* Step 2 — Metrics */}
      <AccordionItem border="1px solid" borderColor="gray.100" borderRadius="12" mb="3" overflow="hidden">
        <StepButton
          number="2"
          title={t("help-step2-title")}
          subtitle={t("help-step2-subtitle")}
          color="blue"
        />
        <AccordionPanel pb="4" px="4">
          <Box bg="blue.50" borderRadius="10" p="3" mb="4" display="flex" alignItems="flex-start" gap="2">
            <Icon as={InfoIcon} color="blue.400" mt="0.5" flexShrink={0} />
            <Text fontSize="0.78rem" color="blue.700" lineHeight="1.5">{t("help-step2-info")}</Text>
          </Box>
          <Grid
            templateColumns={{ base: "repeat(2, 1fr)", sm: "repeat(3, 1fr)", md: "repeat(5, 1fr)" }}
            gap="3"
            mb="4"
          >
            <MetricCard icon={<MdNumbers />} label="Total" tooltip={t("help-step2-total-tip")} color="gray" />
            <MetricCard icon={<FaRegEye />} label={t("views")} tooltip={t("help-step2-views-tip")} color="teal" />
            <MetricCard icon={<LiaFileDownloadSolid />} label={t("downloads")} tooltip={t("help-step2-downloads-tip")} color="blue" />
            <MetricCard icon={<GiClick />} label={t("outlinks")} tooltip={t("help-step2-outlinks-tip")} color="purple" />
            <MetricCard icon={<IoFunnel />} label={t("conversions")} tooltip={t("help-step2-conversions-tip")} color="orange" />
          </Grid>
          <Box bg="orange.50" border="1px solid" borderColor="orange.200" borderRadius="10" p="4" display="flex" alignItems="flex-start" gap="3">
            <Box bg="orange.100" color="orange.500" borderRadius="8" p="2" display="flex" alignItems="center" flexShrink={0}>
              <Icon as={WarningTwoIcon} fontSize="1rem" />
            </Box>
            <Box>
              <Text fontWeight="700" fontSize="0.82rem" color="orange.800" mb="1">{t("help-conversion-title")}</Text>
              <Text fontSize="0.75rem" color="orange.700" lineHeight="1.6">{t("help-conversion-text")}</Text>
            </Box>
          </Box>
        </AccordionPanel>
      </AccordionItem>

      {/* Step 3 — Chart */}
      <AccordionItem border="1px solid" borderColor="gray.100" borderRadius="12" mb="3" overflow="hidden">
        <StepButton
          number="3"
          title={t("help-step3-title")}
          subtitle={t("help-step3-subtitle")}
          color="purple"
        />
        <AccordionPanel pb="4" px="4">
          <Box bg="purple.50" borderRadius="10" p="3" mb="4" display="flex" alignItems="flex-start" gap="2">
            <Icon as={MdOutlineBarChart} color="purple.500" mt="0.5" flexShrink={0} fontSize="1.1rem" />
            <Text fontSize="0.78rem" color="purple.700" lineHeight="1.5">{t("help-step3-info")}</Text>
          </Box>
          <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)" }} gap="3">
            <Card p="3" borderRadius="10" shadow="sm" border="1px solid" borderColor="gray.100">
              <Text fontWeight="600" fontSize="0.78rem" color="gray.500" mb="1">{t("help-step3-x-label")}</Text>
              <Text fontWeight="700" fontSize="0.85rem" color="gray.700">{t("help-step3-x-value")}</Text>
              <Text fontSize="0.72rem" color="gray.400" mt="1">{t("help-step3-x-desc")}</Text>
            </Card>
            <Card p="3" borderRadius="10" shadow="sm" border="1px solid" borderColor="gray.100">
              <Text fontWeight="600" fontSize="0.78rem" color="gray.500" mb="1">{t("help-step3-y-label")}</Text>
              <Text fontWeight="700" fontSize="0.85rem" color="gray.700">{t("help-step3-y-value")}</Text>
              <Text fontSize="0.72rem" color="gray.400" mt="1">{t("help-step3-y-desc")}</Text>
            </Card>
          </Grid>
        </AccordionPanel>
      </AccordionItem>

    </Accordion>
  );
};
