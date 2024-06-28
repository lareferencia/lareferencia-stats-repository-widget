import { Box, Button, Card } from "@chakra-ui/react"
import { TFunction } from "i18next"

type DateButtonsProps = {
  t: TFunction
}
export const DateButtons = ({ t }: DateButtonsProps) => {

  const dates = [`1 ${t("year")}` , `3 ${t("years")}`, `5 ${t("years")}`]
  const dateSelected = `1 ${t("year")}`

  return (

    <Box borderRadius='12' >
      <Box display='flex' gap='2' >
      {
        dates.map( date  => (
          <Card key={date} shadow='sm' borderRadius='12' p='1' justifyContent='center' rounded='lg'>
            <Button   size='sm' variant='ghost' fontWeight='bold' colorScheme={dateSelected === date ? 'black' : 'teal'}>
              {date}
            </Button>
          </Card>
        ))
      }
      
      </Box>
    </Box>
  )
}
