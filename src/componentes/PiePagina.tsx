import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon'

export function PiePagina() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 6,
        py: 3,
        px: 2,
        borderTop: '1px solid',
        borderColor: 'divider',
        textAlign: 'center',
      }}
    >
      <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
        <CatchingPokemonIcon fontSize="small" sx={{ color: 'text.disabled' }} />
        <Typography variant="body2" color="text.secondary">
          Realizado para el reto de Avatar
        </Typography>
      </Stack>
      <Typography variant="caption" color="text.disabled">
        Creador: Marco Jose Villanueva Torres
      </Typography>
    </Box>
  )
}
