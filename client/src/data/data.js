import burger1 from '../assets/burger1.jpg'

import gyros1 from '../assets/gyros1.jpg'

import pizza1 from '../assets/pizza1.jpg'

import pasta1 from '../assets/pasta1.jpg'

export const foodTypes = [
  {
    name: 'burger',
    img: burger1,
    id: crypto.randomUUID()
  },
  {
    name: 'gyros',
    img: gyros1,
    id: crypto.randomUUID()
  },
  {
    name: 'pizza',
    img: pizza1,
    id: crypto.randomUUID()
  },
  {
    name: 'pasta',
    img: pasta1,
    id: crypto.randomUUID()
  }
]
