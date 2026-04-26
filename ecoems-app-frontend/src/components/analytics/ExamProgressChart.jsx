'use client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const dataMock = [
  { fecha: '01/03', score: 75 },
  { fecha: '08/03', score: 82 },
  { fecha: '15/03', score: 80 },
  { fecha: '22/03', score: 95 },
  { fecha: '29/03', score: 88 },
];

export default function ExamProgressChart() {
  return (
    // Reemplazamos el style inline por clases de Tailwind
    <div className="w-full bg-[#FFF9E4] p-6 rounded-xl border border-yellow-100">
      <h3 className="text-xl font-bold mb-6 text-[#472E18] flex items-center gap-2">
        <p>Tu Progreso Académico</p>
      </h3>
      
      <div className="w-full overflow-x-auto">
        <div className="w-full min-w-150 h-60 p-1.5">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dataMock} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5DDC5" />
            
            <XAxis 
              dataKey="fecha" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#472E18', fontSize: 15, fontWeight: 700  }} 
              dy={10}
            />
            
            <YAxis 
              domain={[0, 100]} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#472E18', fontSize: 12 , fontWeight: 600 }} 
            />
            
            <Tooltip 
              contentStyle={{ 
                borderRadius: '12px', 
                border: 'none', 
                backgroundColor: '#FFF', 
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' 
              }}
              itemStyle={{ color: '#472E18', fontWeight: 'bold' }}
              labelStyle={{ color: '#8B735B', marginBottom: '4px' }}
            />
            
            <Line 
              type="monotone" 
              dataKey="score" 
              stroke="#472E18" 
              strokeWidth={4} 
              dot={{ r: 6, fill: '#472E18', strokeWidth: 2, stroke: '#FFF' }} 
              activeDot={{ r: 8, strokeWidth: 0 }} 
              animationDuration={1500}
            />
          </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}