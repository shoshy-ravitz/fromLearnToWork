import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    IconButton,
    Collapse,
    Avatar,
    Chip,
    useTheme,
    useMediaQuery,
    Paper,
    Fade
} from '@mui/material';
import {
    Home as HomeIcon,
    Login as LoginIcon,
    PersonAdd as RegisterIcon,
    Logout as LogoutIcon,
    Person as PersonIcon,
    Upload as UploadIcon,
    Download as DownloadIcon,
    Edit as EditIcon,
    QuestionAnswer as InterviewIcon,
    History as HistoryIcon,
    Work as WorkIcon,
    Menu as MenuIcon,
    ChevronLeft as ChevronLeftIcon,
    ExpandLess,
    ExpandMore,
    Security as SecurityIcon,
    Assignment as AssignmentIcon,
    AccountCircle as AccountIcon,
    Close as CloseIcon,
    QuestionAnswer
} from '@mui/icons-material';

const DRAWER_WIDTH = 280;
const COLLAPSED_WIDTH = 72;

interface NavItem {
    id: string;
    label: string;
    icon: React.ReactNode;
    path?: string;
    children?: NavItem[];
    category: string;
    color?: string;
}

const Navbar: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
    const location = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const navItems: NavItem[] = [
        {
            id: 'home',
            label: 'Home',
            icon: <HomeIcon />,
            path: '/home',
            category: 'single',
            color: '#4A90E2'
        },
        {
            id: 'auth',
            label: 'Authentication',
            icon: <SecurityIcon />,
            category: 'auth',
            color: '#FF6B6B',
            children: [
                { id: 'login', label: 'Sign In', icon: <LoginIcon />, path: '/login', category: 'auth' },
                { id: 'register', label: 'Sign Up', icon: <RegisterIcon />, path: '/register', category: 'auth' },
                { id: 'logout', label: 'Sign Out', icon: <LogoutIcon />, path: '/logout', category: 'auth' }
            ]
        },
        {
            id: 'profile',
            label: 'Profile',
            icon: <AccountIcon />,
            category: 'profile',
            color: '#50C878',
            children: [
                { id: 'update', label: 'Update Profile', icon: <EditIcon />, path: '/update', category: 'profile' }
            ]
        },
        {
            id: 'resume',
            label: 'Resume Tools',
            icon: <AssignmentIcon />,
            category: 'resume',
            color: '#FFB84D',
            children: [
                { id: 'upload', label: 'Upload Resume', icon: <UploadIcon />, path: '/upload', category: 'resume' },
                { id: 'download', label: 'Download Resume', icon: <DownloadIcon />, path: '/download', category: 'resume' },
                { id: 'updateResume', label: 'Update Resume', icon: <EditIcon />, path: '/updateResume', category: 'resume' }
            ]
        },
        {
            id: 'interview',
            label: 'Interviews',
            icon: <InterviewIcon />,
            category: 'interview',
            color: '#9B59B6',
            children: [
                { id: 'startInterview', label: 'Start Interview', icon: <QuestionAnswer />, path: '/interview', category: 'interview' },
                { id: 'historyInterview', label: 'Interview History', icon: <HistoryIcon />, path: '/histoyInterview', category: 'interview' }
            ]
        }
    ];

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    const handleCategoryToggle = (categoryId: string) => {
        if (!open) {
            setOpen(true);
        }
        
        setExpandedCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    const handleNavigation = (path: string) => {
        navigate(path);
        if (isMobile) {
            setOpen(false);
        }
    };

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    const isAnyChildActive = (children: NavItem[] = []) => {
        return children.some(child => child.path && isActive(child.path));
    };

    const CollapsedNavItem = ({ item }: { item: NavItem }) => {
        const hasActiveChild = item.children ? isAnyChildActive(item.children) : false;
        const isItemActive = item.path ? isActive(item.path) : false;
        const isActiveState = isItemActive || hasActiveChild;

        return (
            <ListItem disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                    onClick={() => {
                        if (item.path) {
                            handleNavigation(item.path);
                        } else if (item.children) {
                            handleCategoryToggle(item.id);
                        }
                    }}
                    sx={{
                        minHeight: 56,
                        justifyContent: 'center',
                        borderRadius: 3,
                        mx: 1,
                        backgroundColor: isActiveState ? 'rgba(255, 204, 0, 0.08)' : 'transparent',
                        border: isActiveState ? '2px solid rgba(255, 204, 0, 0.2)' : '2px solid transparent',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 204, 0, 0.06)',
                            transform: 'scale(1.05)',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                        },
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                >
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            justifyContent: 'center',
                            color: isActiveState ? 'rgb(255, 204, 0)' : item.color || '#666'
                        }}
                    >
                        {item.icon}
                    </ListItemIcon>
                </ListItemButton>
            </ListItem>
        );
    };

    const ExpandedNavItem = ({ item }: { item: NavItem }) => {
        const isExpanded = expandedCategories.includes(item.id);
        const hasActiveChild = item.children ? isAnyChildActive(item.children) : false;
        const isItemActive = item.path ? isActive(item.path) : false;
        const isActiveState = isItemActive || hasActiveChild;

        if (item.children) {
            return (
                <ListItem disablePadding sx={{ mb: 1, flexDirection: 'column', alignItems: 'stretch' }}>
                    <ListItemButton
                        onClick={() => handleCategoryToggle(item.id)}
                        sx={{
                            borderRadius: 3,
                            mx: 1,
                            backgroundColor: isActiveState ? 'rgba(255, 204, 0, 0.08)' : 'transparent',
                            border: isActiveState ? '2px solid rgba(255, 204, 0, 0.2)' : '2px solid transparent',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 204, 0, 0.06)',
                                transform: 'translateX(4px)',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                            },
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            py: 1.5
                        }}
                    >
                        <ListItemIcon sx={{ 
                            color: isActiveState ? 'rgb(255, 204, 0)' : item.color || '#666',
                            minWidth: 40
                        }}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText
                            primary={item.label}
                            sx={{
                                '& .MuiListItemText-primary': {
                                    fontSize: '0.95rem',
                                    fontWeight: isActiveState ? 600 : 500,
                                    color: isActiveState ? 'rgb(255, 204, 0)' : '#2c3e50'
                                }
                            }}
                        />
                        {isExpanded ? 
                            <ExpandLess sx={{ color: isActiveState ? 'rgb(255, 204, 0)' : '#95a5a6' }} /> : 
                            <ExpandMore sx={{ color: isActiveState ? 'rgb(255, 204, 0)' : '#95a5a6' }} />
                        }
                    </ListItemButton>

                    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding sx={{ mt: 1 }}>
                            {item.children?.map((child, index) => (
                                <Fade 
                                    in={isExpanded} 
                                    timeout={300 + (index * 100)}
                                    key={child.id}
                                >
                                    <ListItemButton
                                        onClick={() => handleNavigation(child.path!)}
                                        sx={{
                                            pl: 5,
                                            pr: 2,
                                            py: 1,
                                            borderRadius: 3,
                                            mx: 1,
                                            mb: 0.5,
                                            backgroundColor: isActive(child.path!) ? 'rgba(255, 204, 0, 0.12)' : 'transparent',
                                            border: isActive(child.path!) ? '1px solid rgba(255, 204, 0, 0.3)' : '1px solid transparent',
                                            '&:hover': {
                                                backgroundColor: 'rgba(255, 204, 0, 0.08)',
                                                transform: 'translateX(8px)',
                                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
                                            },
                                            transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
                                        }}
                                    >
                                        <ListItemIcon sx={{ 
                                            color: isActive(child.path!) ? 'rgb(255, 204, 0)' : '#7f8c8d',
                                            minWidth: 32
                                        }}>
                                            {child.icon}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={child.label}
                                            sx={{
                                                '& .MuiListItemText-primary': {
                                                    fontSize: '0.875rem',
                                                    fontWeight: isActive(child.path!) ? 600 : 400,
                                                    color: isActive(child.path!) ? 'rgb(255, 204, 0)' : '#34495e'
                                                }
                                            }}
                                        />
                                        {isActive(child.path!) && (
                                            <Chip
                                                size="small"
                                                label="Active"
                                                sx={{
                                                    bgcolor: 'rgb(255, 204, 0)',
                                                    color: '#1a1a1a',
                                                    fontSize: '0.7rem',
                                                    height: 20,
                                                    fontWeight: 600,
                                                    boxShadow: '0 2px 4px rgba(255, 204, 0, 0.3)'
                                                }}
                                            />
                                        )}
                                    </ListItemButton>
                                </Fade>
                            ))}
                        </List>
                    </Collapse>
                </ListItem>
            );
        } else {
            // Single item without children
            return (
                <ListItem disablePadding sx={{ mb: 1 }}>
                    <ListItemButton
                        onClick={() => handleNavigation(item.path!)}
                        sx={{
                            borderRadius: 3,
                            mx: 1,
                            backgroundColor: isItemActive ? 'rgba(255, 204, 0, 0.08)' : 'transparent',
                            border: isItemActive ? '2px solid rgba(255, 204, 0, 0.2)' : '2px solid transparent',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 204, 0, 0.06)',
                                transform: 'translateX(4px)',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                            },
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            py: 1.5
                        }}
                    >
                        <ListItemIcon sx={{ 
                            color: isItemActive ? 'rgb(255, 204, 0)' : item.color || '#666',
                            minWidth: 40
                        }}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText
                            primary={item.label}
                            sx={{
                                '& .MuiListItemText-primary': {
                                    fontSize: '0.95rem',
                                    fontWeight: isItemActive ? 600 : 500,
                                    color: isItemActive ? 'rgb(255, 204, 0)' : '#2c3e50'
                                }
                            }}
                        />
                        {isItemActive && (
                            <Chip
                                size="small"
                                label="Active"
                                sx={{
                                    bgcolor: 'rgb(255, 204, 0)',
                                    color: '#1a1a1a',
                                    fontSize: '0.7rem',
                                    height: 20,
                                    fontWeight: 600,
                                    boxShadow: '0 2px 4px rgba(255, 204, 0, 0.3)'
                                }}
                            />
                        )}
                    </ListItemButton>
                </ListItem>
            );
        }
    };

    const drawerContent = (
        <Box sx={{ 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            background: 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)'
        }}>
            {/* Header */}
            <Paper
                elevation={0}
                sx={{
                    p: open ? 3 : 2,
                    borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: open ? 'space-between' : 'center',
                    minHeight: 80,
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                    borderRadius: 0
                }}
            >
                {open ? (
                    <>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{
                                bgcolor: 'rgb(255, 204, 0)',
                                color: '#1a1a1a',
                                width: 48,
                                height: 48,
                                boxShadow: '0 4px 12px rgba(255, 204, 0, 0.3)'
                            }}>
                                <WorkIcon sx={{ fontSize: 24 }} />
                            </Avatar>
                            <Box>
                                <Typography variant="h6" sx={{
                                    color: '#2c3e50',
                                    fontWeight: 700,
                                    fontSize: '1.2rem',
                                    lineHeight: 1.2
                                }}>
                                    Learning to Work
                                </Typography>
                                <Typography variant="caption" sx={{
                                    color: 'rgb(255, 204, 0)',
                                    fontSize: '0.8rem',
                                    fontWeight: 500
                                }}>
                                    Interview Platform
                                </Typography>
                            </Box>
                        </Box>
                        <IconButton
                            onClick={handleDrawerToggle}
                            sx={{
                                color: '#95a5a6',
                                bgcolor: 'rgba(0, 0, 0, 0.04)',
                                '&:hover': {
                                    color: 'rgb(255, 204, 0)',
                                    bgcolor: 'rgba(255, 204, 0, 0.1)',
                                    transform: 'rotate(180deg)'
                                },
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {isMobile ? <CloseIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </>
                ) : (
                    <IconButton
                        onClick={handleDrawerToggle}
                        sx={{
                            p: 1.5,
                            '&:hover': {
                                transform: 'scale(1.1)',
                                bgcolor: 'rgba(255, 204, 0, 0.1)'
                            },
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <Avatar sx={{
                            bgcolor: 'rgb(255, 204, 0)',
                            color: '#1a1a1a',
                            width: 40,
                            height: 40,
                            boxShadow: '0 4px 12px rgba(255, 204, 0, 0.3)'
                        }}>
                            <WorkIcon sx={{ fontSize: 20 }} />
                        </Avatar>
                    </IconButton>
                )}
            </Paper>

            {/* Navigation Items */}
            <Box sx={{ 
                flex: 1, 
                py: 3,
                px: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
                '&::-webkit-scrollbar': {
                    width: 6,
                },
                '&::-webkit-scrollbar-track': {
                    background: 'rgba(0, 0, 0, 0.05)',
                    borderRadius: 3,
                },
                '&::-webkit-scrollbar-thumb': {
                    background: 'rgba(255, 204, 0, 0.3)',
                    borderRadius: 3,
                    '&:hover': {
                        background: 'rgba(255, 204, 0, 0.5)',
                    }
                }
            }}>
                <List sx={{ p: 0 }}>
                    {navItems.map((item) => (
                        <React.Fragment key={item.id}>
                            {open ? (
                                <ExpandedNavItem item={item} />
                            ) : (
                                <CollapsedNavItem item={item} />
                            )}
                        </React.Fragment>
                    ))}
                </List>
            </Box>

            {/* Footer */}
            {open && (
                <Paper
                    elevation={0}
                    sx={{
                        p: 2,
                        borderTop: '1px solid rgba(0, 0, 0, 0.06)',
                        background: 'rgba(255, 204, 0, 0.02)'
                    }}
                >
                    <Typography variant="caption" sx={{ 
                        color: '#7f8c8d',
                        display: 'block',
                        textAlign: 'center',
                        fontSize: '0.75rem'
                    }}>
                        © 2024 Learning to Work
                    </Typography>
                </Paper>
            )}
        </Box>
    );

    return (
        <>
            {/* Mobile Menu Button */}
            {isMobile && !open && (
                <IconButton
                    onClick={handleDrawerToggle}
                    sx={{
                        position: 'fixed',
                        top: 20,
                        left: 20,
                        zIndex: 1300,
                        bgcolor: 'white',
                        color: 'rgb(255, 204, 0)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                        '&:hover': {
                            bgcolor: 'rgba(255, 204, 0, 0.1)',
                            transform: 'scale(1.1)'
                        },
                        transition: 'all 0.3s ease'
                    }}
                >
                    <MenuIcon />
                </IconButton>
            )}

            {/* Sidebar Drawer */}
            <Drawer
                variant={isMobile ? 'temporary' : 'permanent'}
                open={isMobile ? open : true}
                onClose={handleDrawerToggle}
                sx={{
                    width: open ? DRAWER_WIDTH : COLLAPSED_WIDTH,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: open ? DRAWER_WIDTH : COLLAPSED_WIDTH,
                        boxSizing: 'border-box',
                        borderRight: '1px solid rgba(0, 0, 0, 0.08)',
                        boxShadow: open ? '4px 0 20px rgba(0, 0, 0, 0.08)' : '2px 0 10px rgba(0, 0, 0, 0.05)',
                        transition: theme.transitions.create(['width', 'box-shadow'], {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                        overflowX: 'hidden',
                        background: '#ffffff'
                    }
                }}
                ModalProps={{
                    keepMounted: true
                }}
            >
                {drawerContent}
            </Drawer>
        </>
    );
};

export default Navbar;