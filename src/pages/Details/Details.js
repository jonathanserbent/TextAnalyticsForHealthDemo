import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

import "./Details.css";

export default function Details() {

  let { id } = useParams();
  const [document, setDocument] = useState({});
  const [selectedTab, setTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // console.log(id);
    axios.get('/api/lookup?id=' + id)
      .then(response => {
        const doc = response.data.document;
        setDocument(doc);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
      });

  }, [id]);

  // View default is loading with no active tab
  let detailsBody = (<CircularProgress />),
      resultStyle = "nav-link",
      rawStyle    = "nav-link";

  if (!isLoading && document) {
    // View result
    if (selectedTab === 0) {
      resultStyle += " active";
      let bodyParagraphs = (
        <div className="row">
          <div className="col text-left">
            <h6>Full Paper</h6>
            {document.body_text.map(paragraph => {
              return (
                <p>{paragraph.text}</p>
              );
            })}
          </div>
        </div>
      );
      let abstractParagraphs = (
        <div className="row">
          <div className="col text-left">
            <h6>Abstract</h6>
            {document.abstract.map(paragraph => {
              return (
                <p>{paragraph.text}</p>
              );
            })}
          </div>
        </div>
      );

      detailsBody = (
        <div className="card-body">
          <h4 className="card-title">{document.title}</h4>
          <p className="card-text text-left">{document.authors?.map(author => {
            return author.last + ", " + author.first
          }).join("; ")}</p>
          {abstractParagraphs}
          {bodyParagraphs}
        </div>
      );
    }

    // View raw data
    else {
      rawStyle += " active";
      detailsBody = (
        <div className="card-body text-left">
          <pre><code>
            {JSON.stringify(document, null, 2)}
          </code></pre>
        </div>
      );
    }
  }

  return (
    <main className="main main--details container fluid">
      <div className="card text-center result-container">
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item"><button className={resultStyle} onClick={() => setTab(0)}>Result</button></li>
              <li className="nav-item"><button className={rawStyle} onClick={() => setTab(1)}>Raw Data</button></li>
          </ul>
        </div>
        {detailsBody}
      </div>
    </main>
  );
}
