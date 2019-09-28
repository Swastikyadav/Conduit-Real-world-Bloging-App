import React from 'react';

function FeedTab(props) {
    return(
        <h4 className="global-feed" style={{cursor: 'pointer'}} onClick={props.click}>{props.feedName}</h4>
    );
}

export default FeedTab;