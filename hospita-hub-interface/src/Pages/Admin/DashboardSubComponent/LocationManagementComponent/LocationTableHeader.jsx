// components/LocationHeader.jsx
import React from "react";

export default function LocationHeader({
  title,
  subtitle,
  onExport,
  onAddClick,
  addButtonLabel,
}) {
  return (
    <div className="dashboard-header">
      <div className="header-content">
        <h1 className="dashboard-title">{title}</h1>
        <p className="dashboard-subtitle">{subtitle}</p>
      </div>
      <div className="header-actions">
        <button className="export-btn" onClick={onExport}>Export Data</button>
        <button className="btn-primary" onClick={onAddClick}>{addButtonLabel}</button>
      </div>
    </div>
  );
}
