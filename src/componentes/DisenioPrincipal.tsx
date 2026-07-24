import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import MenuIcon from '@mui/icons-material/Menu'
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
import { BotonModoColor } from './BotonModoColor'
import { BarraProgresoGlobal } from './BarraProgresoGlobal'
import { PiePagina } from './PiePagina'

const ANCHO_BARRA_LATERAL = 240

const elementosMenu = [
  { etiqueta: 'Pokédex', ruta: '/pokedex', icono: <CatchingPokemonIcon /> },
  { etiqueta: 'Comparador', ruta: '/comparador', icono: <CompareArrowsIcon /> },
]

function ContenidoBarraLateral({ alNavegar }: { alNavegar?: () => void }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Toolbar sx={{ gap: 1 }}>
        <Avatar sx={{ bgcolor: 'primary.main' }}>
          <CatchingPokemonIcon />
        </Avatar>
        <Typography variant="h6" noWrap fontWeight={700}>
          Pokédex
        </Typography>
      </Toolbar>
      <List component="nav" aria-label="Navegación principal" sx={{ px: 1 }}>
        {elementosMenu.map((elemento) => (
          <ListItemButton
            key={elemento.ruta}
            component={NavLink}
            to={elemento.ruta}
            onClick={alNavegar}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              '&.active': {
                backgroundColor: 'action.selected',
                fontWeight: 700,
              },
            }}
          >
            <ListItemIcon>{elemento.icono}</ListItemIcon>
            <ListItemText primary={elemento.etiqueta} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  )
}

export function DisenioPrincipal() {
  const tema = useTheme()
  const esMovil = useMediaQuery(tema.breakpoints.down('md'))
  const [menuAbierto, setMenuAbierto] = useState(false)

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <BarraProgresoGlobal />
      {esMovil ? (
        <>
          <AppBar position="fixed" color="default" elevation={1}>
            <Toolbar sx={{ gap: 1 }}>
              <IconButton
                edge="start"
                aria-label="Abrir menú de navegación"
                onClick={() => setMenuAbierto(true)}
              >
                <MenuIcon />
              </IconButton>
              <CatchingPokemonIcon color="primary" />
              <Typography variant="h6" sx={{ flexGrow: 1 }} noWrap>
                Pokédex
              </Typography>
              <BotonModoColor />
            </Toolbar>
          </AppBar>
          <Drawer
            variant="temporary"
            open={menuAbierto}
            onClose={() => setMenuAbierto(false)}
            ModalProps={{ keepMounted: true }}
            sx={{ '& .MuiDrawer-paper': { width: ANCHO_BARRA_LATERAL } }}
          >
            <ContenidoBarraLateral alNavegar={() => setMenuAbierto(false)} />
          </Drawer>
        </>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: ANCHO_BARRA_LATERAL,
            flexShrink: 0,
            '& .MuiDrawer-paper': { width: ANCHO_BARRA_LATERAL, boxSizing: 'border-box', border: 'none' },
          }}
        >
          <ContenidoBarraLateral />
        </Drawer>
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          width: { md: `calc(100% - ${ANCHO_BARRA_LATERAL}px)` },
          mt: esMovil ? 8 : 0,
        }}
      >
        <Box sx={{ flexGrow: 1, p: { xs: 2, sm: 3 } }}>
          <Outlet />
        </Box>
        <PiePagina />
      </Box>
    </Box>
  )
}
