import React, { useState, useEffect } from 'react'
import { computeSchedule } from './utils'

export default function Quiz({ processes, algorithm, quantum, onFinish }){
  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [log, setLog] = useState([])

  useEffect(()=>{
    if(!processes || !processes.length) return
    const schedule = computeSchedule(processes, algorithm, quantum)
    const qs = []
    // create MCQs: alternate types — who-runs and waiting-time
    for(let i=0;i<schedule.length;i++){
      const slot = schedule[i]
      // who-runs next question
      const ready = processes.filter(p=>p.arrival<=slot.start)
      const options1 = Array.from(new Set([slot.id, ...ready.slice(0,4).map(r=>r.id)])).slice(0,4)
      qs.push({type:'who', prompt:`At time ${slot.start}, which process should run next?`, options: options1, answer: slot.id})
      // waiting time question
      const proc = processes.find(p=>p.id===slot.id)
      const waiting = slot.start - proc.arrival
      const opts2 = Array.from(new Set([String(waiting), String(Math.max(0,waiting-1)), String(waiting+1), String(waiting+2)])).slice(0,4)
      qs.push({type:'wait', prompt:`What is the waiting time of ${slot.id}?`, options: opts2, answer: String(waiting)})
    }
    setQuestions(qs)
  },[processes, algorithm, quantum])

  function answer(opt){
    const q = questions[index]
    const correct = opt===q.answer
    if(correct) setScore(s=>s+1)
    setLog(l=>[...l,{q:q.prompt, opt, correct}])
    const next = index+1
    if(next>=questions.length){
      const schedule = computeSchedule(processes, algorithm, quantum)
      onFinish({schedule, score: score + (correct?1:0), total: questions.length, algorithm})
    } else {
      setIndex(next)
    }
  }

  if(!questions.length) return <div className="p-4 bg-white/5 rounded">Preparing questions...</div>

  const q = questions[index]
  return (
    <div className="p-4 bg-white/5 rounded">
      <h3 className="font-semibold mb-2">Quiz</h3>
      <div className="mb-3">{q.prompt}</div>
      <div className="flex flex-col gap-2">
        {q.options.map((o,i)=>(<button key={i} onClick={()=>answer(o)} className="text-left p-2 bg-slate-700 rounded">{o}</button>))}
      </div>
      <div className="mt-3 text-sm text-slate-300">Score: {score} / {questions.length}</div>
      <div className="mt-2 text-xs">Log:</div>
      <div className="h-32 overflow-auto bg-black/20 p-2 rounded mt-1">
        {log.map((l,i)=>(<div key={i} className={`p-1 ${l.correct?'text-emerald-400':'text-rose-400'}`}>{l.q} — {l.opt} — {l.correct?'OK':'WRONG'}</div>))}
      </div>
    </div>
  )
}
