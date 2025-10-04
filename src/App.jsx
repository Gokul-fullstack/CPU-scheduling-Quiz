import React, { useState } from 'react'
import SetupForm from './components/SetupForm'
import Quiz from './components/Quiz'
import Scoreboard from './components/Scoreboard'
import GanttChart from './components/GanttChart'

export default function App(){
  const [processes, setProcesses] = useState([])
  const [algorithm, setAlgorithm] = useState('FCFS')
  const [quantum, setQuantum] = useState(2)
  const [started, setStarted] = useState(false)
  const [results, setResults] = useState(null)

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">CPU Scheduling Quiz Game</h1>
          <div className="text-sm text-slate-300">Step-by-step MCQ quiz for FCFS / SJF / Priority / RR</div>
        </header>

        {!started ? (
          <SetupForm
            onStart={(procs, algo, q) => { setProcesses(procs); setAlgorithm(algo); setQuantum(q); setStarted(true); }}
          />
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <Quiz processes={processes} algorithm={algorithm} quantum={quantum} onFinish={setResults} />
            </div>
            <aside className="space-y-4">
              <Scoreboard results={results} />
              <div className="p-4 bg-white/5 rounded">
                <h3 className="font-semibold mb-2">Gantt Chart</h3>
                <GanttChart schedule={results ? results.schedule : []} />
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  )
}
