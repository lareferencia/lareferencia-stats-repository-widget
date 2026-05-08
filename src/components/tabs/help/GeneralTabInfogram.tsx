import {
  Box,
  Card,
  Grid,
  Text,
  Divider,
  Icon,
} from "@chakra-ui/react";
import { InfoIcon, WarningTwoIcon } from "@chakra-ui/icons";
import { FaRegEye, FaGlobe, FaLanguage } from "react-icons/fa";
import { LiaFileDownloadSolid } from "react-icons/lia";
import { GiClick } from "react-icons/gi";
import { IoFunnel } from "react-icons/io5";
import { MdNumbers, MdOutlineBarChart } from "react-icons/md";
import { BsCalendarRange, BsStack } from "react-icons/bs";

const Section = ({
  number,
  title,
  color,
  children,
}: {
  number: string;
  title: string;
  color: string;
  children: React.ReactNode;
}) => (
  <Box>
    <Box display="flex" alignItems="center" gap="3" mb="3">
      <Box
        bg={color}
        color="white"
        borderRadius="full"
        w="28px"
        h="28px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontWeight="700"
        fontSize="0.85rem"
        flexShrink={0}
      >
        {number}
      </Box>
      <Text fontWeight="700" fontSize="0.95rem" color="gray.700">
        {title}
      </Text>
    </Box>
    {children}
  </Box>
);

const Chip = ({
  icon,
  label,
  sublabel,
  color = "teal",
}: {
  icon: React.ReactNode;
  label: string;
  sublabel?: string;
  color?: string;
}) => (
  <Card
    p="3"
    borderRadius="10"
    shadow="sm"
    border="1px solid"
    borderColor="gray.100"
    display="flex"
    flexDir="row"
    alignItems="center"
    gap="3"
  >
    <Box
      bg={`${color}.50`}
      color={`${color}.500`}
      borderRadius="8"
      p="2"
      fontSize="1.1rem"
      display="flex"
      alignItems="center"
    >
      {icon}
    </Box>
    <Box>
      <Text fontWeight="600" fontSize="0.8rem" color="gray.700" lineHeight="1.2">
        {label}
      </Text>
      {sublabel && (
        <Text fontSize="0.7rem" color="gray.400" lineHeight="1.2">
          {sublabel}
        </Text>
      )}
    </Box>
  </Card>
);

const StatCard = ({
  icon,
  label,
  description,
  color = "teal",
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
  color?: string;
}) => (
  <Card
    p="3"
    borderRadius="10"
    shadow="sm"
    border="1px solid"
    borderColor="gray.100"
  >
    <Box display="flex" alignItems="center" gap="2" mb="2">
      <Box
        bg={`${color}.50`}
        color={`${color}.500`}
        borderRadius="6"
        p="1.5"
        fontSize="0.9rem"
        display="flex"
        alignItems="center"
      >
        {icon}
      </Box>
      <Text fontWeight="700" fontSize="0.85rem" color="gray.700">
        {label}
      </Text>
    </Box>
    <Text fontSize="0.72rem" color="gray.500" lineHeight="1.4">
      {description}
    </Text>
  </Card>
);

