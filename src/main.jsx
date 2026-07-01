import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  Atom,
  Beaker,
  BookOpen,
  BrainCircuit,
  CircuitBoard,
  Copy,
  Database,
  Dna,
  Download,
  ExternalLink,
  FlaskConical,
  Gauge,
  Github,
  Microscope,
  MousePointerClick,
  Network,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  Sparkles,
  TestTube2,
  Waves,
  Zap
} from 'lucide-react';
import './styles.css';

const ATP_SYNTHASE_PDB_ID = '1BMF';
const ATP_SYNTHASE_LABEL = 'Bovine mitochondrial F1-ATPase catalytic sector, PDB 1BMF';

const modules = [
  {
    name: 'F1-ATPase Viewer',
    label: 'Rotary bioenergetics structure',
    text: 'Continuously renders a crystallised F1-ATPase catalytic sector as a moving PyMOL-style molecular background for bioenergetics storytelling.',
    tags: ['PDB 1BMF', 'mitochondria', 'rotary catalysis'],
    icon: Atom,
    url: 'https://www.rcsb.org/structure/1BMF',
    cta: 'Open RCSB 1BMF'
  },
  {
    name: 'Binder Forge',
    label: 'Protein-binder design',
    text: 'Frames epitope-conditioned scaffold generation, interface scoring, developability triage and assay-ready panel export.',
    tags: ['RFdiffusion', 'ProteinMPNN', 'interface score'],
    icon: Dna,
    url: 'https://github.com/RosettaCommons/RFdiffusion',
    cta: 'Open RFdiffusion'
  },
  {
    name: 'Sequence Designer',
    label: 'Inverse folding and sequence search',
    text: 'Demonstrates sequence proposal, residue constraints, novelty ranking and mutational design logic for protein engineering demos.',
    tags: ['inverse folding', 'mutation queue', 'novelty'],
    icon: Network,
    url: 'https://github.com/dauparas/ProteinMPNN',
    cta: 'Open ProteinMPNN'
  },
  {
    name: 'Antibody Studio',
    label: 'CDR optimisation workspace',
    text: 'Explores antibody-like CDR search, liabilities, immunogenicity flags, expression filters and lead prioritisation dashboards.',
    tags: ['CDR search', 'liability filter', 'lead triage'],
    icon: TestTube2,
    url: 'https://opig.stats.ox.ac.uk/webapps/sabdab-sabpred/sabdab',
    cta: 'Open SAbDab'
  },
  {
    name: 'Enzyme Engineer',
    label: 'Active-site mutation planner',
    text: 'Maps active-site hypotheses, substrate-pocket residues, thermostability goals and kinetic assay planning into a design console.',
    tags: ['active site', 'thermostability', 'kinetics'],
    icon: FlaskConical,
    url: 'https://www.brenda-enzymes.org/',
    cta: 'Open BRENDA'
  },
  {
    name: 'Structure Intelligence',
    label: 'AlphaFold and PDB evidence layer',
    text: 'Connects structural hypotheses to real public resources for fold context, residue annotation and literature-aware prioritisation.',
    tags: ['AlphaFold DB', 'RCSB PDB', 'evidence'],
    icon: Database,
    url: 'https://alphafold.ebi.ac.uk/',
    cta: 'Open AlphaFold DB'
  },
  {
    name: 'Cryo-EM Builder',
    label: 'Density-to-model product concept',
    text: 'Adds a visual module for cryo-EM model building, density interpretation and structure validation product demos.',
    tags: ['cryo-EM', 'model building', 'validation'],
    icon: Microscope,
    url: 'https://www.ebi.ac.uk/emdb/',
    cta: 'Open EMDB'
  },
  {
    name: 'Literature Agent',
    label: 'PubMed-linked design context',
    text: 'Provides a clickable evidence layer for ATP synthase, generative protein design and molecular engineering literature discovery.',
    tags: ['PubMed', 'evidence graph', 'citations'],
    icon: BookOpen,
    url: 'https://pubmed.ncbi.nlm.nih.gov/?term=F1-ATPase+crystal+structure',
    cta: 'Search PubMed'
  }
];

