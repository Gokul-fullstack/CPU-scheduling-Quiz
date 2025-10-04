import React from 'react'

export default function GanttChart({ schedule }){
  if(!schedule || !schedule.length) return <div className="text-sm text-slate-300">Gantt chart will appear here</div>
  const start = schedule[0].start
  const end = schedule[schedule.length-1].end
  const total = Math.max(1, end - start)
  return (
    <div>
      <div className="h-12 relative bg-black/20 rounded overflow-hidden">
        <div className="absolute inset-0 flex items-center">
          {schedule.map((s,i)=>{
            const w = ((s.end - s.start)/total)*100
            return (
              <div key={i} className="h-10 flex flex-col items-center justify-center border-l border-white/10 text-xs" style={{width:`${w}%`}}>
                <div>{s.id}</div>
                <div className="text-[10px] text-slate-300">{s.start}-{s.end}</div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="text-xs text-slate-300 mt-2">Timeline: {start} — {end}</div>
    </div>
  )
}
