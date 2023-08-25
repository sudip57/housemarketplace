import { Link } from 'react-router-dom';
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg';
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg';
import Slider from '../components/Slider';

const Explore = () => {
  return (
    <div className="explore lg:m-[3rem] m-[1rem] xl:mb-[10rem] mb-[10rem]">
      <header>
        <p className="pageHeader">Explore</p>
      </header>
      <main>
        <Slider />
        <p className="exploreCategoryHeading font-bold mt-[3rem] ">
          Categories
        </p>
        <div className="exploreCategories">
          <Link to="/category/rent">
            <img
              src={rentCategoryImage}
              alt="rent"
              className="exploreCategoryImg"
            />
            <p className=" font-medium text-left">Places for Rent</p>
          </Link>
          <Link to="/category/sale">
            <img
              src={sellCategoryImage}
              alt="sell"
              className="exploreCategoryImg"
            />
            <p className="font-medium text-left">Places for Sale</p>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Explore;
