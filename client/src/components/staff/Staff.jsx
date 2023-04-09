import React, { useEffect, useMemo, useState } from 'react'
import Foods from '../foods/Foods'

import Order from '../order/Order'

const Staff = () => {
  return (
    <div>
      <Order />

      <Foods />
    </div>
  )
}

export default Staff