export const GeneralTabInfogram = () => {
  return (
    <Box display="flex" flexDir="column" gap="6">

      {/* Controls row */}
      <Section number="1" title="Controles del dashboard" color="teal.400">
        <Grid
          templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
          gap="3"
        >
          <Chip
            icon={<FaGlobe />}
            label="Selector de repositorio"
            sublabel="Repositorio a analizar"
            color="teal"
          />
          <Chip
            icon={<BsCalendarRange />}
            label="Selector de fechas"
            sublabel="Intervalo de tiempo"
            color="blue"
          />
          <Chip
            icon={<BsStack />}
            label="Selector de nivel"
            sublabel="LA Referencia / Repositorio / Nodo / Total"
            color="purple"
          />
          <Chip
            icon={<FaLanguage />}
            label="Selector de idioma"
            sublabel="Idioma de la interfaz"
            color="orange"
          />
        </Grid>
      </Section>

      <Divider />

      {/* Stats panels */}
      <Section number="2" title="Paneles de estadísticas" color="blue.400">
        <Box
          bg="blue.50"
          borderRadius="10"
          p="3"
          mb="3"
          display="flex"
          alignItems="flex-start"
          gap="2"
        >
          <Icon as={InfoIcon} color="blue.400" mt="0.5" flexShrink={0} />
          <Text fontSize="0.78rem" color="blue.700" lineHeight="1.5">
            Los valores mostrados corresponden al <strong>nivel seleccionado</strong>. Si el nivel es
            "Eventos totales", cada métrica suma los 3 niveles (LA Referencia + Repositorio + Nodo Nacional).
          </Text>
        </Box>
        <Grid
          templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(5, 1fr)" }}
          gap="3"
        >
          <StatCard
            icon={<MdNumbers />}
            label="Total"
            description="Suma de vistas, descargas y enlaces en el nivel seleccionado."
            color="gray"
          />
          <StatCard
            icon={<FaRegEye />}
            label="Vistas"
            description="Cantidad de veces que se vio el ítem."
            color="teal"
          />
          <StatCard
            icon={<LiaFileDownloadSolid />}
            label="Descargas"
            description="Cantidad de veces que se descargó el ítem."
            color="blue"
          />
          <StatCard
            icon={<GiClick />}
            label="Enlaces"
            description="Clics en enlaces que apuntan al ítem."
            color="purple"
          />
          <StatCard
            icon={<IoFunnel />}
            label="Conversiones"
            description="Usuario que vio y luego descargó el ítem en la misma sesión, o hizo clic en el enlace externo."
            color="orange"
          />
        </Grid>

        {/* Conversion callout */}
        <Box
          mt="3"
          bg="orange.50"
          border="1px solid"
          borderColor="orange.200"
          borderRadius="10"
          p="3"
          display="flex"
          alignItems="flex-start"
          gap="2"
        >
          <Icon as={WarningTwoIcon} color="orange.400" mt="0.5" flexShrink={0} />
          <Text fontSize="0.78rem" color="orange.800" lineHeight="1.5">
            <strong>Conversión:</strong> ocurre cuando un mismo usuario en una misma sesión descarga un ítem
            (artículo, tesis, etc.) luego de haberlo visto en el repositorio, o cuando hace clic en el
            enlace que dirige al ítem fuera del nivel repositorio.
          </Text>
        </Box>
      </Section>

      <Divider />

      {/* Chart */}
      <Section number="3" title="Gráfico de barras apiladas" color="purple.400">
        <Box
          bg="purple.50"
          borderRadius="10"
          p="3"
          mb="3"
          display="flex"
          alignItems="flex-start"
          gap="2"
        >
          <Icon as={MdOutlineBarChart} color="purple.400" mt="0.5" flexShrink={0} fontSize="1.1rem" />
          <Text fontSize="0.78rem" color="purple.700" lineHeight="1.5">
            Visualiza la evolución mensual de los eventos en el <strong>nivel e intervalo de tiempo seleccionados</strong>.
            La línea superpuesta representa las <strong>conversiones</strong>.
            Al pasar el cursor sobre una barra se ven los valores por tipo de evento.
          </Text>
        </Box>
        <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)" }} gap="3">
          <Card p="3" borderRadius="10" shadow="sm" border="1px solid" borderColor="gray.100">
            <Text fontWeight="600" fontSize="0.8rem" color="gray.600" mb="1">Eje X</Text>
            <Text fontSize="0.75rem" color="gray.500">Meses dentro del intervalo seleccionado</Text>
          </Card>
          <Card p="3" borderRadius="10" shadow="sm" border="1px solid" borderColor="gray.100">
            <Text fontWeight="600" fontSize="0.8rem" color="gray.600" mb="1">Eje Y</Text>
            <Text fontSize="0.75rem" color="gray.500">Cantidad de eventos acumulados por mes</Text>
          </Card>
        </Grid>
      </Section>

    </Box>
  );
};
