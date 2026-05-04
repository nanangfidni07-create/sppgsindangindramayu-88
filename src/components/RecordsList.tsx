import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { OperationType } from '../constants';
import { handleFirestoreError } from '../utils/error-handler';
import { History, Truck, ClipboardCheck } from 'lucide-react';

export default function RecordsList() {
  const [distributions, setDistributions] = useState<any[]>([]);
  const [qualities, setQualities] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'distribusi' | 'kualitas'>('distribusi');

  useEffect(() => {
    const qDist = query(collection(db, 'nutritionDistributions'), orderBy('timestamp', 'desc'), limit(10));
    const unsubDist = onSnapshot(qDist, (snapshot) => {
      setDistributions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'nutritionDistributions'));

    const qQual = query(collection(db, 'foodQualities'), orderBy('timestamp', 'desc'), limit(10));
    const unsubQual = onSnapshot(qQual, (snapshot) => {
      setQualities(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'foodQualities'));

    return () => {
      unsubDist();
      unsubQual();
    };
  }, []);

  return (
    <div className="bg-white border border-[#141414] shadow-[4px_4px_0px_#141414] overflow-hidden">
      <div className="flex border-bottom border-[#141414]">
        <button
          onClick={() => setActiveTab('distribusi')}
          className={`flex-1 py-4 px-6 font-mono font-bold uppercase tracking-widest text-sm transition-colors ${
            activeTab === 'distribusi' ? 'bg-[#141414] text-white' : 'bg-gray-100 text-[#141414] hover:bg-gray-200'
          }`}
        >
          Distribusi
        </button>
        <button
          onClick={() => setActiveTab('kualitas')}
          className={`flex-1 py-4 px-6 font-mono font-bold uppercase tracking-widest text-sm transition-colors ${
            activeTab === 'kualitas' ? 'bg-[#141414] text-white' : 'bg-gray-100 text-[#141414] hover:bg-gray-200'
          }`}
        >
          Kualitas
        </button>
      </div>

      <div className="p-4">
        {activeTab === 'distribusi' ? (
          <div className="space-y-4">
            {distributions.length === 0 && <p className="text-center py-8 text-gray-400 font-mono italic">Belum ada data distribusi.</p>}
            {distributions.map((record) => (
              <div key={record.id} className="border border-gray-200 p-3 hover:border-[#141414] transition-colors group">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-[#141414] group-hover:italic transition-all">{record.schoolName}</h3>
                  <span className="text-[10px] font-mono text-gray-400 uppercase">
                    {record.timestamp?.toDate().toLocaleString('id-ID', { hour: '2-digit', minute: '2-digit' }) || 'Pending'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600 font-mono">
                  <Truck size={14} />
                  <span>{record.menu}</span>
                  <span className="ml-auto font-bold bg-gray-100 px-2 py-0.5 rounded">{record.portions} Porsi</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {qualities.length === 0 && <p className="text-center py-8 text-gray-400 font-mono italic">Belum ada data kualitas.</p>}
            {qualities.map((record) => (
              <div key={record.id} className="border border-gray-200 p-3 hover:border-[#141414] transition-colors group">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-[#141414] group-hover:italic transition-all">{record.schoolName}</h3>
                  <span className="text-[10px] font-mono text-gray-400 uppercase">
                    {record.timestamp?.toDate().toLocaleString('id-ID', { hour: '2-digit', minute: '2-digit' }) || 'Pending'}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  <div className="text-[10px] uppercase font-mono text-gray-500">Rasa: {record.taste}/5</div>
                  <div className="text-[10px] uppercase font-mono text-gray-500">Suhu: {record.temperature}/5</div>
                  <div className="text-[10px] uppercase font-mono text-gray-500">Bersih: {record.cleanliness}/5</div>
                </div>
                {record.notes && (
                  <p className="text-xs text-gray-600 italic font-serif">"{record.notes}"</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
