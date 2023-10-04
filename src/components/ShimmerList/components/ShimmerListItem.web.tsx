import React from 'react'

import { IShimmerListItemProps } from '../types'

const ShimmerListItem: React.FC<IShimmerListItemProps> = ({
  showAvatar,
  showSubtitle
}) => {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ flexDirection: 'row', display: 'flex' }}>
        {showAvatar && (
          <div
            className="shimmer"
            style={{ width: 60, height: 60, borderRadius: 30 }}
          />
        )}
        <div
          style={{
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
            marginLeft: 5
          }}
        >
          <div
            className="shimmer"
            style={{ width: 150, height: 8, marginBottom: 5 }}
          />

          {showSubtitle && (
            <div className="shimmer" style={{ width: 150, height: 8 }} />
          )}
        </div>
      </div>
    </div>
  )
}

export default ShimmerListItem
