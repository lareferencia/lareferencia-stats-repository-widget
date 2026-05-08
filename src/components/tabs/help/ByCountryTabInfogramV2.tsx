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
import { FaRegEye, FaGlobe, FaMapMarkedAlt } from "react-icons/fa";
import { LiaFileDownloadSolid } from "react-icons/lia";
import { GiClick } from "react-icons/gi";
import { IoFunnel } from "react-icons/io5";
import { MdPieChart, MdOutlineTableChart } from "react-icons/md";
import { BsGlobe2 } from "react-icons/bs";

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

const FeatureCard = ({
  icon,
  label,
  description,
  color = "purple",
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
  color?: string;
}) => (
  <Box
    display="flex"
    alignItems="flex-start"
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
      fontSize="1.1rem"
      display="flex"
      alignItems="center"
      flexShrink={0}
    >
      {icon}
    </Box>
    <Box>
      <Text fontWeight="700" fontSize="0.82rem" color="gray.700" lineHeight="1.2">
        {label}
      </Text>
      <Text fontSize="0.72rem" color="gray.500" lineHeight="1.4" mt="1">
        {description}
      </Text>
    </Box>
  </Box>
);

export const ByCountryTabInfogramV2 = () => {
  return (
    <Accordion allowMultiple defaultIndex={[0, 1, 2]}>

      {/* Step 1 — Stats panels */}
      <AccordionItem border="1px solid" borderColor="gray.100" borderRadius="12" mb="3" overflow="hidden">
        <StepButton
          number="1"
          title="Paneles de estadísticas por país"
          subtitle="Interactuá con el gráfico para filtrar por país"
          color="teal"
        />
        <AccordionPanel pb="4" px="4">
          <Box
            bg="teal.50"
            borderRadius="10"
            p="3"
            mb="4"
            display="flex"
            alignItems="flex-start"
            gap="2"
          >
            <Icon as={InfoIcon} color="teal.400" mt="0.5" flexShrink={0} />
            <Text fontSize="0.78rem" color="teal.700" lineHeight="1.5">
              Pasá el cursor sobre el gráfico de torta para ver las estadísticas del{" "}
              <strong>país seleccionado</strong> en todos los niveles.
            </Text>
          </Box>

          <Grid
            templateColumns={{ base: "repeat(2, 1fr)", sm: "repeat(4, 1fr)" }}
            gap="3"
            mb="4"
          >
            <MetricCard icon={<FaRegEye />} label="Vistas" tooltip="Vistas del país en todos los niveles e intervalo seleccionado." color="teal" />
            <MetricCard icon={<LiaFileDownloadSolid />} label="Descargas" tooltip="Descargas del país en todos los niveles e intervalo seleccionado." color="blue" />
            <MetricCard icon={<GiClick />} label="Enlaces" tooltip="Clics en enlaces del país en todos los niveles e intervalo seleccionado." color="purple" />
            <MetricCard icon={<IoFunnel />} label="Conversiones" tooltip="Conversiones del país en todos los niveles e intervalo seleccionado." color="orange" />
          </Grid>

          <Box
            bg="orange.50"
            border="1px solid"
            borderColor="orange.200"
            borderRadius="10"
            p="4"
            display="flex"
            alignItems="flex-start"
            gap="3"
          >
            <Box
              bg="orange.100"
              color="orange.500"
              borderRadius="8"
              p="2"
              display="flex"
              alignItems="center"
              flexShrink={0}
            >
              <Icon as={WarningTwoIcon} fontSize="1rem" />
            </Box>
            <Box>
              <Text fontWeight="700" fontSize="0.82rem" color="orange.800" mb="1">
                ¿Qué es una conversión?
              </Text>
              <Text fontSize="0.75rem" color="orange.700" lineHeight="1.6">
                Ocurre cuando un mismo usuario en una misma sesión{" "}
                <strong>descarga un ítem luego de haberlo visto</strong>, o hace clic en el enlace
                que dirige al ítem fuera del nivel repositorio.
              </Text>
            </Box>
          </Box>
        </AccordionPanel>
      </AccordionItem>

      {/* Step 2 — Pie chart */}
      <AccordionItem border="1px solid" borderColor="gray.100" borderRadius="12" mb="3" overflow="hidden">
        <StepButton
          number="2"
          title="Gráfico de torta por país"
          subtitle="Distribución de eventos según país de origen"
          color="blue"
        />
        <AccordionPanel pb="4" px="4">
          <Box
            bg="blue.50"
            borderRadius="10"
            p="3"
            display="flex"
            alignItems="flex-start"
            gap="2"
          >
            <Icon as={MdPieChart} color="blue.400" mt="0.5" flexShrink={0} fontSize="1.1rem" />
            <Text fontSize="0.78rem" color="blue.700" lineHeight="1.5">
              Cada segmento representa un país. El tamaño indica su proporción del total de eventos
              (vistas + descargas + enlaces). <strong>Pasá el cursor</strong> sobre un segmento
              para ver sus estadísticas en los paneles superiores.
            </Text>
          </Box>
        </AccordionPanel>
      </AccordionItem>

      {/* Step 3 — Map + table */}
      <AccordionItem border="1px solid" borderColor="gray.100" borderRadius="12" mb="3" overflow="hidden">
        <StepButton
          number="3"
          title="Mapa y tabla por continente"
          subtitle="Explorá los datos filtrados por región geográfica"
          color="purple"
        />
        <AccordionPanel pb="4" px="4">
          <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)" }} gap="3">
            <FeatureCard
              icon={<BsGlobe2 />}
              label="Selector de continente"
              description="Filtra el mapa y la tabla. Solo aparecen países con eventos en el período seleccionado."
              color="purple"
            />
            <FeatureCard
              icon={<FaMapMarkedAlt />}
              label="Mapa del continente"
              description="Intensidad de color según cantidad de eventos. Pasá el cursor para ver el detalle de cada país."
              color="purple"
            />
            <FeatureCard
              icon={<MdOutlineTableChart />}
              label="Tabla de países"
              description="Lista los países del continente con sus eventos totales, ordenados de mayor a menor."
              color="purple"
            />
            <FeatureCard
              icon={<FaGlobe />}
              label="Detalle por país"
              description="Hacé clic en un país de la tabla o el mapa para ver sus estadísticas en los paneles superiores."
              color="purple"
            />
          </Grid>
        </AccordionPanel>
      </AccordionItem>

    </Accordion>
  );
};
