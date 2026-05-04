import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { SCHOOLS, OperationType } from '../constants';
import { handleFirestoreError } from '../utils/error-handler';
import { Truck, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function NutritionForm() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    schoolName: '',
    menu: '',
    portions: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const path = 'nutritionDistributions';
      await addDoc(collection(db, path), {
        schoolId: formData.schoolName.toLowerCase().replace(/\s+/g, '-'),
        schoolName: formData.schoolName,
        menu: formData.menu,
        portions: Number(formData.portions),
        timestamp: serverTimestamp(),
        userId: user.uid
      });
      setSuccess(true);
      setFormData({ schoolName: '', menu: '', portions: '' });
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'nutritionDistributions');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-[#141414] p-6 shadow-[4px_4px_0px_#141414]">
      <div className="flex items-center gap-2 mb-6">
        <Truck size={24} className="text-[#141414]" />
        <h2 className="text-xl font-bold uppercase tracking-tight italic font-serif">Input Distribusi</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs uppercase font-mono font-bold text-gray-500 mb-1">Sekolah</label>
          <select
            required
            value={formData.schoolName}
            onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
            className="w-full border border-gray-300 p-2 font-sans focus:outline-none focus:border-[#141414] bg-white transition-colors"
          >
            <option value="">Pilih Sekolah...</option>
            {SCHOOLS.map((school) => (
              <option key={school} value={school}>{school}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs uppercase font-mono font-bold text-gray-500 mb-1">Menu Makanan</label>
          <input
            type="text"
            required
            placeholder="Contoh: Nasi, Ayam Goreng, Sayur Lodeh"
            value={formData.menu}
            onChange={(e) => setFormData({ ...formData, menu: e.target.value })}
            className="w-full border border-gray-300 p-2 font-sans focus:outline-none focus:border-[#141414] transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs uppercase font-mono font-bold text-gray-500 mb-1">Jumlah Porsi</label>
          <input
            type="number"
            required
            placeholder="0"
            value={formData.portions}
            onChange={(e) => setFormData({ ...formData, portions: e.target.value })}
            className="w-full border border-gray-300 p-2 font-sans focus:outline-none focus:border-[#141414] transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#141414] text-white py-3 px-4 hover:bg-gray-800 disabled:opacity-50 transition-all uppercase font-mono font-bold tracking-widest"
        >
          {loading ? 'Mengirim...' : 'Simpan Data'}
        </button>
      </form>

      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 flex items-center gap-2 text-green-600 bg-green-50 p-3 border border-green-200"
          >
            <CheckCircle2 size={20} />
            <span className="text-sm font-mono font-bold uppercase">Data berhasil disimpan!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
