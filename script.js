const skills = [
  {name:'SQL', hint:'Query & database performance', intro:'Production SQL topics I use for performance tuning, reconciliation, and scalable reporting.', topics:['Partitioning','Local indexes','Global indexes','Foreign key indexing','Concurrent indexes','Execution plans','Join order','Materialized views','Window functions','Schema evolution','Auto-increment limits','Query profiling']},
  {name:'Spark', hint:'Distributed processing', intro:'Spark concepts I use to reason about slow jobs, large joins, and unstable workloads.', topics:['Data skew','Salting','AQE','Broadcast joins','Shuffle tuning','Partition sizing','Caching vs persist','Memory pressure','Executor imbalance','Schema enforcement','Small files','Spark UI debugging']},
  {name:'AWS', hint:'Cloud data operations', intro:'AWS services and practices I use for cloud data pipelines, monitoring, and platform reliability.', topics:['Glue jobs','Glue bookmarks','S3','IAM','CloudWatch','Step Functions','Lambda','Redshift','RDS','Athena','DMS','Job scheduling','Failure recovery','Audit logging']},
  {name:'Data Engineering', hint:'Pipelines & trust', intro:'The production practices behind reliable data platforms.', topics:['CDC','ETL / ELT','Data validation','Data reconciliation','Data quality','Lineage','Impact analysis','Data contracts','Late-arriving data','As-of reporting','Production support','Cutover readiness']},
  {name:'Data Modeling', hint:'Analytics design', intro:'Modeling patterns I use to make data stable, explainable, and usable.', topics:['Dimensional modeling','Star schema','Snapshot tables','SCD Type 2','Logical modeling','Physical modeling','Medallion layers','Effective dates','Current vs reported truth','Surrogate keys','Fact tables','KPI definitions']}
];

const experiences = [
  {company:'Toyota', role:'AI Data Engineer', date:'Nov 2025 – Present', focus:['CDC','Replication','Data Modeling','Validation','Modernization','Production Support'], tools:['Oracle','SQL Server','PostgreSQL','Fivetran','Qlik','Python','Erwin','Git']},
  {company:'Learning.com', role:'AI Data Solutions Developer', date:'Jul 2024 – Nov 2025', focus:['Reporting','ELT','Data Quality','Analytics','Dashboard QA','Stakeholder Support'], tools:['AWS Glue','Redshift','Salesforce','Tableau','Lambda','CloudWatch','SQL Server','Excel']},
  {company:'CVS Health', role:'Data Analyst', date:'Sep 2022 – May 2024', focus:['Governed AI','Data Security','Data Skew','Analytics Platform','Compliance','Performance'], tools:['Databricks','Unity Catalog','Delta Lake','Spark','MLflow','SQL','Python']},
  {company:'OpenText', role:'Associate Data Engineer', date:'Jul 2021 – Jul 2022', focus:['KPI Design','Analytics Products','Requirements','BI Delivery','Backlog','Stakeholders'], tools:['SQL','Tableau','Excel','Jira','Agile','Data Modeling']},
  {company:'Super Local Ecommerce', role:'Software Engineer', date:'May 2018 – Jun 2021', focus:['Reporting','Data Analysis','Data Quality','Trend Analysis','SQL Development'], tools:['SQL','Python','Excel','Reporting','Validation']}
];

