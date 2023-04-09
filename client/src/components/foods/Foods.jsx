import React from 'react'
import { foodTypes } from '../../data/data'
import { Link } from 'react-router-dom'
import classes from './foods.module.css'
import { getType } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

const Foods = () => {
  const type = useSelector(getType)
  return (
    <section id='foods' className={classes.container}>
      <div className={classes.wrapper}>
        {type === 'customer' && (
          <h4 className={classes.subtitle}>What we offer</h4>
        )}
        {type === 'customer' && (
          <h2 className={classes.title}>Best meals in the city</h2>
        )}
        <div className={classes.foods}>
          {foodTypes.map(foodType => (
            <Link
              to={`/foods/${foodType.name}`}
              key={foodType.id}
              className={classes.food}
            >
              <h4>{foodType.name}</h4>
              <div className={classes.imgContainer}>
                <img src={foodType.img} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Foods
