import { Link } from 'react-router-dom';
import bedIcon from '../assets/svg/bedIcon.svg';
import bathTubIcon from '../assets/svg/bathtubIcon.svg';

const ListingItems = ({ listing, id, onDelete, onEdit }) => {
  return (
    <li className="categoryListing mt-5">
      <Link to={`/category/${listing.type}/${id}`} className=" contents">
        <img
          src={listing.imgUrls[0]}
          alt={listing.name}
          className="categoryListingImg"
        />
        <div className="w-[65%] lg:w-[79%] ">
          <p className="categoryListingLocation mr-10 lg:ml-0">
            {listing.location}
          </p>
          <p className="categoryListingName">{listing.name}</p>
          <p className="categoryListingPrice">{listing.price}</p>
          <p className="categoryListingPrice">
            ₹
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            {listing.type === 'rent' && ' / Month'}
          </p>
          <div className="categoryListingInfoDiv">
            <img src={bedIcon} alt="bed" />
            <p className="categoryListingInfoText">
              {listing.bedrooms > 1
                ? `${listing.bedrooms} Bedrooms`
                : '1 Bedroom'}
            </p>
            <img src={bathTubIcon} alt="bathtub" />
            <p className="categoryListingInfoText">
              {listing.bathrooms > 1
                ? `${listing.bathrooms} Bathrooms`
                : '1 Bathroom'}
            </p>
          </div>
        </div>
      </Link>
      <div className="">
        {onDelete && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#E74C3C"
            className="removeIcon"
            onClick={() => onDelete(listing.id, listing.name)}
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
          </svg>
        )}
        {onEdit && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#000000"
            className="editIcon"
            onClick={() => onEdit(listing.id, listing.name)}
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
          </svg>
        )}
      </div>
    </li>
  );
};

export default ListingItems;
