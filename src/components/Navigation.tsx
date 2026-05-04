import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User as UserIcon } from 'lucide-react';

export default function Navigation() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-[#141414] text-white py-4 px-6 fixed top-0 w-full z-50 flex justify-between items-center border-b border-gray-800 shadow-lg">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold tracking-tighter italic font-serif">SPPG SINDANG</h1>
      </div>

      <div className="flex items-center gap-4">
        {user && (
          <div className="hidden md:flex items-center gap-2 px-3 py-1 border border-gray-700 rounded-full bg-gray-900/50">
            {user.photoURL ? (
              <img src={user.photoURL} alt={user.displayName || ''} className="w-6 h-6 rounded-full" />
            ) : (
              <UserIcon size={16} />
            )}
            <span className="text-xs font-mono font-medium truncate max-w-[120px]">
              {user.displayName?.split(' ')[0]}
            </span>
          </div>
        )}
        <button
          onClick={logout}
          className="flex items-center gap-2 text-xs uppercase font-mono font-bold hover:text-gray-400 transition-colors"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </nav>
  );
}
