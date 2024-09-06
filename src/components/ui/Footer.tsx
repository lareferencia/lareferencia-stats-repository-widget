import { Box, Card, Image, Text } from "@chakra-ui/react";
import footerLogo from "../../assets/logo-la-referencia.png";


export const Footer = () => {
  return (
    <Card px="4" shadow="sm" borderRadius="12" >
        <Box display='flex' alignItems='center' gap='2' py='4'>
            <Box>
                <Text as='span' fontSize='1rem'>
                    Servicio provisto por
                </Text>
            </Box>
            <Box> 
                <Image src={footerLogo} alt="" w='60%'/>
            </Box>
        </Box>
    </Card>
  )
}
