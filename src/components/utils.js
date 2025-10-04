export function computeSchedule(procList, algo, quantumVal=2){
  const procs = JSON.parse(JSON.stringify(procList)).map(p=>({...p}));
  const result = [];
  if(algo==='FCFS'){
    procs.sort((a,b)=>a.arrival-b.arrival||a.id.localeCompare(b.id));
    let t=0;
    for(const p of procs){ if(t<p.arrival) t=p.arrival; result.push({id:p.id,start:t,end:t+p.burst}); t+=p.burst; }
  } else if(algo==='SJF'){
    const ready=[]; let t=0; const finished=new Set();
    while(finished.size<procs.length){
      for(const p of procs){ if(p.arrival<=t && !finished.has(p.id) && !ready.find(x=>x.id===p.id)) ready.push(p); }
      if(!ready.length){ t+=1; continue; }
      ready.sort((a,b)=>a.burst-b.burst||a.arrival-b.arrival);
      const cur=ready.shift(); result.push({id:cur.id,start:t,end:t+cur.burst}); t+=cur.burst; finished.add(cur.id);
    }
  } else if(algo==='PR'){
    const ready=[]; let t=0; const finished=new Set();
    while(finished.size<procs.length){
      for(const p of procs){ if(p.arrival<=t && !finished.has(p.id) && !ready.find(x=>x.id===p.id)) ready.push(p); }
      if(!ready.length){ t+=1; continue; }
      ready.sort((a,b)=>a.priority-b.priority||a.arrival-b.arrival);
      const cur=ready.shift(); result.push({id:cur.id,start:t,end:t+cur.burst}); t+=cur.burst; finished.add(cur.id);
    }
  } else if(algo==='RR'){
    const byArrival=procs.sort((a,b)=>a.arrival-b.arrival||a.id.localeCompare(b.id));
    const remaining={}; byArrival.forEach(p=>remaining[p.id]=p.burst);
    const ready=[]; let t=0; let idx=0;
    while(Object.keys(remaining).length){
      while(idx<byArrival.length && byArrival[idx].arrival<=t){ ready.push(byArrival[idx]); idx++; }
      if(!ready.length){ t+=1; continue; }
      const cur=ready.shift(); const exec=Math.min(quantumVal, remaining[cur.id]);
      result.push({id:cur.id,start:t,end:t+exec}); remaining[cur.id]-=exec; t+=exec;
      while(idx<byArrival.length && byArrival[idx].arrival<=t){ ready.push(byArrival[idx]); idx++; }
      if(remaining[cur.id]>0) ready.push(cur); else delete remaining[cur.id];
    }
  }
  return result;
}
