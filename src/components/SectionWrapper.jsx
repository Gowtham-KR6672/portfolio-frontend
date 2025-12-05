import React from 'react';
import { motion } from 'framer-motion';

const SectionWrapper = ({ children, id, title }) => {
    return (
        <section id={id} className="container" style={{ paddingTop: '80px', paddingBottom: '80px', minHeight: '80vh' }}>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                {title && (
                    <h2 className="neon-text" style={{ fontSize: '2.5rem', marginBottom: '40px', textAlign: 'center' }}>
                        {title}
                    </h2>
                )}
                {children}
            </motion.div>
        </section>
    );
};

export default SectionWrapper;
