
import React, { useState, useEffect } from 'react';
import './App.css';

// Main App Component
function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [customNotes, setCustomNotes] = useState({});
  const [ratings, setRatings] = useState({});
  const [savedData, setSavedData] = useState([]);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [saveDataName, setSaveDataName] = useState('');

  // Load data from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('gtciNotes');
    const savedRatings = localStorage.getItem('gtciRatings');
    const savedSnapshots = localStorage.getItem('gtciSnapshots');

    if (savedNotes) setCustomNotes(JSON.parse(savedNotes));
    if (savedRatings) setRatings(JSON.parse(savedRatings));
    if (savedSnapshots) setSavedData(JSON.parse(savedSnapshots));
  }, []);

  // Save notes to localStorage
  const handleNoteChange = (id, text) => {
    const updatedNotes = { ...customNotes, [id]: text };
    setCustomNotes(updatedNotes);
    localStorage.setItem('gtciNotes', JSON.stringify(updatedNotes));
  };

  // Save ratings to localStorage
  const handleRatingChange = (id, rating) => {
    const updatedRatings = { ...ratings, [id]: rating };
    setRatings(updatedRatings);
    localStorage.setItem('gtciRatings', JSON.stringify(updatedRatings));
  };

  // Save entire snapshot
  const handleSaveSnapshot = () => {
    if (!saveDataName.trim()) {
      alert('Please enter a name for this snapshot');
      return;
    }

    const snapshot = {
      id: Date.now(),
      name: saveDataName,
      timestamp: new Date().toLocaleString(),
      notes: customNotes,
      ratings: ratings,
      activeTab: activeTab
    };

    const updated = [...savedData, snapshot];
    setSavedData(updated);
    localStorage.setItem('gtciSnapshots', JSON.stringify(updated));
    setSaveDataName('');
    setShowSaveModal(false);
    alert('Snapshot saved successfully!');
  };

  // Load snapshot
  const handleLoadSnapshot = (snapshot) => {
    setCustomNotes(snapshot.notes);
    setRatings(snapshot.ratings);
    setActiveTab(snapshot.activeTab);
    localStorage.setItem('gtciNotes', JSON.stringify(snapshot.notes));
    localStorage.setItem('gtciRatings', JSON.stringify(snapshot.ratings));
  };

  // Delete snapshot
  const handleDeleteSnapshot = (id) => {
    const updated = savedData.filter(s => s.id !== id);
    setSavedData(updated);
    localStorage.setItem('gtciSnapshots', JSON.stringify(updated));
  };

  // Export data as JSON
  const handleExportData = () => {
    const data = {
      notes: customNotes,
      ratings: ratings,
      snapshots: savedData,
      exportDate: new Date().toISOString()
    };
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'gtci-dashboard-data.json';
    link.click();
  };

  return (
    <div className="app">
      <Header onExport={handleExportData} onOpenSaveModal={() => setShowSaveModal(true)} />

      <div className="container">
        <TabsContainer activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="main-content">
          {activeTab === 'overview' && <OverviewTab customNotes={customNotes} handleNoteChange={handleNoteChange} />}
          {activeTab === 'indicators' && <IndicatorsTab customNotes={customNotes} handleNoteChange={handleNoteChange} ratings={ratings} handleRatingChange={handleRatingChange} />}
          {activeTab === 'pillars' && <PillarsTab customNotes={customNotes} handleNoteChange={handleNoteChange} />}
          {activeTab === 'reforms' && <ReformsTab customNotes={customNotes} handleNoteChange={handleNoteChange} />}
          {activeTab === 'budget' && <BudgetTab customNotes={customNotes} handleNoteChange={handleNoteChange} />}
          {activeTab === 'implementation' && <ImplementationTab customNotes={customNotes} handleNoteChange={handleNoteChange} />}
          {activeTab === 'dashboard' && <DashboardTab customNotes={customNotes} handleNoteChange={handleNoteChange} />}
          {activeTab === 'quality' && <QualityTab customNotes={customNotes} handleNoteChange={handleNoteChange} />}
          {activeTab === 'financial' && <FinancialTab customNotes={customNotes} handleNoteChange={handleNoteChange} />}
          {activeTab === 'snapshots' && <SnapshotsTab savedData={savedData} onLoad={handleLoadSnapshot} onDelete={handleDeleteSnapshot} />}
        </main>
      </div>

      {showSaveModal && (
        <SaveModal 
          onSave={handleSaveSnapshot} 
          onClose={() => setShowSaveModal(false)}
          value={saveDataName}
          onChange={setSaveDataName}
        />
      )}
    </div>
  );
}

