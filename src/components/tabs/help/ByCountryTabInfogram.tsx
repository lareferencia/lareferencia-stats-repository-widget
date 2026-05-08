import {
  Box,
  Card,
  Grid,
  Text,
  Divider,
  Icon,
} from "@chakra-ui/react";
import { InfoIcon, WarningTwoIcon } from "@chakra-ui/icons";
import { FaRegEye, FaGlobe, FaMapMarkedAlt } from "react-icons/fa";
import { LiaFileDownloadSolid } from "react-icons/lia";
import { GiClick } from "react-icons/gi";
import { IoFunnel } from "react-icons/io5";
import { MdPieChart, MdOutlineTableChart } from "react-icons/md";
import { BsGlobe2 } from "react-icons/bs";

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

export const ByCountryTabInfogram = () => {
  return (
    <Box display="flex" flexDir="column" gap="6">

      {/* Stats panels */}
      <Section number="1" title="Paneles de estadísticas por país" color="teal.400">
        <Box
          bg="teal.50"
          borderRadius="10"
          p="3"
          mb="3"
          display="flex"
          alignItems="flex-start"
          gap="2"
        >
          <Icon as={InfoIcon} color="teal.400" mt="0.5" flexShrink={0} />
          <Text fontSize="0.78rem" color="teal.700" lineHeight="1.5">
            Al pasar el cursor sobre el gráfico de torta, los paneles muestran las estadísticas
            del <strong>país seleccionado</strong> en todos los niveles, dentro del intervalo de tiempo configurado.
          </Text>
        </Box>
        <Grid
          templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
          gap="3"
        >
          <StatCard
            icon={<FaRegEye />}
            label="Vistas"
            description="Vistas del país en todos los niveles e intervalo seleccionado."
            color="teal"
          />
          <StatCard
            icon={<LiaFileDownloadSolid />}
            label="Descargas"
            description="Descargas del país en todos los niveles e intervalo seleccionado."
            color="blue"
          />
          <StatCard
            icon={<GiClick />}
            label="Enlaces"
            description="Clics en enlaces del país en todos los niveles e intervalo seleccionado."
            color="purple"
          />
          <StatCard
            icon={<IoFunnel />}
            label="Conversiones"
            description="Conversiones del país en todos los niveles e intervalo seleccionado."
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
            luego de haberlo visto, o hace clic en el enlace que dirige al ítem fuera del nivel repositorio.
          </Text>
        </Box>
      </Section>

      <Divider />

      {/* Pie chart */}
      <Section number="2" title="Gráfico de torta por país" color="blue.400">
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
            Muestra la <strong>distribución de eventos totales</strong> (suma de vistas, descargas y
            enlaces) según el país de proveniencia. Al pasar el cursor sobre un segmento se actualiza
            el panel superior con las estadísticas de ese país.
          </Text>
        </Box>
      </Section>

      <Divider />

      {/* Map + table */}
      <Section number="3" title="Mapa y tabla por continente" color="purple.400">
        <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)" }} gap="3">
          <Card p="3" borderRadius="10" shadow="sm" border="1px solid" borderColor="gray.100">
            <Box display="flex" alignItems="center" gap="2" mb="2">
              <Box bg="purple.50" color="purple.500" borderRadius="6" p="1.5" fontSize="0.9rem" display="flex">
                <BsGlobe2 />
              </Box>
              <Text fontWeight="700" fontSize="0.85rem" color="gray.700">Selector de continente</Text>
            </Box>
            <Text fontSize="0.72rem" color="gray.500" lineHeight="1.4">
              Filtra el mapa y la tabla por continente. Solo se muestran los países que
              produjeron eventos en el período seleccionado.
            </Text>
          </Card>
          <Card p="3" borderRadius="10" shadow="sm" border="1px solid" borderColor="gray.100">
            <Box display="flex" alignItems="center" gap="2" mb="2">
              <Box bg="purple.50" color="purple.500" borderRadius="6" p="1.5" fontSize="0.9rem" display="flex">
                <FaMapMarkedAlt />
              </Box>
              <Text fontWeight="700" fontSize="0.85rem" color="gray.700">Mapa del continente</Text>
            </Box>
            <Text fontSize="0.72rem" color="gray.500" lineHeight="1.4">
              Visualiza los países del continente con intensidad de color según la cantidad de eventos.
              Al pasar el cursor se ve el detalle del país.
            </Text>
          </Card>
          <Card p="3" borderRadius="10" shadow="sm" border="1px solid" borderColor="gray.100">
            <Box display="flex" alignItems="center" gap="2" mb="2">
              <Box bg="purple.50" color="purple.500" borderRadius="6" p="1.5" fontSize="0.9rem" display="flex">
                <MdOutlineTableChart />
              </Box>
              <Text fontWeight="700" fontSize="0.85rem" color="gray.700">Tabla de países</Text>
            </Box>
            <Text fontSize="0.72rem" color="gray.500" lineHeight="1.4">
              Lista los países del continente seleccionado con sus estadísticas de eventos totales,
              ordenados de mayor a menor.
            </Text>
          </Card>
          <Card p="3" borderRadius="10" shadow="sm" border="1px solid" borderColor="gray.100">
            <Box display="flex" alignItems="center" gap="2" mb="2">
              <Box bg="purple.50" color="purple.500" borderRadius="6" p="1.5" fontSize="0.9rem" display="flex">
                <FaGlobe />
              </Box>
              <Text fontWeight="700" fontSize="0.85rem" color="gray.700">País seleccionado</Text>
            </Box>
            <Text fontSize="0.72rem" color="gray.500" lineHeight="1.4">
              Al hacer clic en un país de la tabla o el mapa, el panel superior se actualiza
              con sus estadísticas detalladas.
            </Text>
          </Card>
        </Grid>
      </Section>

    </Box>
  );
};
