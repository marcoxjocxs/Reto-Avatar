import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'

export function TarjetaEsqueleto() {
  return (
    <Card variant="outlined" aria-hidden="true">
      <Skeleton variant="rectangular" height={160} animation="wave" />
      <CardContent>
        <Stack spacing={1}>
          <Skeleton variant="text" width="40%" animation="wave" />
          <Skeleton variant="text" width="70%" height={32} animation="wave" />
          <Stack direction="row" spacing={1}>
            <Skeleton variant="rounded" width={60} height={24} animation="wave" />
            <Skeleton variant="rounded" width={60} height={24} animation="wave" />
          </Stack>
          <Skeleton variant="text" width="50%" animation="wave" />
        </Stack>
      </CardContent>
    </Card>
  )
}
