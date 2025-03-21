
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase, Home, BarChart } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/assessment', label: 'Assessment', icon: BarChart },
    { path: '/results', label: 'Discover', icon: Briefcase },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="mx-auto max-w-7xl">
        <div className="glass-panel rounded-full px-4 py-2 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-primary text-white p-2 rounded-full"
            >
              <Briefcase size={16} />
            </motion.div>
            <motion.span
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="font-medium text-lg"
            >
              CareerPath
            </motion.span>
          </Link>
          
          <nav>
            <ul className="flex space-x-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`relative px-4 py-2 rounded-full flex items-center gap-2 transition-all ${
                        isActive 
                          ? 'text-primary font-medium' 
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="nav-pill"
                          className="absolute inset-0 bg-primary/10 rounded-full"
                          transition={{ duration: 0.3, type: "spring" }}
                        />
                      )}
                      <span className="relative z-10">
                        <item.icon size={16} className="inline-block mr-1" />
                        {item.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
