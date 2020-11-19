import React, { useState } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useRouteMatch,
    useParams,
  } from "react-router-dom";


export default function Music() {
    let { id } = useParams();
  return (
    <div>
       <h3>{id}</h3>
    </div>
  )
}

