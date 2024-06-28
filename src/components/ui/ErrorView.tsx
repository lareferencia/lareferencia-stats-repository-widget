import { Box } from '@chakra-ui/react'

type Props = {
  errorMessage: string
}

const ErrorView = ( { errorMessage }: Props ) => {
  return (
    <Box fontSize='2rem' fontWeight='bold' height='100vh' display='flex' justifyContent='center' alignItems='center'>
        { errorMessage }
    </Box>
  )
}

export default ErrorView
