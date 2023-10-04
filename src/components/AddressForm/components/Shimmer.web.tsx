import React from 'react'

import Container from '../../Container'
import { IShimmerProps } from '../types'

const Shimmer: React.FC<IShimmerProps> = ({ fetched, children }) => {
  if (fetched) return <>{children}</>
  return (
    <Container my="8px">
      <div
        style={{ width: '100%', height: 40, borderRadius: 8, marginBottom: 16 }}
        className="shimmer"
      />
      <div
        style={{ width: '100%', height: 40, borderRadius: 8, marginBottom: 16 }}
        className="shimmer"
      />
      <div
        style={{ width: '100%', height: 40, borderRadius: 8, marginBottom: 16 }}
        className="shimmer"
      />
      <div
        style={{ width: '100%', height: 40, borderRadius: 8, marginBottom: 16 }}
        className="shimmer"
      />
      <div
        style={{ width: '100%', height: 40, borderRadius: 8, marginBottom: 16 }}
        className="shimmer"
      />
      <div
        style={{ width: '100%', height: 40, borderRadius: 8, marginBottom: 16 }}
        className="shimmer"
      />
      <div
        style={{ width: '100%', height: 40, borderRadius: 8, marginBottom: 16 }}
        className="shimmer"
      />
    </Container>
  )
}

export default Shimmer
