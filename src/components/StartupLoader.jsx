import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Helper for random characters
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
const randomChar = () => characters[Math.floor(Math.random() * characters.length)];

const DecryptingText = ({ text }) => {
    const [display, setDisplay] = useState("");

    useEffect(() => {
        let iteration = 0;
        const interval = setInterval(() => {
            setDisplay(
                text
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return randomChar();
                    })
                    .join("")
            );

            if (iteration >= text.length) {
                clearInterval(interval);
            }

            iteration += 1 / 2; // Speed of decryption
        }, 30);

        return () => clearInterval(interval);
    }, [text]);

    return <span>{display}</span>;
};

const StartupLoader = () => {
    const [messageIndex, setMessageIndex] = useState(0);

    const messages = [
        "INITIATING SERVER",
        "ESTABLISHING CONNECTION",
        "CONNECTING TO DATABASE",
        "SYNCHRONIZING USER DATA",
        "LOADING PORTFOLIO"

    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prevIndex) => {
                if (prevIndex < messages.length - 1) {
                    return prevIndex + 1;
                }
                return prevIndex;
            });
        }, 2500); // Slower to allow decryption effect

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            background: 'var(--bg-color)', // Adaptive background
            color: 'var(--primary-color)',
            fontFamily: 'monospace', // Tech font
            overflow: 'hidden',
            position: 'relative',
            perspective: '1000px' // For 3D effect
        }}>
            {/* Background Grid (Moving) */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: '-50%',
                    left: '-50%',
                    width: '200%',
                    height: '200%',
                    backgroundImage: 'linear-gradient(var(--glass-border) 1px, transparent 1px), linear-gradient(90deg, var(--glass-border) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    transform: 'rotateX(60deg)',
                    zIndex: 0
                }}
                animate={{ translateY: ['0%', '10%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />

            {/* 3D Holographic Rings */}
            <div style={{
                position: 'relative',
                width: '200px',
                height: '200px',
                marginBottom: '60px',
                zIndex: 1,
                transformStyle: 'preserve-3d'
            }}>
                {/* Ring 1 */}
                <motion.div
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        border: '2px solid var(--primary-color)',
                        borderTopColor: 'transparent',
                        borderBottomColor: 'transparent',
                        boxShadow: '0 0 15px var(--primary-color)',
                    }}
                    animate={{ rotateX: 360, rotateY: 180 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />

                {/* Ring 2 */}
                <motion.div
                    style={{
                        position: 'absolute',
                        top: '10%',
                        left: '10%',
                        width: '80%',
                        height: '80%',
                        borderRadius: '50%',
                        border: '1px dashed var(--secondary-color)',
                        boxShadow: '0 0 10px var(--secondary-color)',
                    }}
                    animate={{ rotateY: 360, rotateX: -180 }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                />

                {/* Core */}
                <motion.div
                    style={{
                        position: 'absolute',
                        top: '35%',
                        left: '35%',
                        width: '30%',
                        height: '30%',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, var(--text-color), var(--primary-color))',
                        boxShadow: '0 0 30px var(--primary-color)',
                    }}
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            {/* Decrypting Status Text */}
            <div style={{ height: '30px', zIndex: 1, marginBottom: '20px' }}>
                <h2 style={{
                    fontSize: '1.5rem',
                    letterSpacing: '3px',
                    color: 'var(--text-color)',
                    textShadow: '0 0 10px var(--primary-color)'
                }}>
                    <DecryptingText text={messages[messageIndex]} />
                </h2>
            </div>

            {/* Quantum Progress Bar */}
            <div style={{
                width: '300px',
                height: '2px',
                background: 'var(--glass-border)',
                position: 'relative',
                overflow: 'visible'
            }}>
                <motion.div
                    style={{
                        height: '100%',
                        background: 'var(--primary-color)',
                        boxShadow: '0 0 20px var(--primary-color)',
                        position: 'relative',
                    }}
                    initial={{ width: '0%' }}
                    animate={{ width: `${((messageIndex + 1) / messages.length) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                    {/* Leading Particle Head */}
                    <div style={{
                        position: 'absolute',
                        right: '0',
                        top: '50%',
                        transform: 'translate(50%, -50%)',
                        width: '8px',
                        height: '8px',
                        background: 'var(--text-color)',
                        borderRadius: '50%',
                        boxShadow: '0 0 15px var(--text-color), 0 0 30px var(--primary-color)',
                        zIndex: 2
                    }} />

                    {/* Particle Trail */}
                    <motion.div
                        style={{
                            position: 'absolute',
                            right: '0',
                            top: '50%',
                            width: '60px',
                            height: '4px',
                            background: 'linear-gradient(90deg, transparent, var(--primary-color))',
                            transform: 'translateY(-50%)',
                            filter: 'blur(2px)',
                            opacity: 0.7
                        }}
                    />
                </motion.div>
            </div>
        </div>
    );
};

export default StartupLoader;
