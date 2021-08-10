import React from 'react';

import './Result.css';

export default function Result(props) {
    return(
    <div className="card result">
        <a href={`/details/${props.document.paper_id}`}>
            <div className="card-body">
                <p className="title-style">{props.document.title}</p>
            </div>
        </a>
    </div>
    );
}
