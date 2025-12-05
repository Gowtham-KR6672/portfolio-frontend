import React from 'react';

const Footer = () => {
    return (
        <footer style={{ padding: '20px', textAlign: 'center', background: 'var(--glass-bg)', borderTop: '1px solid var(--glass-border)', marginTop: '50px' }}>
            <p style={{ color: '#aaa' }}>&copy; {new Date().getFullYear()} Gowtham K R. All rights reserved.</p>
            <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
                
            </div>
        </footer>
    );
};

export default Footer;