const resources = [
  ['RCSB PDB 1BMF', 'Crystallised F1-ATPase structure page', 'https://www.rcsb.org/structure/1BMF', Database],
  ['UniProt ATP5F1A', 'Human ATP synthase F1 alpha subunit entry', 'https://www.uniprot.org/uniprotkb/P25705/entry', Dna],
  ['PyMOL', 'Desktop molecular graphics system', 'https://www.pymol.org/', Atom],
  ['3Dmol.js', 'WebGL molecular viewer used by the app', 'https://3dmol.csb.pitt.edu/', CircuitBoard],
  ['AlphaFold DB', 'Predicted protein structures', 'https://alphafold.ebi.ac.uk/', BrainCircuit],
  ['RFdiffusion', 'Generative protein structure design code', 'https://github.com/RosettaCommons/RFdiffusion', Github],
  ['ProteinMPNN', 'Sequence design from protein backbone geometry', 'https://github.com/dauparas/ProteinMPNN', Github],
  ['EMDB', 'Electron microscopy density maps', 'https://www.ebi.ac.uk/emdb/', Microscope]
];

const workflow = [
  ['01', 'Choose biological target', 'Start from F1-ATPase, a binder epitope, enzyme pocket, antibody antigen or cryo-EM structure.'],
  ['02', 'Render structure context', 'Use the rotating 3D viewer, public structure links and evidence cards to frame the design problem.'],
  ['03', 'Generate hypotheses', 'Switch modules to simulate binder, antibody, enzyme, structure and literature-assisted design routes.'],
  ['04', 'Export experiment plan', 'Download a YAML design brief containing selected module, public resource links and assay priorities.']
];

const metrics = [
  ['1BMF', 'live F1-ATPase background'],
  ['8', 'clickable design modules'],
  ['8', 'real public resource links'],
  ['24/7', 'continuous molecular motion']
];

function openExternal(url) {
  window.open(url, '_blank', 'noopener,noreferrer');
}

function buildFallbackATPasePdb() {
  const residues = ['ALA','GLY','SER','LEU','VAL','THR','ASP','LYS','PHE','TYR','ASN','GLU'];
  const chains = [
    { chain: 'A', n: 46, ox: -22, oy: 8, oz: 0, phase: 0.0, radius: 10, rise: 1.32 },
    { chain: 'B', n: 44, ox: 17, oy: -4, oz: -8, phase: 1.8, radius: 8.4, rise: 1.26 },
    { chain: 'C', n: 40, ox: -2, oy: -21, oz: 9, phase: 3.1, radius: 7.6, rise: 1.16 },
    { chain: 'D', n: 34, ox: 25, oy: 16, oz: 4, phase: 4.4, radius: 6.3, rise: 1.42 },
    { chain: 'E', n: 32, ox: -26, oy: -15, oz: -7, phase: 5.2, radius: 6.8, rise: 1.18 }
  ];
  let serial = 1;
  const pad = (value, width) => String(value).padStart(width, ' ');
  const atomLine = (atom, res, chain, idx, x, y, z, element) => {
    const atomName = atom.padEnd(4, ' ');
    return `ATOM  ${pad(serial++, 5)} ${atomName} ${res} ${chain}${pad(idx, 4)}    ${x.toFixed(3).padStart(8, ' ')}${y.toFixed(3).padStart(8, ' ')}${z.toFixed(3).padStart(8, ' ')}  1.00 28.00           ${element.padStart(2, ' ')}`;
  };
  const lines = [];
  chains.forEach((cfg) => {
    for (let i = 0; i < cfg.n; i += 1) {
      const t = i * 0.74 + cfg.phase;
      const drift = (i - cfg.n / 2) * cfg.rise;
      const x = cfg.ox + Math.cos(t) * cfg.radius + drift * 0.45;
      const y = cfg.oy + Math.sin(t * 0.86) * cfg.radius * 0.72;
      const z = cfg.oz + Math.sin(t) * cfg.radius + drift * 0.25;
      const res = residues[(i + cfg.chain.charCodeAt(0)) % residues.length];
      const rn = i + 1;
      lines.push(atomLine('N', res, cfg.chain, rn, x - 0.85, y + 0.20, z - 0.20, 'N'));
      lines.push(atomLine('CA', res, cfg.chain, rn, x, y, z, 'C'));
      lines.push(atomLine('C', res, cfg.chain, rn, x + 0.95, y - 0.18, z + 0.25, 'C'));
      lines.push(atomLine('O', res, cfg.chain, rn, x + 1.45, y - 0.68, z + 0.65, 'O'));
    }
    lines.push('TER');
  });
  lines.push('END');
  return lines.join('\n');
}

