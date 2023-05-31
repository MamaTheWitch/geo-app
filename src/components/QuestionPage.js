import React, { useState, useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

export const QuestionPage = ({
    question,
    answer,
    hint,
    maps,
    picture,
    showHint,
    showPicture,
    showMap,
    timer,
    onAnswerChange,
    onSubmitAnswer,
    }) => {
    return (
    
      <div id="game">
        <h1>{question}</h1>
        <form onSubmit={onSubmitAnswer}>
          <label>
            3003# 
            <input type="text" value={answer} onChange={onAnswerChange} />
          </label>
          <button type="submit">Submit</button>
        </form>

        <div>{showMap && (
          <a
            href={maps}
            target="_blank"
            rel="noreferrer"
          >
            Google Maps
          </a>
        )}</div>


        <div>{showPicture && 
          <img 
            src={picture} 
            alt="Hint picture" 
            />
            }</div>

<div>{showHint && 
          <p>Hint: {hint}
          </p>
          }</div>
          
        <p>Time: {timer} seconds</p>
      </div>
     
    );
    };