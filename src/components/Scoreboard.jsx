import React from 'react'

export default function Scoreboard({ results }){
  if(!results) return (
    <div className="p-4 bg-white/5 rounded">
      <h3 className="font-semibold">Scoreboard</h3>
      <div className="text-sm text-slate-300">No results yet</div>
    </div>
  )
  const accuracy = results.total ? Math.round((results.score / results.total) * 100) : 0
  return (
    <div className="p-4 bg-white/5 rounded">
      <h3 className="font-semibold">Scoreboard</h3>
      <div className="mt-2 text-2xl font-bold">{results.score} / {results.total}</div>
      <div className="text-sm text-slate-300 mt-1">Accuracy: {accuracy}%</div>
      <div className="text-xs mt-1">Algorithm: {results.algorithm}</div>
    </div>
  )
}
