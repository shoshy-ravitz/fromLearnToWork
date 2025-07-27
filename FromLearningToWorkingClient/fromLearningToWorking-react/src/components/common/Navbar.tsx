import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
import { StoreType } from '../../store/store';

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
    requiresAuth?: boolean;
}

const Navbar: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const location = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    
    // Get auth state from Redux store
    const { token, user } = useSelector((state: StoreType) => state.auth);
    const isAuthenticated = !!token;

    const navItems: NavItem[] = [
        {
            id: 'home',
            label: 'Home',
            icon: <HomeIcon />,
            path: '/home',
            category: 'single',
            color: '#4A90E2',
            requiresAuth: false
        },
        {
            id: 'auth',
            label: 'Authentication',
            icon: <SecurityIcon />,
            category: 'auth',
            color: '#FF6B6B',
            requiresAuth: false,
            children: [
                { id: 'login', label: 'Sign In', icon: <LoginIcon />, path: '/login', category: 'auth', requiresAuth: false },
                { id: 'register', label: 'Sign Up', icon: <RegisterIcon />, path: '/register', category: 'auth', requiresAuth: false }
            ]
        },
        {
            id: 'profile',
            label: 'Profile',
            icon: <AccountIcon />,
            category: 'profile',
            color: '#50C878',
            requiresAuth: true,
            children: [
                { id: 'update', label: 'Update Profile', icon: <EditIcon />, path: '/update', category: 'profile', requiresAuth: true },
                { id: 'logout', label: 'Sign Out', icon: <LogoutIcon />, path: '/logout', category: 'profile', requiresAuth: true }
            ]
        },
        {
            id: 'resume',
            label: 'Resume Tools',
            icon: <AssignmentIcon />,
            category: 'resume',
            color: '#FFB84D',
            requiresAuth: true,
            children: [
                { id: 'upload', label: 'Upload Resume', icon: <UploadIcon />, path: '/upload', category: 'resume', requiresAuth: true },
                { id: 'download', label: 'Download Resume', icon: <DownloadIcon />, path: '/download', category: 'resume', requiresAuth: true },
                { id: 'updateResume', label: 'Update Resume', icon: <EditIcon />, path: '/updateResume', category: 'resume', requiresAuth: true }
            ]
        },
        {
            id: 'interview',
            label: 'Interviews',
            icon: <InterviewIcon />,
            category: 'interview',
            color: '#9B59B6',
            requiresAuth: true,
            children: [
                { id: 'startInterview', label: 'Start Interview', icon: <QuestionAnswer />, path: '/interview', category: 'interview', requiresAuth: true },
                { id: 'historyInterview', label: 'Interview History', icon: <HistoryIcon />, path: '/histoyInterview', category: 'interview', requiresAuth: true }
            ]
        }
    ];

    // Filter nav items based on authentication status
    const getFilteredNavItems = () => {
        if (!isAuthenticated) {
            // Show only non-auth required items for non-authenticated users
            return navItems.filter(item => {
                if (!item.requiresAuth) {
                    // For items with children, filter children too
                    if (item.children) {
                        return {
                            ...item,
                            children: item.children.filter(child => !child.requiresAuth)
                        };
                    }
                    return item;
                }
                return false;
            });
        } else {
            // Show all items except login/register for authenticated users
            return navItems.filter(item => {
                if (item.id === 'auth') {
                    return false; // Hide entire auth section for authenticated users
                }
                return true;
            });
        }
    };

    const filteredNavItems = getFilteredNavItems();

    // Auto-expand categories on hover when sidebar is collapsed
    useEffect(() => {
        if (!open && hoveredItem && !isMobile) {
            const hoveredNavItem = filteredNavItems.find(item => item.id === hoveredItem);
            if (hoveredNavItem && hoveredNavItem.children) {
                setExpandedCategory(hoveredItem);
            }
        }
    }, [hoveredItem, open, filteredNavItems, isMobile]);

    // Auto-collapse when not hovering
    useEffect(() => {
        if (!open && !hoveredItem) {
            setExpandedCategory(null);
        }
    }, [hoveredItem, open]);

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    const handleMouseEnter = () => {
        if (!isMobile) {
            setOpen(true);
        }
    };

        const handleMouseLeave = () => {
        if (!isMobile) {
            setOpen(false);
            setExpandedCategory(null);
            setHoveredItem(null);
        }
    };

    const handleCategoryToggle = (categoryId: string) => {
        if (!open) {
            setOpen(true);
        }
        
        // If same category is clicked, close it. Otherwise, open the new one
        setExpandedCategory(prev => prev === categoryId ? null : categoryId);
    };

    const handleNavigation = (path: string) => {
        navigate(path);
        // Close any expanded categories after navigation
        setExpandedCategory(null);
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
            <ListItem 
                disablePadding 
                sx={{ mb: 1 }}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
            >
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
                        backgroundColor: 'transparent',
                        border: '1px solid transparent',
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.02)',
                            transform: 'scale(1.02)',
                            boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)'
                        },
                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                >
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            justifyContent: 'center',
                            color: item.color || '#666'
                        }}
                    >
                        {item.icon}
                    </ListItemIcon>
                </ListItemButton>
            </ListItem>
        );
    };

    const ExpandedNavItem = ({ item }: { item: NavItem }) => {
        const isExpanded = expandedCategory === item.id;
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
                            backgroundColor: 'transparent',
                            border: '1px solid transparent',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.02)',
                                transform: 'translateX(2px)',
                                boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)'
                            },
                            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                            py: 1.5
                        }}
                    >
                        <ListItemIcon sx={{ 
                            color: item.color || '#666',
                            minWidth: 40
                        }}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText
                            primary={item.label}
                            sx={{
                                '& .MuiListItemText-primary': {
                                    fontSize: '0.95rem',
                                    fontWeight: 500,
                                    color: '#2c3e50'
                                }
                            }}
                        />
                        {isExpanded ? 
                            <ExpandLess sx={{ color: '#95a5a6' }} /> : 
                            <ExpandMore sx={{ color: '#95a5a6' }} />
                        }
                    </ListItemButton>

                    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding sx={{ mt: 1 }}>
                            {item.children?.map((child, index) => (
                                <Fade 
                                    in={isExpanded} 
                                    timeout={200 + (index * 50)}
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
                                            backgroundColor: 'transparent',
                                            border: '1px solid transparent',
                                            '&:hover': {
                                                backgroundColor: 'rgba(0, 0, 0, 0.02)',
                                                transform: 'translateX(4px)',
                                                boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)'
                                            },
                                            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                                        }}
                                    >
                                        <ListItemIcon sx={{ 
                                            color: '#7f8c8d',
                                            minWidth: 32
                                        }}>
                                            {child.icon}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={child.label}
                                            sx={{
                                                '& .MuiListItemText-primary': {
                                                    fontSize: '0.875rem',
                                                    fontWeight: 400,
                                                    color: '#34495e'
                                                }
                                            }}
                                        />
                                        {isActive(child.path!) && (
                                            <Box
                                                sx={{
                                                    width: 3,
                                                    height: 3,
                                                    borderRadius: '50%',
                                                    bgcolor: '#95a5a6',
                                                    ml: 1,
                                                    opacity: 0.6
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
                            backgroundColor: 'transparent',
                            border: '1px solid transparent',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.02)',
                                transform: 'translateX(2px)',
                                boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)'
                            },
                            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                            py: 1.5
                        }}
                    >
                        <ListItemIcon sx={{ 
                            color: item.color || '#666',
                            minWidth: 40
                        }}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText
                            primary={item.label}
                            sx={{
                                '& .MuiListItemText-primary': {
                                    fontSize: '0.95rem',
                                    fontWeight: 500,
                                    color: '#2c3e50'
                                }
                            }}
                        />
                        {isItemActive && (
                            <Box
                                sx={{
                                    width: 4,
                                    height: 4,
                                    borderRadius: '50%',
                                    bgcolor: '#95a5a6',
                                    ml: 1,
                                    opacity: 0.6
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
                                    {isAuthenticated ? `Welcome, ${user?.name || 'User'}` : 'Interview Platform'}
                                </Typography>
                            </Box>
                        </Box>
                        {isMobile && (
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
                                <CloseIcon />
                            </IconButton>
                        )}
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
                    {filteredNavItems.map((item) => (
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
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                sx={{
                    width: open ? DRAWER_WIDTH : COLLAPSED_WIDTH,
                    flexShrink: 0,
                    position: 'fixed',
                    zIndex: 1200,
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