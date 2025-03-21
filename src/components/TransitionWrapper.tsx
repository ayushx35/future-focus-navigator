
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface TransitionWrapperProps {
  children: ReactNode;
  className?: string;
}

const TransitionWrapper = ({ children, className = '' }: TransitionWrapperProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ 
        duration: 0.4, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      className={`w-full ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default TransitionWrapper;
