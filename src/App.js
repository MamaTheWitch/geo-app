import React, { useState, useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import {QuestionPage} from './components/QuestionPage';
import {ResultPage} from './components/ResultPage';
import {LoginPage} from './components/LoginPage';
import Logo from './levelUP.png';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState('');
  const [timer, setTimer] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showPicture, setShowPicture] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [teams, setTeams] = useState([]);

  const questions = [
    { question: 'Quest 0: Etsi takapihan suurimmat urheiluvälineet ja hae sen ympäriltä', answer: '2102' , hint: 'Etsi trampoliinin jalkojen ympäriltä.', picture: 'https://res.cloudinary.com/diauwizxz/image/upload/v1685518455/Q1_ydmzad.jpg' , maps: 'https://goo.gl/maps/LrfQxSERVtcQGDke9?coh=178572&entry=tt'},
    { question: 'Quest 1: Etsi muumitalo, mutta älä mene sisään!', answer: '3245' , hint: 'Etsi pensaita kadun varrelta.', picture: 'https://res.cloudinary.com/diauwizxz/image/upload/v1685518455/Q2_w4wka3.jpg' , maps: 'https://goo.gl/maps/6VhdSs4SjZMbhir47?coh=178572&entry=tt'},
    { question: 'Quest 2: Tämän koulun peruskorjaus valmistuu kesäkuussa 2023.', answer: '6911' , hint: 'Hae metrin etäisyydellä infotaulusta.', picture: 'https://res.cloudinary.com/diauwizxz/image/upload/v1685518455/Q3_we2xtu.jpg' , maps: 'https://goo.gl/maps/KY5qJZxvozHb97LX9?coh=178572&entry=tt'},
    { question: 'Quest 3: Paikallinen päiväkoti mäellä.', answer: '5812' , hint: 'Tarkista kuvan ottopaikan puut.', picture: 'https://res.cloudinary.com/diauwizxz/image/upload/v1685518455/Q4_fvhdke.jpg' , maps: 'https://goo.gl/maps/gCRcZYqTXTxfG7u86?coh=178572&entry=tt'},
    { question: 'Quest 4: Nuorisokoti Laajalahdessa', answer: '1212' , hint: 'Etsi yksi metri rikkinäisen aidan oikealta.', picture: 'https://res.cloudinary.com/diauwizxz/image/upload/v1685518455/Q5_unypkz.jpg' , maps: 'https://goo.gl/maps/FuWTgBsJyYTW3KDd9?coh=178572&entry=tt'},
    { question: 'Quest 5: Ma luin rivin, luin kaks, / vereni tunsin kuumemmaks. (J. L. Runeberg)', answer: '5210' , hint: 'Etsi rakennusaidan vasemmalta kulmalta.', picture: 'https://res.cloudinary.com/diauwizxz/image/upload/v1685518455/Q6_td9chy.jpg' , maps: 'https://goo.gl/maps/6qduktYCjfAUuwtEA?coh=178572&entry=tt'},
    { question: 'Quest 6: Sen nimi lienee yhdistelmä Elvirasta ja keijua tarkoittavasta ruotsin kielen sanasta ”älva” sekä paikannimestä Bredvik. Nimi lausutaan Elviik', answer: '9240' , hint: 'Etsi villan takapuolella seisovan ison kiven takana.', picture: 'https://res.cloudinary.com/diauwizxz/image/upload/v1685518456/Q7_drx8ki.jpg' , maps: 'https://goo.gl/maps/e84Ntjtx3M2MHmMW8?coh=178572&entry=tt'},
    { question: 'Quest 7: Etsi kyltti veden läheltä', answer: '4108' , hint: 'Hae kyltin takaa.', picture: 'https://res.cloudinary.com/diauwizxz/image/upload/v1685518457/Q8_gvw7ww.jpg' , maps: 'https://goo.gl/maps/Fm9T9iBYwfhy6SUt7?coh=178572&entry=tt'},
    { question: 'Quest 8: Autotien alla oleva jalankulkutie.', answer: '6666' , hint: 'Etsi kiviseinällä.', picture: 'https://res.cloudinary.com/diauwizxz/image/upload/v1685518457/Q9_j3odbu.jpg' , maps: 'https://goo.gl/maps/bz6gihF8kSCgdTXm7?coh=178572&entry=tt'},
    { question: 'Quest 9: Iso vanha sähkötorni, josta on tehty jopa pokestoppi!', answer: '8145' , hint: 'Etsi tornin takaa.', picture: 'https://res.cloudinary.com/diauwizxz/image/upload/v1685518456/Q10_qspslh.jpg' , maps: 'https://goo.gl/maps/VJSJNgGqgYkGumKg6?coh=178572&entry=tt'},
    { question: 'Quest 10: Päiväkoti Tapiolan ja Laajalahden välissä.', answer: '7887' , hint: 'Tarkista puut päiväkodin takapuolella.', picture: 'https://res.cloudinary.com/diauwizxz/image/upload/v1685518456/Q11_ktgrer.jpg' , maps: 'https://goo.gl/maps/k5rNYjzTg87rLgUh8?coh=178572&entry=tt'},
    { question: 'Final Quest: Mikä on iso ja oranssi Marsun pihalla?', answer: '4823' , hint: 'Etsi kirjoituksia, älä kangastarroja.', picture: 'https://res.cloudinary.com/diauwizxz/image/upload/v1685518455/Q12_gyhtjy.jpg' , maps: 'https://goo.gl/maps/cUBh5jUzbTVSbNSM9?coh=178572&entry=tt'}
  ];

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleSubmitAnswer = (event) => {
    event.preventDefault();
    if (answer === questions[currentQuestion].answer) {
      if (currentQuestion === questions.length - 1) {
        setCompleted(true);
        setLoggedIn(false);
        setTeams(teams, {time: timer});
      } else {
        setCurrentQuestion(currentQuestion + 1);
        setAnswer('');
        setTimer(0);
        setShowHint(false);
        setShowPicture(false);
        setShowMap(false);
      }
    } else {
      alert('Väärä vastaus! Yritä uudelleen.');
    }
  };

  useEffect(() => {
    let interval = null;
    if (loggedIn) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
        if (timer === 300) {
          setShowMap(true);
          setShowPicture(true);
          
        }
        if (timer === 600) {
          setShowHint(true);
        }
        if (timer === 900) {
         const message=questions[currentQuestion].answer;
          alert('Kokeile tätä vastausta: '+message);
        
      }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [loggedIn, timer]);

  return (
    <Router>
      <Fragment>

      <div className="App">
    <div><img id="logo" src={Logo} /></div>
        <Routes>
    
          <Route exact path="/" element={!loggedIn ? (<LoginPage onSubmitPassword={handleLogin} />) : (<Navigate to="/question" />)}>
        </Route>
        <Route exact path="/question" element={!completed ? (   <QuestionPage
              question={questions[currentQuestion].question}
              picture={questions[currentQuestion].picture}
              maps={questions[currentQuestion].maps}
              answer={answer}
              hint={questions[currentQuestion].hint}
              showHint={showHint}
              showPicture={showPicture}
              showMap={showMap}
              timer={timer}
              onAnswerChange={handleAnswerChange}
              onSubmitAnswer={handleSubmitAnswer}
            />) : (<ResultPage teams={teams} />)}>
        </Route>
  
        </Routes>
      </div>
      </Fragment>
    </Router>
  );
};



export default App;

  
