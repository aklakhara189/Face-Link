import React from 'react';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import VideocamIcon from '@mui/icons-material/Videocam';
import SecurityIcon from '@mui/icons-material/Security';
import ChatIcon from '@mui/icons-material/Chat';
import HistoryIcon from '@mui/icons-material/History';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

/**
 * LandingPage Component
 * 
 * Logic & Overview:
 * - Serves as the welcoming portal for Face-Link video conferencing application.
 * - Showcases key capabilities: WebRTC peer connections, secure rooms, in-call chat, and history logs.
 * - Provides guest entry routes as well as authenticated registration and login paths.
 */
export default function LandingPage() {
    const router = useNavigate();

    // Features data array explaining the full-stack architecture capabilities
    const features = [
        {
            icon: <VideocamIcon fontSize="large" />,
            title: "HD Video & Audio",
            description: "High-definition, low-latency peer-to-peer conferencing powered by WebRTC and STUN/TURN protocols."
        },
        {
            icon: <ChatIcon fontSize="large" />,
            title: "Real-Time In-Call Chat",
            description: "Instant bi-directional text communication during active calls enabled by Socket.io room messaging."
        },
        {
            icon: <ScreenShareIcon fontSize="large" />,
            title: "Screen Sharing",
            description: "Share presentations, slides, and workflows in real time using browser MediaStreams API."
        },
        {
            icon: <HistoryIcon fontSize="large" />,
            title: "Meeting History",
            description: "Persistent call logs and meeting access codes recorded directly in MongoDB database."
        }
    ];

    return (
        <div className="landingPageContainer">
            {/* Top Navigation Bar with Glassmorphism */}
            <nav>
                <div className="brandLogo" onClick={() => router('/')}>
                    <div className="logoIcon">
                        <VideocamIcon style={{ color: '#ffffff' }} />
                    </div>
                    <h2>Face-Link</h2>
                </div>

                <div className="navlist">
                    <span className="navItem" onClick={() => router('/guest-room')}>
                        Join as Guest
                    </span>
                    <span className="navItem" onClick={() => router('/auth')}>
                        Register
                    </span>
                    <button className="navAuthBtn" onClick={() => router('/auth')}>
                        Sign In
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="heroSection">
                <div className="heroContent">
                    <div className="heroBadge">
                        <span>✨ Real-Time Communication Platform</span>
                    </div>

                    <h1 className="heroTitle">
                        Connect Seamlessly with <span className="gradientText">Face-Link</span>
                    </h1>

                    <p className="heroSubtitle">
                        A full-stack WebRTC video conferencing platform crafted for high-performance virtual collaboration.
                        Host multi-user rooms, share screens, and message in real time.
                    </p>

                    <div className="heroCtaGroup">
                        <Link to="/auth" className="primaryCta">
                            Get Started Free <ArrowForwardIcon fontSize="small" />
                        </Link>
                        <button className="secondaryCta" onClick={() => router('/guest-room')}>
                            Instant Meeting
                        </button>
                    </div>
                </div>

                <div className="heroVisual">
                    <div className="visualCardWrapper">
                        <img src="/mobile.png" alt="Face-Link conference preview" />
                    </div>
                </div>
            </header>

            {/* Feature Showcase Grid Section */}
            <section className="featuresSection">
                <div className="sectionHeader">
                    <h3>Engineered for High Reliability</h3>
                    <p>Powered by modern WebRTC signaling, Node.js microservices, and reactive UI architecture</p>
                </div>

                <div className="featuresGrid">
                    {features.map((feature, idx) => (
                        <div className="featureCard" key={idx}>
                            <div className="featureIconWrapper">
                                {feature.icon}
                            </div>
                            <h4>{feature.title}</h4>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Developer Credit Footer */}
            <footer className="footerContainer">
                <div className="footerLeft">
                    <h5>Face-Link Conferencing</h5>
                    <p>Designed and built for modern distributed virtual communication.</p>
                </div>
                <div className="footerCredit">
                    Developed with ❤️ by <strong>Arun Lakhara</strong> | Full-Stack WebRTC Platform
                </div>
            </footer>
        </div>
    );
}
