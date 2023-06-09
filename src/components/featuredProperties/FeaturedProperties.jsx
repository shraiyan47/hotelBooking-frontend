import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {

  // eslint-disable-next-line
  const { data, loading, error } = useFetch("/hotels?featured=true&limits=3")
  console.log(data)

  return (
    <div className="fp">
      {loading ? "LOADING..." :
        <>
          {data.map((item) => (

            <div className="fpItem" key={item._id}>
              <img
                src={item.photos[0]}
                alt=""
                className="fpImg"
              />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">Starting from : BDT {item.cheepestPrice}</span>
              {
                item.rating &&
                <div className="fpRating">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>
              }
            </div>
          ))}
        </>
      }

    </div>
  );
};

export default FeaturedProperties;
