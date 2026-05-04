/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useAuth } from './context/AuthContext';
import Login from './components/Login';
import Navigation from './components/Navigation';
import NutritionForm from './components/NutritionForm';
import QualityForm from './components/QualityForm';
import RecordsList from './components/RecordsList';
import { motion } from 'motion/react';

function Dashboard() {
  return (
    <div className="min-h-screen bg-[#E4E3E0] pt-24 pb-12 px-6 font-sans">
      <Navigation />
      
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 border-b-2 border-[#141414] pb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase font-serif text-[#141414]">
              Monitoring Gizi
            </h1>
            <p className="text-sm font-mono uppercase tracking-widest text-gray-500 mt-2">
              Sistem Pemantauan Produksi & Distribusi Sindang
            </p>
          </div>
          <div className="bg-[#141414] text-white px-4 py-2 font-mono text-sm uppercase tracking-widest">
            {new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-4 space-y-8"
          >
            <NutritionForm />
            <QualityForm />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[2px] bg-[#141414]"></div>
              <h2 className="text-2xl font-bold uppercase tracking-tight italic font-serif">Aktivitas Terbaru</h2>
            </div>
            <RecordsList />
            
            <div className="mt-8 p-6 bg-gray-900 text-white border-l-4 border-gray-400 font-mono text-xs space-y-2">
              <div className="flex justify-between border-b border-gray-800 pb-2">
                <span className="opacity-50 uppercase">Versi Sistem</span>
                <span>v2.1.0-alpha</span>
              </div>
              <div className="flex justify-between border-b border-gray-800 pb-2">
                <span className="opacity-50 uppercase">Region</span>
                <span>ASIA-SE1</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-50 uppercase">Status Audit</span>
                <span className="text-green-400">AKTIF</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#E4E3E0] flex items-center justify-center font-mono uppercase tracking-widest animate-pulse">
        Memuat Sistem...
      </div>
    );
  }

  return user ? <Dashboard /> : <Login />;
}
