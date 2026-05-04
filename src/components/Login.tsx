import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogIn } from 'lucide-react';
import { motion } from 'motion/react';

export default function Login() {
  const { signInWithGoogle } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E4E3E0] p-6 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white border border-[#141414] p-8 shadow-[8px_8px_0px_#141414]"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tighter text-[#141414] mb-2 uppercase italic font-serif">
            SPPG SINDANG
          </h1>
          <p className="text-sm text-gray-500 uppercase tracking-widest font-mono">
            Monitoring Gizi Sekolah
          </p>
        </div>

        <button
          onClick={signInWithGoogle}
          className="w-full flex items-center justify-center gap-3 bg-[#141414] text-white py-4 px-6 hover:bg-gray-800 transition-colors uppercase font-mono tracking-wider font-bold"
        >
          <LogIn size={20} />
          Login with Google
        </button>

        <p className="mt-6 text-center text-xs text-gray-400 font-mono italic">
          Authorized personnel only. Data collection is audited.
        </p>
      </motion.div>
    </div>
  );
}
