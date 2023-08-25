import { useEffect, useState } from 'react'

import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import ListingItems from '../components/ListingItems'

const Offers = () => {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastFetchListing, setlastFetchListing] = useState(null)

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsRef = collection(db, 'listings')

        // Create a query
        const q = query(
          listingsRef,
          where('offer', '==', true),
          orderBy('timestamp', 'desc'),
          limit(10),
        )

        // Execute query
        const querySnap = await getDocs(q)
        const lastVisible = querySnap.docs[querySnap.docs.length - 1]
        setlastFetchListing(lastVisible)

        const listings = []

        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          })
        })

        setListings(listings)
        setLoading(false)
      } catch (error) {
        console.log(error)
        toast.error('Could not fetch data')
      }
    }

    fetchListings()
  }, [])

  const onFetchMoreListings = async () => {
    try {
      const listingsRef = collection(db, 'listings')

      // Create a query
      const q = query(
        listingsRef,
        where('offer', '==', true),
        orderBy('timestamp', 'desc'),
        startAfter(lastFetchListing),
        limit(10),
      )

      // Execute query
      const querySnap = await getDocs(q)

      // for load more
      const lastVisible = querySnap.docs[querySnap.docs.length - 1]
      setlastFetchListing(lastVisible)

      const listings = []

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        })
      })

      setListings((prevState) => {
        ;[...prevState, ...listings]
      })
      setLoading(false)
    } catch (error) {
      console.log(error)
      toast.error('Could not fetch data')
    }
  }

  return (
    <div className="mb-[10rem] m-5">
      <header>
        <p className="pageHeader">Offers</p>
      </header>

      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="p-0">
              {listings.map((listing) => (
                <ListingItems
                  listing={listing.data}
                  id={listing.id}
                  key={listing.id}
                />
              ))}
            </ul>
          </main>
          <br />
          <br />
          {lastFetchListing && (
            <p className="loadMore" onClick={onFetchMoreListings}>
              Load More
            </p>
          )}
        </>
      ) : (
        <p>No current offers right now.</p>
      )}
    </div>
  )
}

export default Offers