function PyMolProteinBackground({ motion = true, speed = 0.52, styleMode = 'cartoon' }) {
  const viewerRef = useRef(null);
  const frameRef = useRef(null);
  const viewerStateRef = useRef({ viewer: null, ready: false });

  const atoms = useMemo(() => Array.from({ length: 92 }, (_, i) => ({
    id: i,
    x: 100 + ((i * 127) % 1260),
    y: 70 + ((i * 89) % 760),
    r: 1.0 + (i % 5) * 0.42,
    delay: `${(i % 13) * -0.31}s`
  })), []);

  useEffect(() => {
    let cancelled = false;
    const host = viewerRef.current;
    if (!host || !window.$3Dmol) return undefined;

    host.innerHTML = '';
    const viewer = window.$3Dmol.createViewer(host, {
      backgroundColor: 'rgba(255,255,255,0)',
      antialias: true
    });

    const styleRealModel = () => {
      const cartoonStyle = styleMode === 'surface'
        ? { cartoon: { colorscheme: 'chainHetatm', thickness: 0.46, opacity: 0.88 }, surface: { opacity: 0.20, colorscheme: 'whiteCarbon' } }
        : { cartoon: { colorscheme: 'spectrum', thickness: 0.62, opacity: 0.97 } };
      viewer.setStyle({}, cartoonStyle);
      viewer.addStyle({ hetflag: true }, { stick: { radius: 0.24, colorscheme: 'magentaCarbon', opacity: 0.75 } });
      viewer.setBackgroundColor('rgba(255,255,255,0)');
      viewer.zoomTo();
      viewer.zoom(1.72);
      viewer.rotate(16, 'x');
      viewer.rotate(-28, 'y');
      viewer.render();
      viewerStateRef.current = { viewer, ready: true };
    };

    const loadFallback = () => {
      if (cancelled || viewerStateRef.current.ready) return;
      viewer.addModel(buildFallbackATPasePdb(), 'pdb');
      viewer.setStyle({ chain: 'A' }, { cartoon: { color: '#ff2f20', thickness: 0.76, opacity: 0.96 } });
      viewer.setStyle({ chain: 'B' }, { cartoon: { color: '#5f3de6', thickness: 0.76, opacity: 0.96 } });
      viewer.setStyle({ chain: 'C' }, { cartoon: { color: '#ff7a1a', thickness: 0.76, opacity: 0.96 } });
      viewer.setStyle({ chain: 'D' }, { cartoon: { color: '#e45db4', thickness: 0.76, opacity: 0.96 } });
      viewer.setStyle({ chain: 'E' }, { cartoon: { color: '#96d8e8', thickness: 0.76, opacity: 0.72 } });
      viewer.zoomTo();
      viewer.zoom(1.5);
      viewer.rotate(18, 'x');
      viewer.rotate(-24, 'y');
      viewer.render();
      viewerStateRef.current = { viewer, ready: true };
    };

    try {
      window.$3Dmol.download(`pdb:${ATP_SYNTHASE_PDB_ID}`, viewer, { doAssembly: true, multimodel: false }, () => {
        if (cancelled) return;
        styleRealModel();
      });
      window.setTimeout(loadFallback, 6500);
    } catch (_) {
      loadFallback();
    }

    const animate = () => {
      if (cancelled) return;
      if (motion) {
        viewer.rotate(speed, 'y');
        viewer.rotate(speed * 0.15, 'x');
        viewer.render();
      }
      frameRef.current = window.requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelled = true;
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
      try { viewer.clear(); } catch (_) { /* no-op */ }
    };
  }, [motion, speed, styleMode]);

  return (
    <div className={motion ? 'pymolBackground motionOn' : 'pymolBackground motionOff'} aria-hidden="true">
      <div className="pymolGridBox">
        <svg className="gridPerspective" viewBox="0 0 1200 660" preserveAspectRatio="none">
          <g className="backPlane">
            <rect x="275" y="115" width="650" height="410" />
            <path d="M0 70 H1200 M0 230 H1200 M0 390 H1200 M0 550 H1200" />
            <path d="M140 0 V660 M320 0 V660 M500 0 V660 M700 0 V660 M880 0 V660 M1060 0 V660" />
          </g>
          <g className="perspectiveEdges">
            <path d="M275 115 L80 15 M925 115 L1120 15 M275 525 L80 645 M925 525 L1120 645" />
            <path d="M80 15 H1120 V645 H80 Z" />
            <path d="M275 115 H925 V525 H275 Z" />
          </g>
        </svg>
      </div>

      <div className="pymol3dViewer" ref={viewerRef} />
      <div className="pdbBadge">{ATP_SYNTHASE_LABEL}</div>

      <svg className="pymolScene pymolFallback" viewBox="0 0 1500 920" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="redRibbon" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ff3d23" /><stop offset="1" stopColor="#ff785f" /></linearGradient>
          <linearGradient id="violetRibbon" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#3515b9" /><stop offset="1" stopColor="#a98cff" /></linearGradient>
          <linearGradient id="orangeRibbon" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ff5a12" /><stop offset="1" stopColor="#ffb178" /></linearGradient>
          <filter id="proteinShadow" x="-25%" y="-25%" width="150%" height="150%"><feDropShadow dx="0" dy="28" stdDeviation="22" floodColor="#2c2a68" floodOpacity="0.18"/></filter>
        </defs>
        <g className="proteinComplex" filter="url(#proteinShadow)">
          <path className="loop redStroke" d="M678 168 C712 124, 744 128, 781 162 C825 201, 878 174, 920 191 C988 219, 999 291, 940 315 C905 329, 873 310, 848 284" />
          <path className="loop violetStroke" d="M362 330 C336 250, 408 212, 482 239 C558 266, 587 337, 529 384 C468 432, 380 398, 362 330 Z" />
          <path className="loop orangeStroke" d="M426 611 C356 570, 372 476, 454 463 C528 452, 583 511, 559 581 C538 642, 475 641, 426 611 Z" />
          <g className="atomCloudBackdrop">{atoms.map(a => <circle key={a.id} cx={a.x} cy={a.y} r={a.r} style={{ animationDelay: a.delay }} />)}</g>
        </g>
      </svg>
      <div className="proteinBlurBand" />
    </div>
  );
}

