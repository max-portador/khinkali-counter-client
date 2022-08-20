import * as React from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import TableRowsIcon from '@mui/icons-material/TableRows';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {useRouter} from "next/router";
import AuthDialog from "./AuthDialog";

export const drawerWidth = 240;

const menuItems = [
    {text: 'Главная', href: '/', icon: () => <HomeIcon/>},
    {text: 'Список событий', href: '/events', icon: () => <TableRowsIcon/>},
    {text: 'Добавить', href: '/events/create', icon: () => <AddCircleOutlineIcon/>},
]


export default function Navbar() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const router = useRouter()

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="fixed" open={open}>
                <Toolbar sx={{backgroundColor: '#333'}}>

                    <StyledButton onClick={handleDrawerOpen} open={open}>
                        <MenuIcon/>
                    </StyledButton>
                    <HeaderLabel> KHINKALI COUNTER </HeaderLabel>
                    <AuthDialog/>
                </Toolbar>
            </AppBar>

            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </DrawerHeader>
                <List>
                    {menuItems.map(({text, href, icon}) => (
                        <ListItem key={href}
                                  onClick={() => {
                                      router.push(href)
                                  }}
                                  disablePadding
                        >
                            <ListItemButton>

                                <ListItemIcon>
                                    {icon()}
                                </ListItemIcon>

                                <ListItemText primary={text}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </Box>
    );
}


const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({theme, open}) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const StyledButton = styled((props) => <IconButton
    aria-label="open drawer"
    edge="end" {...props} />)<{ open: boolean, onClick: Function, children: React.ReactElement }>`
  background-color: rgba(1, 1, 1, 0);
  margin-right: 16px;
  display: ${(props) => props.open ? 'none' : 'inherit'};

  &:hover {
    background-color: grey !important;
    color: #fff;
  }

,

`


const HeaderLabel = styled((props) =>
    <Typography variant="h6" noWrap component="div"{...props}/>)<{ children: string }>`
  position: fixed;
  left: 50%;
  transform: translateX(-50%)
`

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}