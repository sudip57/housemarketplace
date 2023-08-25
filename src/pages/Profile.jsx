import { useState, useEffect } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import {
  updateDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../firebase.config';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg';
import homeIcon from '../assets/svg/homeIcon.svg';
import ListingItems from '../components/ListingItems';

const Profile = () => {
  const auth = getAuth();
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState(null);
  const [changeDetails, setChangeDetails] = useState();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;

  const onSubmit = async () => {
    // Update in firebase
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        // update in firestore
        const userRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userRef, {
          name,
        });
        toast.success('Details updated');
      }
    } catch (error) {
      console.log(error);

      toast.error('Could not update profile details');
    }
  };

  const onDelete = async (listingId) => {
    if (window.confirm('Are you sure you want to delete')) {
      await deleteDoc(doc(db, 'listings', listingId));
      const updatedListings = listings.filter(
        (listing) => listing.id !== listingId
      );
      setListings(updatedListings);
      toast.success('Listings deleted successfully');
    }
  };

  const onEdit = (listingId) => navigate(`/edit-listing/${listingId}`);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const navigate = useNavigate();

  const onLogOut = () => {
    auth.signOut();
    navigate('/');
  };

  useEffect(() => {
    const fetchUserListings = async () => {
      const listingsRef = collection(db, 'listings');

      const q = query(
        listingsRef,
        where('userRef', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc')
      );

      const querySnap = await getDocs(q);

      let listings = [];

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setListings(listings);
      setLoading(false);
    };

    fetchUserListings();
  }, [auth.currentUser.uid]);

  return (
    <>
      <div className="mb-[10rem] m-4 lg:m-[3rem]">
        <header className="profileHeader mb-[1rem]">
          <p className="pageHeader">My Profile</p>
          <button type="button" className="logOut" onClick={onLogOut}>
            LogOut
          </button>
        </header>
        <main>
          <div className="profileDetailsHeader">
            <p className="profileDetailsText">Personal Details</p>
            <p
              className="changePersonalDetails"
              onClick={() => {
                changeDetails && onSubmit();
                setChangeDetails((prevState) => !prevState);
              }}
            >
              {changeDetails ? 'Done' : 'Change'}
            </p>
          </div>
          <div className="profileCard">
            <form>
              <input
                type="text"
                id="name"
                className={
                  !changeDetails
                    ? 'profileName mb-2 '
                    : 'profileNameActive flex mb-2'
                }
                disabled={!changeDetails}
                value={name}
                onChange={onChange}
              />
              <input
                type="text"
                id="email"
                className={
                  !changeDetails
                    ? 'profileName mb-2'
                    : 'profileNameActive flex mb-2'
                }
                disabled={!changeDetails}
                value={email}
                onChange={onChange}
              />
            </form>
          </div>

          <Link to="/create-listing" className="createListing">
            <img src={homeIcon} alt="home" />
            <p>Sell or rent your home</p>
            <img src={arrowRight} alt="arrowRight" />
          </Link>

          {!loading && listings?.length > 0 && (
            <>
              <p className="mt-[3rem] font-semibold ">Your Listings</p>
              <ul className="listingsList">
                {listings.map((listing) => (
                  <ListingItems
                    key={listing.id}
                    listing={listing.data}
                    id={listing.id}
                    onDelete={() => onDelete(listing.id)}
                    onEdit={() => onEdit(listing.id)}
                  />
                ))}
              </ul>
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default Profile;
