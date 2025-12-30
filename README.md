# GTCI 2025 - Brunei Darussalam Policy Dashboard

## 🎯 Overview

A modern, interactive React.js dashboard for analyzing the Global Talent Competitiveness Index (GTCI) 2025 data for Brunei Darussalam. This application provides comprehensive policy analysis, strategic insights, and data persistence features.

## ✨ Features

### 🎨 Modern UI/UX
- **Beautiful Design**: Gradient headers, smooth transitions, responsive layout
- **Color-Coded Status**: Visual indicators for critical, warning, and success states
- **Interactive Components**: Hover effects, smooth animations, intuitive navigation

### 📊 Comprehensive Data
- **10 Tabs**: Overview, Indicators, Pillars, Reforms, Budget, Implementation, Dashboard, Data Quality, Financial, Snapshots
- **14 Indicators**: Complete analysis with scores, rankings, and status
- **6 GTCI Pillars**: Enable, Attract, Grow, Retain, VT Skills, Knowledge
- **13 Strategic Initiatives**: With timeline, budget, and ROI data
- **10-Year Financial Plan**: Investment projections and breakeven analysis

### 💾 Data Persistence
- **localStorage Integration**: All notes and ratings automatically saved
- **Snapshot System**: Create named snapshots of your entire analysis
- **Export Functionality**: Download all data as JSON for backup/sharing
- **Load Snapshots**: Compare different versions of your analysis

### 📝 Annotation System
- **Custom Notes**: Add analysis notes to every section
- **Risk Ratings**: Assess each indicator (Critical, Concern, Monitor, Strength)
- **Document Insights**: Track findings and action items

### 🎯 Interactive Elements
- **Indicator Cards**: Detailed metrics with dropdown ratings
- **Progress Bars**: Visual representation of pillar scores
- **Timeline**: Phased implementation roadmap
- **Tables**: Sortable budget and projection data
- **Governance Framework**: Implementation structure and accountability

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd gtci-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 📁 Project Structure

```
gtci-dashboard/
├── src/
│   ├── App.js              # Main React component
│   ├── App.css             # Styling
│   ├── index.js            # Entry point
│   └── index.html          # HTML template
├── public/
│   └── index.html
├── package.json            # Dependencies
└── README.md              # This file
```

## 🎮 Usage Guide

### Viewing Data
1. **Navigate Tabs**: Click any tab to view different sections
2. **Explore Indicators**: See detailed analysis of 14 key indicators
3. **Review Reforms**: Track TIER-1 to TIER-3 reform roadmap
4. **Check Budget**: View investment plan and financial projections

### Adding Notes
1. Scroll to "Personal Notes" section in any tab
2. Click the text area and type your analysis
3. Notes are automatically saved to browser storage

### Rating Indicators
1. In the Indicators tab, find each indicator card
2. Select a rating from the dropdown (Critical, Concern, Monitor, Strength)
3. Ratings are automatically saved

### Saving Snapshots
1. Click "💾 Save Snapshot" button in header
2. Enter a name (e.g., "Cabinet Review - Dec 2025")
3. Click Save - snapshot is stored with all notes and ratings

### Loading Snapshots
1. Go to "📸 Snapshots" tab
2. Click "Load" on any snapshot to restore it
3. All notes and ratings are restored instantly

### Exporting Data
1. Click "📥 Export Data" button in header
2. A JSON file downloads with all your data
3. Use for backup or sharing with colleagues

## 🎨 Design System

### Colors
- **Primary**: #003a6f (Navy Blue)
- **Secondary**: #1a5a96 (Lighter Blue)
- **Accent**: #d4a574 (Gold)
- **Success**: #4caf50 (Green)
- **Warning**: #ff9800 (Orange)
- **Danger**: #d32f2f (Red)

### Typography
- **Font**: Segoe UI, system fonts
- **Headers**: 2em to 0.85em scale
- **Body**: 0.95em to 1em

### Spacing
- **Padding**: 20px to 40px
- **Margins**: 15px to 30px
- **Gap**: 10px to 30px

## 💾 Data Storage

The application uses browser's localStorage to save:
- **gtciNotes**: Custom annotations for each section
- **gtciRatings**: Risk/status ratings for indicators
- **gtciSnapshots**: Complete snapshots with timestamp

### Storage Size
- Typical usage: 50-200KB (depending on notes length)
- Browser limit: Usually 5-10MB per domain
- Persistent: Data saved even after closing browser

## 🔧 Development

### Technologies
- **React 18**: Modern UI library
- **CSS3**: Custom styling with CSS variables
- **localStorage API**: Browser data persistence
- **JSON**: Data export format

### Extending Features

To add a new tab:
1. Create a new component function in App.js
2. Add tab configuration in TabsContainer
3. Handle activeTab state change
4. Add styling in App.css

Example:
```javascript
{activeTab === 'newtab' && <NewTabComponent customNotes={customNotes} handleNoteChange={handleNoteChange} />}
```

## 📊 Data Sources

- **GTCI 2023 Baseline**: Official GTCI methodology
- **Brunei Government**: MOE, MOFE, MPEC, BEDB data
- **Regional Analysis**: ASEAN comparison context
- **2030 Targets**: Ministry strategic objectives

## 🤝 Contributing

For improvements or bug reports, please:
1. Document the issue clearly
2. Provide screenshot if possible
3. Suggest improvements with context

## 📞 Support

For questions or issues:
- Check the dashboard's Help section (if available)
- Review this README
- Consult original HTML dashboard for reference data

## 📄 License

Ministry of Education, Brunei Darussalam
Proprietary - For Official Use Only

## 🎯 2030 Vision

"Brunei as a regional leader in talent competitiveness with a thriving innovation ecosystem, 5,000+ AI professionals, and a diversified economy."

---

**Last Updated**: December 2025
**Version**: 1.0.0
**Status**: Production Ready ✅
