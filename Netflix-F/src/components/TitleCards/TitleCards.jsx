import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import {Link } from 'react-router-dom'



const TitleCards = ({title , category}) => {

  const cardsRef = useRef()
  const [apiData , setApiData] = useState([])

  

  

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ODVkMjViZTc3NWQ3MGMzMzMyZjhkYzA4M2I5ZWViMiIsIm5iZiI6MTczNTkyMTg1Ni4wNjYsInN1YiI6IjY3NzgxMGMwMmIwOTdiMTVhMjc0OWE5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MJjKT2kk6WTix8BRIlyaBuJJDg2O4cufU7JFOUx63ZA'
    }
  };
  



  const handleWheel = (event) =>{
    event.preventDefault()
    cardsRef.current.scrollLeft += event.deltaY
  }

  useEffect(()=>{
      fetch(`https://api.themoviedb.org/3/movie/${category?category:'now_playing'}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));
    cardsRef.current.addEventListener('wheel',handleWheel)

  },[])


  return (
    <div className='titlecards'>
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className='card-list' ref={cardsRef}>
        {apiData.map((card , index)=>{
          return <Link to={`/player/${card.id}`} className='card' key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
