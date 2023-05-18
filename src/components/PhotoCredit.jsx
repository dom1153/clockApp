import PexelCredit from "./PexelCredit";
import React from 'react'

export default function PhotoCredit({img_url, photographer_name, photographer_url}) {
  return (
    <span>
        <a className="pr-2" href={photographer_url}>This Photo was taken by {photographer_name} on Pexels.</a>
        <PexelCredit/>
    </span>
  )
}
