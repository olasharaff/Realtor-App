import React from 'react'

export default function ListingItem({listing, id}) {
  console.log(listing.name)
  return (
    <div key={id}>
      <p>{listing.name}</p>
      <p>{listing.address}</p>
    </div>
  );
}