function diagram(type){
  if(type==='cdc') return `<div class="diagram"><div class="flow3"><div class="node green"><span class="icon">🟢</span>Normal CDC<br><small>Oracle → Logs → Fivetran → Postgres</small></div><div class="node red"><span class="icon">⚠️</span>Refresh<br><small>Logs reset, old checkpoint</small></div><div class="node blue"><span class="icon">✅</span>Recovered<br><small>Checkpoint reset + alerts</small></div></div><div class="diagram-caption"><span>Healthy connector ≠ healthy data</span><span>0 records alert</span><span>Source-target checks</span></div></div>`;
  if(type==='skew') return `<div class="diagram"><div class="flow3"><div class="node red"><span class="icon">🔥</span>Hot Key<br><small>One partition overloaded</small></div><div class="node purple"><span class="icon">🧂</span>Salting<br><small>Split skewed keys</small></div><div class="node green"><span class="icon">⚖️</span>Balanced<br><small>Executors share work</small></div></div><div class="diagram-caption"><span>Data skew</span><span>AQE</span><span>Partition tuning</span></div></div>`;
  if(type==='pk') return `<div class="diagram"><div class="flow5"><div class="node blue"><span class="icon">🔢</span>INT</div><div class="node red"><span class="icon">⛔</span>2.1B Limit</div><div class="node red"><span class="icon">❌</span>Insert Fail</div><div class="node green"><span class="icon">⬆️</span>BIGINT</div><div class="node green"><span class="icon">🚀</span>Scale</div></div><div class="diagram-caption"><span>Schema capacity</span><span>Sequence health</span><span>Future growth</span></div></div>`;
  if(type==='qlik') return `<div class="diagram"><div class="flow5"><div class="node red"><span class="icon">🧱</span>Qlik</div><div class="node blue"><span class="icon">🧭</span>Mapping</div><div class="node purple"><span class="icon">🤖</span>AI Rules</div><div class="node green"><span class="icon">🔄</span>Fivetran</div><div class="node green"><span class="icon">✅</span>Validated</div></div><div class="diagram-caption"><span>CDC migration</span><span>JSON automation</span><span>Cutover readiness</span></div></div>`;
}

const cases = [
  {id:'cdc', title:'CDC Failure After Environment Refresh', visual:'diagram', type:'cdc', image:null, tags:['Replication','CDC','Monitoring'], mini:{Problem:'New records missing', Root:'LSN reset', Fix:'Checkpoint reset', Outcome:'Replication restored'}, detail:'A staging refresh reset transaction logs. Connector status looked healthy, but target PostgreSQL stopped receiving changes. The fix was CDC validation, checkpoint reset, connector reinitialization, and no-write alerts.'},
  {id:'drift', title:'Historical Reporting Drift', visual:'image', image:'assets/reporting-drift.png', tags:['Snapshots','Late Data','Tableau'], mini:{Problem:'Reports changed', Root:'Late renewals', Fix:'Snapshot layer', Outcome:'Trusted reporting'}, detail:'Late renewals changed prior months after reports were published. The solution separated operational truth from reported truth using freeze dates, as-of logic, and monthly snapshot tables.'},
  {id:'skew', title:'Spark Data Skew & Salting', visual:'diagram', type:'skew', image:null, tags:['Spark','Salting','AQE'], mini:{Problem:'Executor bottleneck', Root:'Hot keys', Fix:'Salting + AQE', Outcome:'Balanced workload'}, detail:'A few organizational keys dominated the data distribution. Instead of adding more compute, skewed keys were salted, partitions tuned, and AQE enabled to balance Spark execution.'},
  {id:'glue', title:'AWS Glue Timeout Optimization', visual:'image', image:'assets/glue-timeout.png', tags:['Glue','Indexes','Large Joins'], mini:{Problem:'Timeouts', Root:'1TB joins + skew', Fix:'Indexes + salting', Outcome:'Stable jobs'}, detail:'A Glue job timed out while joining large tables. Root causes included full scans, missing FK indexes, local index limitations, data skew, and unnecessary columns. Fixes improved SQL access and Spark execution.'},
  {id:'ai', title:'Compliance-First AI Analytics', visual:'image', image:'assets/governed-ai.png', tags:['Unity Catalog','Genie','Governance'], mini:{Problem:'Sensitive HR data', Root:'Uncontrolled AI', Fix:'Governed layer', Outcome:'Audit-ready AI'}, detail:'Built a governed AI analytics pattern where users ask natural-language questions, but access is constrained through curated data, Unity Catalog policies, approved functions, audit logs, and review paths.'},
  {id:'pk', title:'Auto-Increment ID Exhaustion', visual:'diagram', type:'pk', image:null, tags:['Schema Design','Scale','Database'], mini:{Problem:'Insert failures', Root:'INT limit', Fix:'BIGINT migration', Outcome:'Future-proof'}, detail:'A high-volume table approached signed INT auto-increment limits. The remediation was BIGINT migration, dependency review, and schema scalability checks.'},
  {id:'qlik', title:'Qlik to Fivetran Migration Automation', visual:'diagram', type:'qlik', image:null, tags:['Migration','Automation','Validation'], mini:{Problem:'Manual setup', Root:'Many table actions', Fix:'AI JSON rules', Outcome:'Faster onboarding'}, detail:'Large-scale replication migration required source-target mappings, access setup, channel/location configuration, rule creation, full refresh, CDC enablement, and validation.'}
];

