import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AttributionPage.css";

function AttributionPage() {
  const navigate = useNavigate();

  return (
    <div className="attribution-page">
      <h1>Attribution</h1>
      <p>
        This project uses the following external resources:
      </p>
      <ul>
        <li>
          <strong>Sound Effect:</strong> "Old radio button click" by pooya.work
        </li>
        <li>
          <strong>Song 1:</strong> "Voyager" by Key Puncher (Menu Music)
        </li>
        <li>
          <strong>Song 2:</strong> "Ocean Drive" by Miami Nights 1984 (Gameplay Music)
        </li>
      </ul>
      <button className="back-button" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
}

export default AttributionPage;