function ModuleCard({ item, selected, onSelect }) {
  const Icon = item.icon;
  return (
    <article className={selected ? 'modelCard selectedModel' : 'modelCard'}>
      <div className="cardTopline">
        <div className="iconBubble"><Icon size={20} /></div>
        <span>{item.name}</span>
      </div>
      <h3>{item.label}</h3>
      <p>{item.text}</p>
      <div className="tagRow">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
      <div className="cardActions">
        <button className="cardButton" type="button" onClick={() => onSelect(item)}>
          Load module <ArrowRight size={16} />
        </button>
        <button className="ghostMini" type="button" onClick={() => openExternal(item.url)}>
          {item.cta} <ExternalLink size={14} />
        </button>
      </div>
    </article>
  );
}

function ResourceCard({ resource }) {
  const [title, text, url, Icon] = resource;
  return (
    <button className="resourceCard" type="button" onClick={() => openExternal(url)}>
      <span className="resourceIcon"><Icon size={20} /></span>
      <span>
        <strong>{title}</strong>
        <em>{text}</em>
      </span>
      <ExternalLink size={16} />
    </button>
  );
}

function App() {
  const [theme, setTheme] = useState('light');
  const [selectedModule, setSelectedModule] = useState(modules[0]);
  const [runState, setRunState] = useState('idle');
  const [proteinMotion, setProteinMotion] = useState(true);
  const [speed, setSpeed] = useState(0.52);
  const [styleMode, setStyleMode] = useState('cartoon');
  const [copyState, setCopyState] = useState('Copy prompt');

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const loadModule = (item) => {
    setSelectedModule(item);
    setRunState('ready');
    scrollTo('platform');
  };

  const runDesign = () => {
    setRunState('running');
    window.setTimeout(() => setRunState('complete'), 1100);
  };

  const yaml = `project: F1_ATPase_Programmable_Biology_Studio\nactive_module: ${selectedModule.name}\nmodule_goal: ${selectedModule.label}\nbackground_structure:\n  pdb_id: ${ATP_SYNTHASE_PDB_ID}\n  label: ${ATP_SYNTHASE_LABEL}\npublic_resource: ${selectedModule.url}\nvisual_style:\n  viewer: 3Dmol.js\n  mode: ${styleMode}\n  rotation_speed: ${speed.toFixed(2)}\ndesign_tasks:\n  - structure_context\n  - hypothesis_generation\n  - developability_triage\n  - wet_lab_panel_export\nstatus: ${runState}`;

  const exportYaml = () => {
    const blob = new Blob([yaml], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedModule.name.toLowerCase().replaceAll(' ', '-')}-design-run.yaml`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyPrompt = async () => {
    const prompt = `Design a ${selectedModule.label} workflow using ${ATP_SYNTHASE_LABEL}. Include structure context, public evidence links, scoring metrics, experimental validation and a concise lab-ready design panel.`;
    try {
      await navigator.clipboard.writeText(prompt);
      setCopyState('Copied');
      window.setTimeout(() => setCopyState('Copy prompt'), 1400);
    } catch (_) {
      setCopyState('Copy failed');
    }
  };

  return (
    <main className={theme === 'light' ? 'app light' : 'app'}>
      <PyMolProteinBackground motion={proteinMotion} speed={speed} styleMode={styleMode} />
      <nav className="nav">
        <a className="brand" href="#top" aria-label="Programmable Biology Studio home">
          <span className="brandMark"><Dna size={18} /></span>
          <span>Programmable Biology Studio</span>
        </a>
        <div className="navLinks">
          <button className="navButtonLink" type="button" onClick={() => scrollTo('models')}><MousePointerClick size={14} /> Modules</button>
          <button className="navButtonLink" type="button" onClick={() => scrollTo('resources')}><ExternalLink size={14} /> Real links</button>
          <button className="navButtonLink" type="button" onClick={() => scrollTo('workflow')}><Waves size={14} /> Workflow</button>
          <button className="motionToggle" type="button" onClick={() => setProteinMotion(!proteinMotion)}>{proteinMotion ? <Pause size={14} /> : <Play size={14} />}{proteinMotion ? 'Pause ATPase' : 'Animate ATPase'}</button>
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</button>
        </div>
      </nav>

      <section id="top" className="hero latentHero">
        <div className="heroProteinSpacer" />
        <div className="latentGlassHero">
          <div className="missionColumn">
            <span className="missionDot" />
            <span className="missionLabel">Bioenergetic design interface</span>
          </div>
          <div className="heroStatement">
            <h1>Animated F1-ATPase molecular studio for programmable biology</h1>
            <p>
              A portfolio-ready generative biology app with a continuously rotating crystallised F1-ATPase background, clickable scientific modules, live controls and direct links to real structural biology resources.
            </p>
            <div className="heroActions latentActions">
              <button type="button" onClick={() => scrollTo('models')} className="primaryButton">Explore modules <ArrowRight size={18} /></button>
              <button type="button" onClick={() => openExternal('https://www.rcsb.org/structure/1BMF')} className="secondaryButton">Open PDB 1BMF <ExternalLink size={16} /></button>
              <button type="button" onClick={() => setProteinMotion(!proteinMotion)} className="secondaryButton">{proteinMotion ? 'Pause molecule' : 'Start molecule'}</button>
            </div>
          </div>
        </div>
        <div className="viewerControlDock">
          <button type="button" onClick={() => setProteinMotion(!proteinMotion)}>{proteinMotion ? <Pause size={16} /> : <Play size={16} />} {proteinMotion ? 'Pause' : 'Play'}</button>
          <button type="button" onClick={() => setSpeed(Math.max(0.15, speed - 0.12))}><Gauge size={16} /> Slower</button>
          <button type="button" onClick={() => setSpeed(Math.min(1.15, speed + 0.12))}><Zap size={16} /> Faster</button>
          <button type="button" onClick={() => setStyleMode(styleMode === 'cartoon' ? 'surface' : 'cartoon')}><Sparkles size={16} /> {styleMode === 'cartoon' ? 'Surface glow' : 'Cartoon ribbon'}</button>
        </div>
        <div className="metricGrid latentMetricGrid">
          {metrics.map(([value, label]) => <div className="metric" key={label}><strong>{value}</strong><span>{label}</span></div>)}
        </div>
      </section>

      <section id="models" className="sectionPad modelsSection">
        <div className="sectionHeader">
          <span className="kicker">More modules added</span>
          <h2>Clickable scientific modules for structure, design, antibodies, enzymes, cryo-EM and literature.</h2>
          <p>Each card loads the module into the design console and also opens a real public scientific resource.</p>
        </div>
        <div className="modelGrid expandedGrid">
          {modules.map(item => <ModuleCard key={item.name} item={item} selected={selectedModule.name === item.name} onSelect={loadModule} />)}
        </div>
      </section>

      <section id="resources" className="sectionPad resourcesSection">
        <div className="sectionHeader compactHeader">
          <span className="kicker">Real-life links</span>
          <h2>External resources wired into the app.</h2>
          <p>These buttons open live databases, molecular viewers and open-source protein design tools in a new tab.</p>
        </div>
        <div className="resourceGrid">{resources.map(resource => <ResourceCard key={resource[0]} resource={resource} />)}</div>
      </section>

      <section id="workflow" className="sectionPad workflowSection">
        <div className="workflowPanel">
          <div>
            <span className="kicker">Closed-loop design</span>
            <h2>From rotating ATP synthase structure to experiment-ready design brief.</h2>
            <p>The enhanced interface combines the moving molecular background, public resource links, module loading and exportable design configuration.</p>
          </div>
          <div className="steps">
            {workflow.map(([num, title, text]) => <div className="step" key={num}><strong>{num}</strong><div><h3>{title}</h3><p>{text}</p></div></div>)}
          </div>
        </div>
      </section>

      <section id="platform" className="sectionPad platformSection">
        <div className="consoleCard">
          <div className="consoleHeader"><span /><span /><span /><p>f1-atpase-design-run.yaml</p></div>
          <pre>{yaml}</pre>
          <div className="consoleActions">
            <button type="button" onClick={runDesign}><RotateCw size={16} /> Run module</button>
            <button type="button" onClick={exportYaml}><Download size={16} /> Export YAML</button>
            <button type="button" onClick={copyPrompt}><Copy size={16} /> {copyState}</button>
            <button type="button" onClick={() => openExternal(selectedModule.url)}><ExternalLink size={16} /> Open selected link</button>
          </div>
          <p className={`runStatus ${runState}`}>
            {runState === 'idle' && 'Ready. Choose a module or run the current F1-ATPase design console.'}
            {runState === 'ready' && `${selectedModule.name} loaded. Press Run module to simulate candidate prioritisation.`}
            {runState === 'running' && 'Running structure-context scoring, resource mapping and lab-panel generation'}
            {runState === 'complete' && `${selectedModule.name} complete. Export YAML or open the linked scientific resource.`}
          </p>
        </div>
        <div className="platformCopy">
          <span className="kicker">Clickable product demo</span>
          <h2>Active controls, live links and continuously moving molecular background.</h2>
          <p>This version is built as a polished landing-page app for generative biology, bioenergetics, protein design and structural AI portfolios.</p>
          <div className="platformButtons">
            <button type="button" onClick={() => loadModule(modules[0])}>ATPase viewer</button>
            <button type="button" onClick={() => loadModule(modules[1])}>Binder forge</button>
            <button type="button" onClick={() => loadModule(modules[3])}>Antibody studio</button>
            <button type="button" onClick={() => loadModule(modules[7])}>Literature agent</button>
          </div>
          <div className="featureList">
            <span><Sparkles size={18} /> Active module: {selectedModule.name}</span>
            <span><Beaker size={18} /> Public resource: {selectedModule.cta}</span>
            <span><RotateCcw size={18} /> Rotation speed: {speed.toFixed(2)}</span>
            <span><Zap size={18} /> Mode: {styleMode}</span>
          </div>
        </div>
      </section>

      <footer>
        <p>© 2026 Programmable Biology Studio. Original portfolio template with public scientific links. Not affiliated with Latent Labs.</p>
      </footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
