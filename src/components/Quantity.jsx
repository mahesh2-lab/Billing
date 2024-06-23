import React from 'react'
import { Button } from '@headlessui/react'

function Quantity() {
  return (
    <>
    <Button>-</Button>
    <input type="number"  min={1} />
    <button>+</button>
    </>
  )
}

export default Quantity