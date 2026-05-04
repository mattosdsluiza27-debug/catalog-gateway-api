import React, { useState, useEffect } from 'react';
import { Routes, Route, NavLink, Link, useLocation } from 'react-router-dom';
import { Home as HomeIcon, Film, Tv, User, Sun, Moon } from 'lucide-react';

import HomePage from './pages/home';
import MovieDetails from './MovieDetails';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
    }
  }, [isDarkMode]);

  const handleHomeClick = () => {
    if (location.pathname === '/') {
      window.location.reload();
    }
  };

  return (
    <div className="flex h-screen bg-background text-text-main overflow-hidden transition-colors duration-500">
      
      <aside className="w-20 bg-surface border-r border-white/5 flex flex-col items-center py-8 justify-between z-50">
        
        <div className="flex flex-col items-center gap-10">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/30 cursor-pointer hover:scale-110 hover:border-primary transition-all shadow-lg shadow-primary/10">
            <User className="text-primary" size={24} />
          </div>
          
          <nav className="flex flex-col gap-6">
            <NavLink to="/" onClick={handleHomeClick}className={({ isActive }) => `p-4 rounded-2xl transition-all cursor-pointer ${isActive ? 'bg-primary text-background shadow-lg shadow-primary/30' : 'text-secondary hover:text-primary hover:bg-white/5'}`}
            >
              <HomeIcon size={24} />
            </NavLink>

            <div className="p-4 text-secondary/20 cursor-not-allowed"><Film size={24} /></div>
            <div className="p-4 text-secondary/20 cursor-not-allowed"><Tv size={24} /></div>
          </nav>
        </div>

        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-4 rounded-2xl text-secondary hover:text-primary hover:bg-white/5 transition-all cursor-pointer flex items-center justify-center"
        >
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/detalhes/:id" element={<MovieDetails />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;