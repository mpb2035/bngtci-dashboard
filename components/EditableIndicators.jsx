import React, { useState, useEffect } from 'react';
import { create } from 'jss';
import preset from 'jss-preset-default';

const jss = create(preset());

const styles = {
  indicatorsContainer: {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px'
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: '#333',
    borderBottom: '2px solid #007bff',
    paddingBottom: '10px'
  },
  indicatorsList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '15px'
  },
  indicatorItem: {
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    backgroundColor: '#fafafa',
    transition: 'all 0.2s ease',
    '&:hover': {
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      borderColor: '#007bff'
    }
  },
  indicatorHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px'
  },
  indicatorName: {
    fontWeight: '600',
    color: '#333',
    fontSize: '14px'
  },
  indicatorValue: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: '8px'
  },
  editableInput: {
    width: '100%',
    padding: '6px',
    border: '1px solid #007bff',
    borderRadius: '4px',
    fontSize: '14px',
    marginBottom: '8px'
  },
  editButton: {
    padding: '4px 8px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    fontSize: '12px',
    '&:hover': {
      backgroundColor: '#0056b3'
    }
  },
  saveButton: {
    padding: '4px 8px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    fontSize: '12px',
    marginRight: '5px',
    '&:hover': {
      backgroundColor: '#218838'
    }
  },
  cancelButton: {
    padding: '4px 8px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    fontSize: '12px',
    '&:hover': {
      backgroundColor: '#c82333'
    }
  },
  buttonGroup: {
    display: 'flex',
    gap: '5px'
  },
  description: {
    fontSize: '12px',
    color: '#666',
    marginTop: '8px',
    lineHeight: '1.4'
  }
};

const sheet = jss.createStyleSheet(styles);
sheet.attach();

function EditableIndicators() {
  const [indicators, setIndicators] = useState([
    {
      id: 1,
      name: 'Talent Availability',
      value: 68,
      description: 'Percentage of available workforce with required skills'
    },
    {
      id: 2,
      name: 'Quality of Education',
      value: 72,
      description: 'Education system quality and vocational training'
    },
    {
      id: 3,
      name: 'Foreign Direct Investment',
      value: 55,
      description: 'FDI inflows and competitiveness ranking'
    },
    {
      id: 4,
      name: 'Economic Dynamism',
      value: 61,
      description: 'GDP growth and business environment'
    },
    {
      id: 5,
      name: 'Digital Infrastructure',
      value: 59,
      description: 'Broadband coverage and technology adoption'
    },
    {
      id: 6,
      name: 'Retention Capacity',
      value: 58,
      description: 'Wage competitiveness and quality of life'
    }
  ]);

  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('indicators_data');
    if (saved) {
      setIndicators(JSON.parse(saved));
    }
  }, []);

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem('indicators_data', JSON.stringify(indicators));
  }, [indicators]);

  const handleEdit = (id, value) => {
    setEditingId(id);
    setEditValue(value.toString());
  };

  const handleSave = (id) => {
    setIndicators(prev =>
      prev.map(ind =>
        ind.id === id
          ? { ...ind, value: parseFloat(editValue) || ind.value }
          : ind
      )
    );
    setEditingId(null);
    if (window.notifyChange) {
      window.notifyChange('Indicator updated!');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValue('');
  };

  return (
    <div className={sheet.classes.indicatorsContainer}>
      <h3 className={sheet.classes.sectionTitle}>Detailed Indicators</h3>
      <div className={sheet.classes.indicatorsList}>
        {indicators.map(indicator => (
          <div key={indicator.id} className={sheet.classes.indicatorItem}>
            <div className={sheet.classes.indicatorHeader}>
              <span className={sheet.classes.indicatorName}>{indicator.name}</span>
            </div>

            {editingId === indicator.id ? (
              <>
                <input
                  type="number"
                  className={sheet.classes.editableInput}
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  min="0"
                  max="100"
                  placeholder="0-100"
                />
                <div className={sheet.classes.buttonGroup}>
                  <button
                    className={sheet.classes.saveButton}
                    onClick={() => handleSave(indicator.id)}
                  >
                    Save
                  </button>
                  <button
                    className={sheet.classes.cancelButton}
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className={sheet.classes.indicatorValue}>{indicator.value}</div>
                <button
                  className={sheet.classes.editButton}
                  onClick={() => handleEdit(indicator.id, indicator.value)}
                >
                  Edit Value
                </button>
              </>
            )}

            <div className={sheet.classes.description}>{indicator.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EditableIndicators;
