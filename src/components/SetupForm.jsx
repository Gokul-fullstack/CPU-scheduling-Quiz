import React, { useState } from 'react'

export default function SetupForm({ onStart }){
  const [count, setCount] = useState(5)
  const [rows, setRows] = useState(() => Array.from({length:5}).map((_,i)=>({id:`P${i+1}`, arrival: i===0?0:i*2, burst:1+((i+1)%4), priority: i%3+1})))
  const [algo, setAlgo] = useState('FCFS')
  const [quantum, setQuantum] = useState(2)

  function update(i, key, value){
    const copy = [...rows]
    copy[i] = {...copy[i], [key]: key==='id'? value : Number(value)}
    setRows(copy)
  }

  function start(){
    const trimmed = rows.slice(0, count).map(r=>({id:r.id, arrival:Number(r.arrival), burst:Number(r.burst), priority:Number(r.priority)}))
    onStart(trimmed, algo, Number(quantum))
  }

  return (
    <div className="p-4 bg-white/5 rounded">
      <h2 className="font-semibold mb-2">Setup Processes</h2>
      <div className="flex items-center gap-3 mb-3">
        <label className="text-sm">Processes</label>
        <input type="number" min={2} max={12} value={count} onChange={e=>setCount(Number(e.target.value))} className="w-20 bg-transparent border rounded px-2 py-1 text-sm" />
        <label className="text-sm ml-4">Algorithm</label>
        <select value={algo} onChange={e=>setAlgo(e.target.value)} className="bg-transparent border rounded px-2 py-1 text-sm ml-2">
          <option value="FCFS">FCFS</option>
          <option value="SJF">SJF</option>
          <option value="PR">Priority</option>
          <option value="RR">Round Robin</option>
        </select>
        {algo==='RR' && <div className="ml-2"><label className="text-sm">Quantum</label><input type="number" min={1} value={quantum} onChange={e=>setQuantum(Number(e.target.value))} className="w-20 bg-transparent border rounded px-2 py-1 text-sm ml-2" /></div>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {Array.from({length:count}).map((_,i)=>(
          <div key={i} className="p-2 bg-black/20 rounded">
            <div className="flex items-center gap-2 mb-1">
              <input value={rows[i]?.id || `P${i+1}`} onChange={e=>update(i,'id',e.target.value)} className="w-20 bg-transparent border rounded px-2 py-1 text-sm" />
              <div className="text-xs text-slate-300">Arrival</div>
              <input value={rows[i]?.arrival} onChange={e=>update(i,'arrival',e.target.value)} className="w-20 bg-transparent border rounded px-2 py-1 text-sm" />
              <div className="text-xs text-slate-300">Burst</div>
              <input value={rows[i]?.burst} onChange={e=>update(i,'burst',e.target.value)} className="w-20 bg-transparent border rounded px-2 py-1 text-sm" />
              <div className="text-xs text-slate-300">Prio</div>
              <input value={rows[i]?.priority} onChange={e=>update(i,'priority',e.target.value)} className="w-16 bg-transparent border rounded px-2 py-1 text-sm" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <button onClick={start} className="px-3 py-1 bg-emerald-500 rounded">Start Quiz</button>
      </div>
    </div>
  )
}
