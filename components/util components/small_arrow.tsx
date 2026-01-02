import React from 'react'

interface SmallArrowProps {
  angle?: 'up' | 'down' | 'left' | 'right'
}

export default function SmallArrow({ angle = 'up' }: SmallArrowProps) {
  return <div className={`arrow-custom-${angle}`} />
}
