import React, { useState, useEffect } from 'react';
import { create } from 'jss';
import preset from 'jss-preset-default';

const jss = create(preset());

const styles = {
  scorecard: {
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    marginBottom: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    paddingBottom: '15px',
    borderBottom: '2px solid #ddd'
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333'
  },
  toggleButton: {
    padding: '8px 16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    '&:hover': {
      backgroundColor: '#0056b3'
    }
  },
  indicatorGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '15px',
    marginBottom: '20px'
  },
  indicatorCard: {
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    boxShadow: '0 1px 4px rgba(0,0,0,0.05)'
  },
  indicatorLabel: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#555',
    marginBottom: '8px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  scoreDisplay: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: '10px'
  },
  editableField: {
    width: '100%',
    padding: '8px',
    fontSize: '18px',
    border: '2px solid #007bff',
    borderRadius: '4px',
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: '10px'
  },
  rankField: {
    width: '100%',
    padding: '6px',
    fontSize: '14px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginBottom: '10px'
  },
  buttonGroup: {
    display: 'flex',
    gap: '8px',
    marginTop: '10px'
  },
  saveButton: {
    padding: '6px 12px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    '&:hover': {
      backgroundColor: '#218838'
    }
  },
  cancelButton: {
    padding: '6px 12px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    '&:hover': {
      backgroundColor: '#5a6268'
    }
  },
  editMode: {
    backgroundColor: '#fff3cd',
    borderColor: '#ffc107'
  }
};

const sheet = jss.createStyleSheet(styles);
sheet.attach();

function EditableScorecard({ data = null }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [scoreData, setScoreData] = useState(data || {
    overallRank: 44,
    globalTCI: 63.2,
    enablers: 62.5,
    practitioners: 65.0,
    results: 62.1
  });
  const [editValues, setEditValues] = useState(scoreData);

  // Load from localStorage if available
  useEffect(() => {
    const saved = localStorage.getItem('scorecard_data');
    if (saved) {
      const parsedData = JSON.parse(saved);
      setScoreData(parsedData);
      setEditValues(parsedData);
    }
  }, []);

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem('scorecard_data', JSON.stringify(scoreData));
  }, [scoreData]);

  const handleEditChange = (field, value) => {
    setEditValues(prev => ({
      ...prev,
      [field]: isNaN(value) ? value : parseFloat(value)
    }));
  };

  const handleSave = () => {
    setScoreData(editValues);
    setIsEditMode(false);
    // Show notification
    if (window.notifyChange) {
      window.notifyChange('Scorecard updated successfully!');
    }
  };

  const handleCancel = () => {
    setEditValues(scoreData);
    setIsEditMode(false);
  };

  const handleToggleEditMode = () => {
    setIsEditMode(!isEditMode);
    setEditValues(scoreData);
  };

  return (
    <div className={sheet.classes.scorecard}>
      <div className={sheet.classes.header}>
        <h2 className={sheet.classes.title}>Global Talent Competitiveness Index</h2>
        <button 
          className={sheet.classes.toggleButton}
          onClick={handleToggleEditMode}
        >
          {isEditMode ? 'Cancel Edit' : 'Edit Scores'}
        </button>
      </div>

      <div className={sheet.classes.indicatorGrid}>
        {/* Overall Rank Card */}
        <div className={`${sheet.classes.indicatorCard} ${isEditMode ? sheet.classes.editMode : ''}`}>
          <div className={sheet.classes.indicatorLabel}>Overall Rank</div>
          {isEditMode ? (
            <>
              <input
                type="number"
                className={sheet.classes.rankField}
                value={editValues.overallRank}
                onChange={(e) => handleEditChange('overallRank', e.target.value)}
                placeholder="Enter rank"
              />
              <div className={sheet.classes.buttonGroup}>
                <button className={sheet.classes.saveButton} onClick={handleSave}>Save All</button>
                <button className={sheet.classes.cancelButton} onClick={handleCancel}>Cancel</button>
              </div>
            </>
          ) : (
            <div className={sheet.classes.scoreDisplay}>{scoreData.overallRank}</div>
          )}
        </div>

        {/* Global TCI Score Card */}
        <div className={`${sheet.classes.indicatorCard} ${isEditMode ? sheet.classes.editMode : ''}`}>
          <div className={sheet.classes.indicatorLabel}>Global TCI Score</div>
          {isEditMode ? (
            <input
              type="number"
              step="0.1"
              className={sheet.classes.editableField}
              value={editValues.globalTCI}
              onChange={(e) => handleEditChange('globalTCI', e.target.value)}
              placeholder="Enter score"
            />
          ) : (
            <div className={sheet.classes.scoreDisplay}>{scoreData.globalTCI}</div>
          )}
        </div>

        {/* Enablers Card */}
        <div className={`${sheet.classes.indicatorCard} ${isEditMode ? sheet.classes.editMode : ''}`}>
          <div className={sheet.classes.indicatorLabel}>Enablers Score</div>
          {isEditMode ? (
            <input
              type="number"
              step="0.1"
              className={sheet.classes.editableField}
              value={editValues.enablers}
              onChange={(e) => handleEditChange('enablers', e.target.value)}
              placeholder="Enter score"
            />
          ) : (
            <div className={sheet.classes.scoreDisplay}>{scoreData.enablers}</div>
          )}
        </div>

        {/* Practitioners Card */}
        <div className={`${sheet.classes.indicatorCard} ${isEditMode ? sheet.classes.editMode : ''}`}>
          <div className={sheet.classes.indicatorLabel}>Practitioners Score</div>
          {isEditMode ? (
            <input
              type="number"
              step="0.1"
              className={sheet.classes.editableField}
              value={editValues.practitioners}
              onChange={(e) => handleEditChange('practitioners', e.target.value)}
              placeholder="Enter score"
            />
          ) : (
            <div className={sheet.classes.scoreDisplay}>{scoreData.practitioners}</div>
          )}
        </div>

        {/* Results Card */}
        <div className={`${sheet.classes.indicatorCard} ${isEditMode ? sheet.classes.editMode : ''}`}>
          <div className={sheet.classes.indicatorLabel}>Results Score</div>
          {isEditMode ? (
            <input
              type="number"
              step="0.1"
              className={sheet.classes.editableField}
              value={editValues.results}
              onChange={(e) => handleEditChange('results', e.target.value)}
              placeholder="Enter score"
            />
          ) : (
            <div className={sheet.classes.scoreDisplay}>{scoreData.results}</div>
          )}
        </div>
      </div>

      {isEditMode && (
        <div className={sheet.classes.header}>
          <p style={{fontSize: '12px', color: '#666', margin: 0}}>
            💡 All edits auto-save to browser storage when you click Save All
          </p>
        </div>
      )}
    </div>
  );
}

export default EditableScorecard;
