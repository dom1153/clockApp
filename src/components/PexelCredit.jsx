import React from 'react'

export default function PexelCredit({dark = false}) {
  return (
    <a href="https://www.pexels.com">
      <img className="h-6 inline align-middle" src={dark ? "https://images.pexels.com/lib/api/pexels.png" : "https://images.pexels.com/lib/api/pexels-white.png"} />
    </a>
  )
}