// Header Component
function Header({ onExport, onOpenSaveModal }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="header-title">GTCI 2025</h1>
          <p className="header-subtitle">Brunei Darussalam Policy Dashboard</p>
          <p className="header-meta">Global Rank: 46 | Overall Score: 56.08 | 2030 Target: Rank 35 | Score 68.0</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary" onClick={onOpenSaveModal}>
            💾 Save Snapshot
          </button>
          <button className="btn btn-secondary" onClick={onExport}>
            📥 Export Data
          </button>
        </div>
      </div>
    </header>
  );
}

// Tabs Container
function TabsContainer({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'overview', label: '📊 Overview' },
    { id: 'indicators', label: '📋 Indicators' },
    { id: 'pillars', label: '🏛️ Pillars' },
    { id: 'reforms', label: '🔧 Reforms' },
    { id: 'budget', label: '💰 Budget' },
    { id: 'implementation', label: '📅 Implementation' },
    { id: 'dashboard', label: '📈 Dashboard' },
    { id: 'quality', label: '✓ Quality' },
    { id: 'financial', label: '💼 Financial' },
    { id: 'snapshots', label: '📸 Snapshots' }
  ];

  return (
    <div className="tabs-container">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

// Tab Components
function OverviewTab({ customNotes, handleNoteChange }) {
  return (
    <div className="tab-content">
      <div className="content-header">
        <h2>Executive Summary</h2>
        <p className="subtitle">Brunei's talent competitiveness landscape and strategic priorities</p>
      </div>

      <div className="cards-grid">
        <MetricCard label="Global Rank" value="46" subtext="out of 135 countries" />
        <MetricCard label="Overall Score" value="56.08" subtext="2030 target: 68.0" />
        <MetricCard label="2030 Target Rank" value="35" subtext="12-position improvement" />
        <MetricCard label="Investment Required" value="BND 1,260M" subtext="10-year program" />
      </div>

      <div className="summary-section">
        <h3>Key Findings</h3>
        <div className="findings-list">
          <div className="finding-item success">
            <span className="icon">✓</span>
            <div>
              <strong>World-class strengths:</strong> Political Stability (#2), Pension Coverage (#1), Digital Skills (#1)
            </div>
          </div>
          <div className="finding-item danger">
            <span className="icon">🚨</span>
            <div>
              <strong>Critical weaknesses:</strong> Innovation Output (Rank 132), Skills-Demand Mismatch (119), Domestic Credit (-56% crash)
            </div>
          </div>
          <div className="finding-item warning">
            <span className="icon">⚠️</span>
            <div>
              <strong>Data quality issues:</strong> Digital Skills (100.0 = suspicious), New Business Density (0 = missing), AI Talent (no data)
            </div>
          </div>
        </div>
      </div>

      <div className="note-section">
        <h3>Personal Notes</h3>
        <textarea
          className="note-input"
          placeholder="Add your analysis and observations here..."
          value={customNotes['overview'] || ''}
          onChange={(e) => handleNoteChange('overview', e.target.value)}
        />
      </div>
    </div>
  );
}

function IndicatorsTab({ customNotes, handleNoteChange, ratings, handleRatingChange }) {
  const indicators = [
    { id: 1, name: 'Software Development', score: 3.02, rank: 123, trend: '-56%', owner: 'MOFE' },
    { id: 2, name: 'New Business Density', score: 0.0, rank: 2, trend: 'Missing', owner: 'MPEC' },
    { id: 3, name: 'High-Value Exports', score: 1.53, rank: 110, trend: 'Static', owner: 'MOC' },
    { id: 4, name: 'Professionals', score: 33.81, rank: 83, trend: '-0.7', owner: 'MOE' },
    { id: 5, name: 'Soft Skills', score: 57.13, rank: 12, trend: 'NEW', owner: 'MOE' },
    { id: 6, name: 'Digital Skills', score: 100.0, rank: 1, trend: 'Suspicious', owner: 'AITI' },
    { id: 7, name: 'Scientific Articles', score: 32.91, rank: 73, trend: '+8.6', owner: 'UBD' },
    { id: 8, name: 'Senior Officials', score: 42.22, rank: 81, trend: '+7.0', owner: 'DEPS' },
    { id: 9, name: 'Innovation Output', score: 3.3, rank: 132, trend: 'Stagnant', owner: 'UBD/MPEC' },
    { id: 10, name: 'Skills Mismatch', score: 42.88, rank: 119, trend: 'Deadlock', owner: 'MOE/MOFE' },
    { id: 11, name: 'FDI Restrictiveness', score: 54.68, rank: 77, trend: '-6.94', owner: 'BEDB' },
    { id: 12, name: 'Domestic Credit', score: 15.42, rank: 114, trend: '-56%', owner: 'MOF' },
    { id: 13, name: 'Mobile Apps', score: 43.27, rank: 87, trend: 'Growing', owner: 'AITI' },
    { id: 14, name: 'AI Talent', score: 0.0, rank: 7, trend: 'No Data', owner: 'N/A' }
  ];

  return (
    <div className="tab-content">
      <div className="content-header">
        <h2>Dashboard Indicators (14 Analyzed)</h2>
        <p className="subtitle">Detailed indicator analysis with quality assessment</p>
      </div>

      <div className="indicators-grid">
        {indicators.map(indicator => (
          <div key={indicator.id} className="indicator-card">
            <div className="indicator-header">
              <h4>{indicator.name}</h4>
              <span className={`rank-badge ${indicator.score > 50 ? 'success' : indicator.score > 25 ? 'warning' : 'danger'}`}>
                Rank #{indicator.rank}
              </span>
            </div>
            <div className="indicator-body">
              <div className="score-row">
                <span className="label">Score:</span>
                <span className="value">{indicator.score.toFixed(2)}</span>
              </div>
              <div className="score-row">
                <span className="label">Trend:</span>
                <span className={`trend ${indicator.trend.includes('-') ? 'negative' : 'positive'}`}>
                  {indicator.trend}
                </span>
              </div>
              <div className="score-row">
                <span className="label">Data Owner:</span>
                <span className="owner">{indicator.owner}</span>
              </div>
            </div>
            <div className="indicator-rating">
              <label>Your Assessment:</label>
              <select 
                value={ratings[`indicator-${indicator.id}`] || 'select'}
                onChange={(e) => handleRatingChange(`indicator-${indicator.id}`, e.target.value)}
                className="rating-select"
              >
                <option value="select">Select rating...</option>
                <option value="critical">🚨 Critical</option>
                <option value="concern">⚠️ Concern</option>
                <option value="monitor">📊 Monitor</option>
                <option value="strength">✓ Strength</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      <div className="note-section">
        <h3>Indicator Analysis Notes</h3>
        <textarea
          className="note-input"
          placeholder="Add detailed analysis of indicators here..."
          value={customNotes['indicators'] || ''}
          onChange={(e) => handleNoteChange('indicators', e.target.value)}
        />
      </div>
    </div>
  );
}

function PillarsTab({ customNotes, handleNoteChange }) {
  const pillars = [
    { name: 'ENABLE', score: 56.3, rank: 43, status: 'Moderate' },
    { name: 'ATTRACT', score: 56.1, rank: 46, status: 'At Risk' },
    { name: 'GROW', score: 39.9, rank: 55, status: 'Critical' },
    { name: 'RETAIN', score: 65.5, rank: 39, status: 'Stable' },
    { name: 'VT SKILLS', score: 62.2, rank: 33, status: 'Good' },
    { name: 'KNOWLEDGE', score: 29.0, rank: 50, status: 'Crisis' }
  ];

  return (
    <div className="tab-content">
      <div className="content-header">
        <h2>GTCI Pillar Analysis</h2>
        <p className="subtitle">Six core pillars of talent competitiveness</p>
      </div>

      <div className="pillars-grid">
        {pillars.map((pillar, idx) => (
          <div key={idx} className={`pillar-card status-${pillar.status.toLowerCase().replace(' ', '-')}`}>
            <div className="pillar-rank">{pillar.name}</div>
            <div className="pillar-score">{pillar.score.toFixed(1)}</div>
            <div className="pillar-meta">
              <div>Rank: #{pillar.rank}</div>
              <div>Status: {pillar.status}</div>
            </div>
            <div className="pillar-bar">
              <div className="progress-bar" style={{ width: `${pillar.score}%` }}></div>
            </div>
          </div>
        ))}
      </div>

      <div className="note-section">
        <h3>Pillar Strategy Notes</h3>
        <textarea
          className="note-input"
          placeholder="Document pillar-specific strategies and improvements..."
          value={customNotes['pillars'] || ''}
          onChange={(e) => handleNoteChange('pillars', e.target.value)}
        />
      </div>
    </div>
  );
}

function ReformsTab({ customNotes, handleNoteChange }) {
  const reforms = [
    { tier: 'TIER-1', title: 'Innovation Ecosystem', timeline: '0-12 mo', budget: 'BND 50M+', status: 'Planned' },
    { tier: 'TIER-1', title: 'Skills-Demand Audit', timeline: '0-6 mo', budget: 'BND 5M', status: 'Planned' },
    { tier: 'TIER-1', title: 'TVET Prestige Campaign', timeline: '3-12 mo', budget: 'BND 10M', status: 'Planned' },
    { tier: 'TIER-2', title: 'AI Talent Development', timeline: '0-36 mo', budget: 'BND 500M', status: 'Planned' },
    { tier: 'TIER-2', title: 'SME Ecosystem', timeline: '0-60 mo', budget: 'BND 50M', status: 'Planned' },
    { tier: 'TIER-3', title: 'Research Publication', timeline: 'Ongoing', budget: 'BND 500M', status: 'Ongoing' }
  ];

  return (
    <div className="tab-content">
      <div className="content-header">
        <h2>Reform Roadmap</h2>
        <p className="subtitle">Phased implementation from TIER-1 to TIER-3 reforms</p>
      </div>

      <div className="reforms-list">
        {reforms.map((reform, idx) => (
          <div key={idx} className={`reform-card ${reform.tier.toLowerCase()}`}>
            <div className="reform-header">
              <span className="tier-badge">{reform.tier}</span>
              <h4>{reform.title}</h4>
            </div>
            <div className="reform-details">
              <div className="detail">
                <span className="label">Timeline:</span>
                <span className="value">{reform.timeline}</span>
              </div>
              <div className="detail">
                <span className="label">Budget:</span>
                <span className="value">{reform.budget}</span>
              </div>
              <div className="detail">
                <span className="label">Status:</span>
                <span className={`status ${reform.status.toLowerCase()}`}>{reform.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="note-section">
        <h3>Reform Implementation Notes</h3>
        <textarea
          className="note-input"
          placeholder="Track reform progress, blockers, and next actions..."
          value={customNotes['reforms'] || ''}
          onChange={(e) => handleNoteChange('reforms', e.target.value)}
        />
      </div>
    </div>
  );
}

function BudgetTab({ customNotes, handleNoteChange }) {
  const initiatives = [
    { name: 'Software Development', timeline: '7 yrs', budget: 'BND 50M', roi: 'BND 50-75M' },
    { name: 'SME Creation', timeline: '5 yrs', budget: 'BND 50M', roi: 'BND 40-60M' },
    { name: 'High-Value Exports', timeline: '7 yrs', budget: 'BND 100M', roi: 'BND 100-150M' },
    { name: 'AI Talent Development', timeline: '10 yrs', budget: 'BND 500M', roi: 'BND 75-150M' },
    { name: 'ICT Services', timeline: '7 yrs', budget: 'BND 100M', roi: 'BND 75-125M' },
    { name: 'Research & Publication', timeline: 'Ongoing', budget: 'BND 500M', roi: 'BND 75-100M' }
  ];

  const total = initiatives.reduce((acc, init) => {
    const num = parseInt(init.budget.match(/\d+/)[0]);
    return acc + num;
  }, 0);

  return (
    <div className="tab-content">
      <div className="content-header">
        <h2>Budget & Investment Plan</h2>
        <p className="subtitle">10-Year Strategic Investment Program (2025-2035)</p>
      </div>

      <div className="budget-summary">
        <div className="summary-card">
          <div className="summary-label">Total Investment</div>
          <div className="summary-value">BND 1,260M</div>
          <div className="summary-period">10-year program</div>
        </div>
        <div className="summary-card">
          <div className="summary-label">Annual Average</div>
          <div className="summary-value">BND 126M</div>
          <div className="summary-period">2025-2035</div>
        </div>
        <div className="summary-card">
          <div className="summary-label">Expected ROI</div>
          <div className="summary-value">2.5-4.5x</div>
          <div className="summary-period">return multiplier</div>
        </div>
        <div className="summary-card">
          <div className="summary-label">Breakeven</div>
          <div className="summary-value">Year 2-3</div>
          <div className="summary-period">2027-2028</div>
        </div>
      </div>

      <div className="initiatives-table">
        <h3>13 Strategic Initiatives</h3>
        <table>
          <thead>
            <tr>
              <th>Initiative</th>
              <th>Timeline</th>
              <th>Budget</th>
              <th>Expected ROI</th>
            </tr>
          </thead>
          <tbody>
            {initiatives.map((init, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? 'even' : 'odd'}>
                <td>{init.name}</td>
                <td>{init.timeline}</td>
                <td>{init.budget}</td>
                <td className="roi">{init.roi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="note-section">
        <h3>Budget & Investment Notes</h3>
        <textarea
          className="note-input"
          placeholder="Track budget allocation, disbursements, and ROI tracking..."
          value={customNotes['budget'] || ''}
          onChange={(e) => handleNoteChange('budget', e.target.value)}
        />
      </div>
    </div>
  );
}

function ImplementationTab({ customNotes, handleNoteChange }) {
  return (
    <div className="tab-content">
      <div className="content-header">
        <h2>Implementation Roadmap</h2>
        <p className="subtitle">Timeline, governance, and accountability framework</p>
      </div>

      <div className="timeline-container">
        <div className="timeline-item">
          <div className="timeline-dot phase-0"></div>
          <div className="timeline-content">
            <h4>Phase 0-6 Months</h4>
            <p><strong>Foundation & Quick Wins</strong></p>
            <ul>
              <li>Establish GTCI Reform Steering Committee</li>
              <li>Commission data validation audits</li>
              <li>Launch innovation fund legislation</li>
              <li>Begin FDI portal development</li>
            </ul>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-dot phase-1"></div>
          <div className="timeline-content">
            <h4>Phase 6-18 Months</h4>
            <p><strong>Deployment & Scaling</strong></p>
            <ul>
              <li>Issue first innovation grants</li>
              <li>Launch FDI portal (7-day SLA)</li>
              <li>Begin AI Research Center operations</li>
              <li>First cohort of TVET apprenticeships</li>
            </ul>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-dot phase-2"></div>
          <div className="timeline-content">
            <h4>Phase 18+ Months</h4>
            <p><strong>Sustained Implementation</strong></p>
            <ul>
              <li>Scale innovation grants program</li>
              <li>Expand AI talent development</li>
              <li>Reach 5,000+ civil servants trained in AI</li>
              <li>First economic outcomes visible</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="governance-section">
        <h3>Governance Structure</h3>
        <div className="governance-box">
          <h4>GTCI Reform Steering Committee</h4>
          <p><strong>Chair:</strong> Prime Minister's Office</p>
          <p><strong>Members:</strong> MOE, MOFE, MPEC, BEDB, DEPS, IBTE, MOA</p>
          <p><strong>Frequency:</strong> Monthly reviews | Quarterly Cabinet briefings</p>
          <p><strong>Focus:</strong> Monthly scorecards on milestones vs timeline</p>
        </div>
      </div>

      <div className="note-section">
        <h3>Implementation Tracking</h3>
        <textarea
          className="note-input"
          placeholder="Track implementation progress, issues, and milestones achieved..."
          value={customNotes['implementation'] || ''}
          onChange={(e) => handleNoteChange('implementation', e.target.value)}
        />
      </div>
    </div>
  );
}

function DashboardTab({ customNotes, handleNoteChange }) {
  const indicators = [
    { name: 'Software Dev', score: 3.02, rank: 123, owner: 'MOFE', status: 'Critical' },
    { name: 'New Business', score: 0.0, rank: 2, owner: 'MPEC', status: 'Missing' },
    { name: 'Exports', score: 1.53, rank: 110, owner: 'MOC', status: 'Critical' },
    { name: 'Professionals', score: 33.81, rank: 83, owner: 'MOE', status: 'Concern' },
    { name: 'Soft Skills', score: 57.13, rank: 12, owner: 'MOE', status: 'Good' },
    { name: 'Digital Skills', score: 100.0, rank: 1, owner: 'AITI', status: 'Suspect' },
    { name: 'Publications', score: 32.91, rank: 73, owner: 'UBD', status: 'Growing' },
    { name: 'Officials', score: 42.22, rank: 81, owner: 'DEPS', status: 'Growing' },
    { name: 'Innovation', score: 3.3, rank: 132, owner: 'UBD', status: 'Stagnant' },
    { name: 'Skills Match', score: 42.88, rank: 119, owner: 'MOE', status: 'Deadlock' },
    { name: 'FDI', score: 54.68, rank: 77, owner: 'BEDB', status: 'Friction' },
    { name: 'Credit', score: 15.42, rank: 114, owner: 'MOF', status: 'Crash' },
    { name: 'Mobile Apps', score: 43.27, rank: 87, owner: 'AITI', status: 'Growing' },
    { name: 'AI Talent', score: 0.0, rank: 7, owner: 'N/A', status: 'No Data' }
  ];

  return (
    <div className="tab-content">
      <div className="content-header">
        <h2>Dashboard Indicators</h2>
        <p className="subtitle">14 Comprehensive Indicators with Complete Analysis</p>
      </div>

      <div className="dashboard-grid">
        {indicators.map((ind, idx) => (
          <div key={idx} className={`dashboard-card status-${ind.status.toLowerCase()}`}>
            <div className="card-name">{ind.name}</div>
            <div className="card-score">{ind.score.toFixed(1)}</div>
            <div className="card-meta">
              <span className="rank">Rank #{ind.rank}</span>
              <span className="owner">{ind.owner}</span>
            </div>
            <div className="card-status">{ind.status}</div>
          </div>
        ))}
      </div>

      <div className="note-section">
        <h3>Dashboard Insights</h3>
        <textarea
          className="note-input"
          placeholder="Document patterns, insights, and action items from the dashboard..."
          value={customNotes['dashboard'] || ''}
          onChange={(e) => handleNoteChange('dashboard', e.target.value)}
        />
      </div>
    </div>
  );
}

function QualityTab({ customNotes, handleNoteChange }) {
  const issues = [
    {
      title: 'Digital Skills (Rank 6)',
      problem: 'Score 100.0 conflicts with Software Dev 3.02',
      expected: '15-25%',
      action: 'Commission digital skills census (ITU partnership)',
      timeline: '0-6 months',
      budget: 'BND 50M'
    },
    {
      title: 'New Business Density (Rank 2)',
      problem: 'Zero score contradicts dynamic business environment',
      expected: '3-8 per 1,000 population',
      action: 'Mandate World Bank submission + entrepreneurship census',
      timeline: '0-6 months',
      budget: 'BND 5M annually'
    },
    {
      title: 'AI Talent Concentration (Rank 7)',
      problem: 'No data available (Brunei not in LinkedIn sample)',
      expected: 'Unknown without data',
      action: 'Develop Brunei-specific AI talent tracking system',
      timeline: '0-12 months',
      budget: 'BND 500M (10 years)'
    }
  ];

  return (
    <div className="tab-content">
      <div className="content-header">
        <h2>Data Quality Assessment</h2>
        <p className="subtitle">3 Critical Data Quality Issues Identified</p>
      </div>

      <div className="quality-header-stats">
        <div className="stat-box">
          <span className="rating">★★★☆☆</span>
          <span className="label">Overall Quality Rating: 3/5</span>
        </div>
        <div className="stat-box">
          <span className="label">Indicators Analyzed: 14</span>
        </div>
      </div>

      <div className="issues-list">
        {issues.map((issue, idx) => (
          <div key={idx} className="issue-card critical">
            <div className="issue-title">
              <span className="icon">🚨</span>
              {issue.title}
            </div>
            <div className="issue-grid">
              <div className="issue-item">
                <span className="label">Problem:</span>
                <p>{issue.problem}</p>
              </div>
              <div className="issue-item">
                <span className="label">Expected Value:</span>
                <p>{issue.expected}</p>
              </div>
              <div className="issue-item">
                <span className="label">Action Required:</span>
                <p>{issue.action}</p>
              </div>
              <div className="issue-item">
                <span className="label">Timeline:</span>
                <p>{issue.timeline}</p>
              </div>
              <div className="issue-item">
                <span className="label">Budget:</span>
                <p>{issue.budget}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="note-section">
        <h3>Data Quality Actions</h3>
        <textarea
          className="note-input"
          placeholder="Track data quality improvements, validation efforts, and timeline..."
          value={customNotes['quality'] || ''}
          onChange={(e) => handleNoteChange('quality', e.target.value)}
        />
      </div>
    </div>
  );
}

function FinancialTab({ customNotes, handleNoteChange }) {
  const projections = [
    { period: '2025-26', investment: 'BND 126M', roi: 'BND 50M', status: 'Investment year' },
    { period: '2026-27', investment: 'BND 140M', roi: 'BND 150M', status: 'Breakeven near' },
    { period: '2027-28', investment: 'BND 145M', roi: 'BND 250M', status: 'Sustained ROI' },
    { period: '2028-32', investment: 'BND 180M/yr', roi: 'BND 400-600M/yr', status: 'Momentum' },
    { period: '2032-35', investment: 'BND 123M/yr', roi: 'BND 600-1,000M/yr', status: 'Peak maturity' }
  ];

  return (
    <div className="tab-content">
      <div className="content-header">
        <h2>Financial Summary</h2>
        <p className="subtitle">10-Year Investment Program & ROI Analysis</p>
      </div>

      <div className="financial-metrics">
        <div className="metric">
          <span className="metric-value">BND 1,260M</span>
          <span className="metric-label">Total Investment</span>
        </div>
        <div className="metric">
          <span className="metric-value">2.5-4.5x</span>
          <span className="metric-label">ROI Multiplier</span>
        </div>
        <div className="metric">
          <span className="metric-value">2-3 years</span>
          <span className="metric-label">Breakeven Period</span>
        </div>
        <div className="metric">
          <span className="metric-value">BND 3.5-5B</span>
          <span className="metric-label">Total ROI 10 Years</span>
        </div>
      </div>

      <div className="projections-table">
        <h3>Financial Projections</h3>
        <table>
          <thead>
            <tr>
              <th>Period</th>
              <th>Annual Investment</th>
              <th>Expected ROI</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {projections.map((proj, idx) => (
              <tr key={idx}>
                <td>{proj.period}</td>
                <td>{proj.investment}</td>
                <td className="roi-positive">{proj.roi}</td>
                <td>{proj.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="financing-breakdown">
        <h3>Financing Mechanisms (BND 1,260M)</h3>
        <div className="financing-grid">
          <div className="financing-item">
            <span className="percent">30%</span>
            <span className="label">National Budget</span>
            <span className="amount">BND 378M</span>
          </div>
          <div className="financing-item">
            <span className="percent">30%</span>
            <span className="label">Development Partners/Loans</span>
            <span className="amount">BND 378M</span>
          </div>
          <div className="financing-item">
            <span className="percent">25%</span>
            <span className="label">Private Sector Investment</span>
            <span className="amount">BND 315M</span>
          </div>
          <div className="financing-item">
            <span className="percent">15%</span>
            <span className="label">Diaspora & Impact Investment</span>
            <span className="amount">BND 189M</span>
          </div>
        </div>
      </div>

      <div className="note-section">
        <h3>Financial Analysis & Tracking</h3>
        <textarea
          className="note-input"
          placeholder="Track financial performance, disbursements, and ROI achievements..."
          value={customNotes['financial'] || ''}
          onChange={(e) => handleNoteChange('financial', e.target.value)}
        />
      </div>
    </div>
  );
}

function SnapshotsTab({ savedData, onLoad, onDelete }) {
  if (savedData.length === 0) {
    return (
      <div className="tab-content">
        <div className="empty-state">
          <div className="empty-icon">📸</div>
          <h2>No Snapshots Yet</h2>
          <p>Create and save snapshots of your analysis to compare versions over time.</p>
          <p style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
            Click "💾 Save Snapshot" in the header to create one.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="tab-content">
      <div className="content-header">
        <h2>Saved Snapshots</h2>
        <p className="subtitle">Compare different versions of your analysis</p>
      </div>

      <div className="snapshots-grid">
        {savedData.map(snapshot => (
          <div key={snapshot.id} className="snapshot-card">
            <div className="snapshot-header">
              <h4>{snapshot.name}</h4>
              <span className="timestamp">{snapshot.timestamp}</span>
            </div>
            <div className="snapshot-preview">
              <div className="preview-item">
                <span className="label">Notes:</span>
                <span className="count">{Object.keys(snapshot.notes).length} sections</span>
              </div>
              <div className="preview-item">
                <span className="label">Ratings:</span>
                <span className="count">{Object.keys(snapshot.ratings).length} items</span>
              </div>
              <div className="preview-item">
                <span className="label">Active Tab:</span>
                <span className="count">{snapshot.activeTab}</span>
              </div>
            </div>
            <div className="snapshot-actions">
              <button className="btn-small btn-load" onClick={() => onLoad(snapshot)}>
                Load
              </button>
              <button className="btn-small btn-delete" onClick={() => onDelete(snapshot.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Helper Components
function MetricCard({ label, value, subtext }) {
  return (
    <div className="metric-card">
      <div className="metric-label">{label}</div>
      <div className="metric-value">{value}</div>
      {subtext && <div className="metric-subtext">{subtext}</div>}
    </div>
  );
}

function SaveModal({ onSave, onClose, value, onChange }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Save Snapshot</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <label>Snapshot Name:</label>
          <input
            type="text"
            className="modal-input"
            placeholder="e.g., 'Cabinet Review - Dec 2025'"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onSave()}
          />
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={onSave}>Save Snapshot</button>
        </div>
      </div>
    </div>
  );
}

export default App;
