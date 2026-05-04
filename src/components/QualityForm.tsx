import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { SCHOOLS, OperationType } from '../constants';
import { handleFirestoreError } from '../utils/error-handler';
import { ClipboardCheck, CheckCircle2, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function QualityForm() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    schoolName: '',
    taste: 5,
    temperature: 5,
    cleanliness: 5,
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const path = 'foodQualities';
      await addDoc(collection(db, path), {
        schoolId: formData.schoolName.toLowerCase().replace(/\s+/g, '-'),
        schoolName: formData.schoolName,
        taste: formData.taste,
        temperature: formData.temperature,
        cleanliness: formData.cleanliness,
        notes: formData.notes,
        timestamp: serverTimestamp(),
        userId: user.uid
      });
      setSuccess(true);
      setFormData({ schoolName: '', taste: 5, temperature: 5, cleanliness: 5, notes: '' });
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'foodQualities');
    } finally {
      setLoading(false);
    }
  };

  const RatingSelect = ({ label, value, onChange }: { label: string, value: number, onChange: (v: number) => void }) => (
    <div>
      <label className="block text-xs uppercase font-mono font-bold text-gray-500 mb-1">{label}</label>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className={`p-1 transition-colors ${star <= value ? 'text-[#141414]' : 'text-gray-200'}`}
          >
            <Star size={24} fill={star <= value ? 'currentColor' : 'none'} />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white border border-[#141414] p-6 shadow-[4px_4px_0px_#141414]">
      <div className="flex items-center gap-2 mb-6">
        <ClipboardCheck size={24} className="text-[#141414]" />
        <h2 className="text-xl font-bold uppercase tracking-tight italic font-serif">Penilaian Kualitas</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <RatingSelect 
            label="Rasa" 
            value={formData.taste} 
            onChange={(v) => setFormData({ ...formData, taste: v })} 
          />
          <RatingSelect 
            label="Suhu" 
            value={formData.temperature} 
            onChange={(v) => setFormData({ ...formData, temperature: v })} 
          />
          <RatingSelect 
            label="Kebersihan" 
            value={formData.cleanliness} 
            onChange={(v) => setFormData({ ...formData, cleanliness: v })} 
          />
        </div>

        <div>
          <label className="block text-xs uppercase font-mono font-bold text-gray-500 mb-1">Catatan Tambahan</label>
          <textarea
            placeholder="Komentar atau saran..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full border border-gray-300 p-2 font-sans focus:outline-none focus:border-[#141414] transition-colors h-24 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#141414] text-white py-3 px-4 hover:bg-gray-800 disabled:opacity-50 transition-all uppercase font-mono font-bold tracking-widest"
        >
          {loading ? 'Mengirim...' : 'Simpan Penilaian'}
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
            <span className="text-sm font-mono font-bold uppercase">Penilaian berhasil disimpan!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
