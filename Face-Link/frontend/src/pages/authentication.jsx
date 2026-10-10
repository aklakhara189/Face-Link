import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VideocamIcon from '@mui/icons-material/Videocam';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';
import { Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

/**
 * Custom Dark Theme for Material UI Authentication Components
 * Matches the Face-Link modern cosmic color palette
 */
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#6366f1',
        },
        secondary: {
            main: '#a855f7',
        },
        background: {
            default: '#070a13',
            paper: '#0f172a',
        },
        text: {
            primary: '#f8fafc',
            secondary: '#94a3b8',
        },
    },
    typography: {
        fontFamily: "'Plus Jakarta Sans', sans-serif",
    },
});

/**
 * Authentication Component
 * 
 * Logic & Architecture:
 * - Manages user registration (Sign Up) and authentication (Sign In) states.
 * - Form state 0 = Sign In, Form state 1 = Sign Up.
 * - Dispatches payload to AuthContext which interacts with Express.js REST API endpoints.
 * - Encrypted password transmission handled on backend via bcrypt hash verification.
 */
export default function Authentication() {
    const navigate = useNavigate();

    // Local form input states
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [error, setError] = React.useState('');
    const [message, setMessage] = React.useState('');

    // Toggle between login (0) and register (1)
    const [formState, setFormState] = React.useState(0);
    const [open, setOpen] = React.useState(false);

    // Consume global auth handlers from AuthContext
    const { handleRegister, handleLogin } = React.useContext(AuthContext);

    /**
     * Submit handler for authentication workflow
     * Validates credentials and handles auth tokens
     */
    const handleAuth = async () => {
        try {
            setError('');
            if (formState === 0) {
                // User Login Action
                await handleLogin(username, password);
            } else if (formState === 1) {
                // User Registration Action
                const result = await handleRegister(name, username, password);
                setUsername('');
                setName('');
                setPassword('');
                setMessage(result || 'Registration successful! Please login.');
                setOpen(true);
                setFormState(0);
            }
        } catch (err) {
            console.error('Authentication Error:', err);
            const errMsg = err?.response?.data?.message || 'Authentication failed. Please verify credentials.';
            setError(errMsg);
        }
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <Grid container component="main" sx={{ height: '100vh', background: '#070a13' }}>
                <CssBaseline />

                {/* Left Visual Panel - Dynamic Tech Gradient Showcase */}
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        background: 'linear-gradient(135deg, #090d1a 0%, #171033 50%, #070a13 100%)',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        p: 6,
                        borderRight: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                >
                    <Box
                        sx={{
                            maxWidth: 500,
                            textAlign: 'left',
                            background: 'rgba(255, 255, 255, 0.03)',
                            p: 5,
                            borderRadius: 4,
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(20px)',
                            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'inline-flex',
                                p: 1.5,
                                borderRadius: 3,
                                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                                mb: 3,
                            }}
                        >
                            <VideocamIcon sx={{ fontSize: 36, color: '#fff' }} />
                        </Box>
                        <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, color: '#fff', letterSpacing: '-1px' }}>
                            Face-Link
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#94a3b8', lineHeight: 1.7, fontSize: '1.1rem' }}>
                            Next-generation WebRTC audio & video conferencing. Secure rooms, low-latency communication, and seamless instant collaboration.
                        </Typography>
                        <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                            <Typography variant="caption" sx={{ color: '#64748b' }}>
                                Developed by Arun Lakhara • Full-Stack WebRTC Platform
                            </Typography>
                        </Box>
                    </Box>
                </Grid>

                {/* Right Form Panel */}
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    component={Paper}
                    elevation={0}
                    square
                    sx={{
                        background: '#0b0f19',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        p: { xs: 3, md: 6 },
                    }}
                >
                    <Box
                        sx={{
                            my: 4,
                            mx: { xs: 1, md: 4 },
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar
                            sx={{
                                m: 1,
                                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                                width: 48,
                                height: 48,
                            }}
                        >
                            <LockOutlinedIcon />
                        </Avatar>

                        <Typography component="h1" variant="h5" sx={{ fontWeight: 700, mt: 1, mb: 3, color: '#fff' }}>
                            {formState === 0 ? 'Welcome Back to Face-Link' : 'Create Face-Link Account'}
                        </Typography>

                        {/* Mode Switcher Tabs */}
                        <Box
                            sx={{
                                display: 'flex',
                                background: 'rgba(255, 255, 255, 0.05)',
                                p: 0.5,
                                borderRadius: 3,
                                mb: 3,
                                width: '100%',
                            }}
                        >
                            <Button
                                fullWidth
                                variant={formState === 0 ? 'contained' : 'text'}
                                onClick={() => setFormState(0)}
                                sx={{
                                    borderRadius: 2.5,
                                    py: 1,
                                    fontWeight: 600,
                                    background: formState === 0 ? 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)' : 'transparent',
                                }}
                            >
                                Sign In
                            </Button>
                            <Button
                                fullWidth
                                variant={formState === 1 ? 'contained' : 'text'}
                                onClick={() => setFormState(1)}
                                sx={{
                                    borderRadius: 2.5,
                                    py: 1,
                                    fontWeight: 600,
                                    background: formState === 1 ? 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)' : 'transparent',
                                }}
                            >
                                Sign Up
                            </Button>
                        </Box>

                        {/* Input Credentials Form */}
                        <Box component="form" noValidate sx={{ width: '100%' }}>
                            {formState === 1 && (
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="fullName"
                                    label="Full Name"
                                    name="name"
                                    value={name}
                                    autoFocus
                                    onChange={(e) => setName(e.target.value)}
                                    sx={{ mb: 2 }}
                                />
                            )}

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                value={username}
                                autoFocus={formState === 0}
                                onChange={(e) => setUsername(e.target.value)}
                                sx={{ mb: 2 }}
                            />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                sx={{ mb: 2 }}
                            />

                            {error && (
                                <Alert severity="error" sx={{ my: 2, borderRadius: 2 }}>
                                    {error}
                                </Alert>
                            )}

                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                onClick={handleAuth}
                                sx={{
                                    mt: 2,
                                    mb: 2,
                                    py: 1.4,
                                    fontWeight: 700,
                                    borderRadius: 3,
                                    background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                                    boxShadow: '0 8px 20px rgba(99, 102, 241, 0.4)',
                                    '&:hover': {
                                        background: 'linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)',
                                    },
                                }}
                            >
                                {formState === 0 ? 'Sign In to Face-Link' : 'Create Free Account'}
                            </Button>

                            <Box sx={{ textAlign: 'center', mt: 2 }}>
                                <Button
                                    variant="text"
                                    size="small"
                                    onClick={() => navigate('/')}
                                    sx={{ color: '#94a3b8' }}
                                >
                                    ← Back to Home
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            {/* Notification Snackbar for registration confirmation */}
            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={() => setOpen(false)}
            >
                <Alert severity="success" sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </ThemeProvider>
    );
}