function renderSkills(){
  const menu = document.getElementById('skillMenu');
  const detail = document.getElementById('skillDetail');
  menu.innerHTML = skills.map((s,i)=>`<button class="skill-btn ${i===0?'active':''}" data-skill="${i}">${s.name}<small>${s.hint}</small></button>`).join('');
  function show(i){
    document.querySelectorAll('.skill-btn').forEach(b=>b.classList.remove('active'));
    document.querySelector(`[data-skill="${i}"]`).classList.add('active');
    const s=skills[i];
    detail.innerHTML = `<h3>${s.name}</h3><p>${s.intro}</p><div class="topic-grid">${s.topics.map(t=>`<div class="topic">${t}</div>`).join('')}</div>`;
  }
  menu.addEventListener('click', e=>{const b=e.target.closest('.skill-btn'); if(b) show(Number(b.dataset.skill));});
  show(0);
}

function renderExperience(){
  document.getElementById('experienceTimeline').innerHTML = experiences.map(e=>`
    <article class="exp-card">
      <div>
        <div class="exp-company">${e.company}</div>
        <div class="exp-role">${e.role}</div>
        <div class="exp-date">${e.date}</div>
      </div>
      <div class="exp-body">
        <div class="focus-row">${e.focus.map(f=>`<span class="focus-pill">${f}</span>`).join('')}</div>
        <div class="tool-row">${e.tools.map(t=>`<span class="tool-pill">${t}</span>`).join('')}</div>
      </div>
    </article>`).join('');
}

function caseVisual(c){
  if(c.visual==='image') return `<img class="case-img" src="${c.image}" alt="${c.title} diagram">`;
  return diagram(c.type);
}

function renderCases(){
  document.getElementById('caseGrid').innerHTML = cases.map(c=>`
    <article class="case-card" data-case="${c.id}">
      <div class="case-visual">${caseVisual(c)}</div>
      <div class="case-content">
        <h3>${c.title}</h3>
        <div class="case-mini">${Object.entries(c.mini).map(([k,v])=>`<div><strong>${k}</strong>${v}</div>`).join('')}</div>
      </div>
    </article>`).join('');
}

function setupModal(){
  const modal=document.getElementById('caseModal');
  const content=document.getElementById('modalContent');
  document.addEventListener('click', e=>{
    const card=e.target.closest('.case-card');
    if(card){
      const c=cases.find(x=>x.id===card.dataset.case);
      content.innerHTML = `<div class="eyebrow">Case Study</div><h2>${c.title}</h2><p class="hero-sub">${c.detail}</p>${c.visual==='image'?`<img class="modal-hero-img" src="${c.image}" alt="${c.title} architecture diagram">`:diagram(c.type)}<div class="modal-grid">${Object.entries(c.mini).map(([k,v])=>`<div><strong>${k}</strong><span>${v}</span></div>`).join('')}</div>`;
      modal.setAttribute('aria-hidden','false');
      document.body.style.overflow='hidden';
    }
    if(e.target.matches('[data-close]')){modal.setAttribute('aria-hidden','true');document.body.style.overflow='';}
  });
  window.addEventListener('keydown',e=>{if(e.key==='Escape'){modal.setAttribute('aria-hidden','true');document.body.style.overflow='';}});
}

renderSkills();
renderExperience();
renderCases();
setupModal();
