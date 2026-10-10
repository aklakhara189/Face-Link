import React, { useContext, useState } from 'react';
import withAuth from '../utils/withAuth';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { Button, IconButton, TextField, Paper } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import VideocamIcon from '@mui/icons-material/Videocam';
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from '../contexts/AuthContext';

/**
 * HomeComponent Component
 * 
 * Logic & Workflow:
 * - Serves as the dashboard after successful authentication.
 * - Manages meeting room generation and joining workflow.
 * - Stores joined room identifiers to user call history via AuthContext.
 */
function HomeComponent() {
    const navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState('');
    const { addToUserHistory } = useContext(AuthContext);

    /**
     * Joins conference room and logs meeting code into user history
     */
    const handleJoinVideoCall = async () => {
        if (!meetingCode.trim()) return;
        await addToUserHistory(meetingCode);
        navigate(`/${meetingCode}`);
    };

    /**
     * Clears authentication token and navigates back to login screen
     */
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/auth');
    };

    return (
        <div style={{ minHeight: '100vh', background: '#070a13', color: '#f8fafc' }}>
            {/* Top Navigation Bar */}
            <div className="navBar">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }} onClick={() => navigate('/')}>
                    <div className="brandLogo">
                        <div className="logoIcon" style={{ width: 36, height: 36 }}>
                            <VideocamIcon style={{ color: '#ffffff', fontSize: 20 }} />
                        </div>
                        <h2>Face-Link</h2>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div
                        onClick={() => navigate('/history')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            cursor: 'pointer',
                            color: '#94a3b8',
                            padding: '0.4rem 0.8rem',
                            borderRadius: '8px',
                            background: 'rgba(255, 255, 255, 0.05)',
                        }}
                    >
                        <RestoreIcon fontSize="small" style={{ color: '#a5b4fc' }} />
                        <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>History</span>
                    </div>

                    <Button
                        variant="outlined"
                        size="small"
                        onClick={handleLogout}
                        startIcon={<LogoutIcon />}
                        sx={{
                            color: '#f43f5e',
                            borderColor: 'rgba(244, 63, 94, 0.4)',
                            '&:hover': { borderColor: '#f43f5e', background: 'rgba(244, 63, 94, 0.1)' }
                        }}
                    >
                        Logout
                    </Button>
                </div>
            </div>

            {/* Main Meeting Code Entry Panel */}
            <div className="meetContainer">
                <div className="leftPanel">
                    <div>
                        <h2>Seamless Real-Time Conferences With Face-Link</h2>
                        <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.05rem', lineHeight: 1.6 }}>
                            Enter a room code below to instantly connect with peers or teammates over high-definition WebRTC video.
                        </p>

                        <Paper
                            elevation={0}
                            sx={{
                                display: 'flex',
                                gap: '12px',
                                background: 'rgba(255, 255, 255, 0.03)',
                                p: 2,
                                borderRadius: 3,
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                maxWidth: 500,
                            }}
                        >
                            <TextField
                                fullWidth
                                size="small"
                                placeholder="Enter Meeting Room Code"
                                value={meetingCode}
                                onChange={(e) => setMeetingCode(e.target.value)}
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        color: '#fff',
                                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                                        '&:hover fieldset': { borderColor: '#6366f1' },
                                    }
                                }}
                            />
                            <Button
                                onClick={handleJoinVideoCall}
                                variant="contained"
                                sx={{
                                    px: 3,
                                    fontWeight: 700,
                                    background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                                    boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)'
                                }}
                            >
                                Join
                            </Button>
                        </Paper>
                    </div>
                </div>

                <div className="rightPanel">
                    <img srcSet="/logo3.png" alt="Face-Link Conference Illustration" />
                </div>
            </div>
        </div>
    );
}

export default withAuth(HomeComponent);