import Products from "./Products";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Navbars from "../Components/Navbars";
import { Container, Row, Col } from "react-bootstrap";
import "./ProductsDetailPage.css";
import { MoveLeft, Plus, Minus } from "lucide-react";
import { CirclesWithBar } from "react-loader-spinner";

function ProductsDetailPage() {
  const [prod, setDetailProd] = useState([]);
  const [similar_products, setSimilarProd] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [counter, SetCounter] = useState(1);

  const params = useParams();
  const { id } = params;
  // console.log(id);
  // console.log(params);

  const getProductDetails = async () => {
    try {
      const jwtToken = Cookies.get("jwt_token");

      const apiUrl = "https://apis.ccbp.in/products/" + `${id}`;

      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: "GET",
      };

      const response = await fetch(apiUrl, options);
      const data = await response.json();

      setDetailProd(data);
      console.log(data.similar_products);
      setSimilarProd(data.similar_products);
      //this code is written by Saurabh Rauniyar

      // setProducts(data.products);
      // console.log(data);
      console.log(data);
      setIsLoading(false);

      // console.log(data.id);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  return (
    <>
      <Navbars />
      <Container>
        <Row>
          <Col>
            {isLoading ? (
              <div className="loader">
                <CirclesWithBar /> {/*loader added here  */}
              </div>
            ) : (
              <>
                <div className=" back-button">
                  <Link to={`/products`} className="back-button">
                    <button className="btn btn-secondary">
                      {<MoveLeft />}
                    </button>
                  </Link>
                </div>
                <div className="product-detailed-container d-flex">
                  <div key={prod.id} className="product_detailed ">
                    <img
                      src={prod.image_url}
                      alt="product_images"
                      className="detailed-view-image"
                    />
                  </div>
                  <div className="brand-conatiner-1 d-none d-lg-block  ">
                    <h2 className="product-name"> {prod.title}</h2>
                    <p className="price"> {`₹ ${prod.price}`}</p>
                    <div className="rating-reviews-con">
                      <div className="rating-conatiner">
                        <p className="ratings"> {`${prod.rating} ⭐`}</p>
                      </div>
                      <p className="reviwes">
                        {`${prod.total_reviews} Reviews`}{" "}
                      </p>
                    </div>

                    <p className="product-description"> {prod.description}</p>
                    <p className="available-product">
                      {` Available : ${prod.availability}`}
                    </p>
                    <p className="brand-section">{`Brand: ${prod.brand}`}</p>
                    <hr className="line" />
                    <div className="counter-conatiner d-flex">
                      <div>
                        <Minus
                          className="min"
                          onClick={() => {
                            if (counter > 1) {
                              SetCounter(counter - 1);
                            }
                          }}
                        />
                        <p className="counternum"> {counter}</p>
                      </div>
                      <Plus
                        className="min"
                        onClick={() => {
                          if (counter < 9) {
                            SetCounter(counter + 1);
                          }
                        }}
                      />
                    </div>
                    <div>
                      <Link to={"/carts"}>
                        <button className="btn btn-primary">Add to cart</button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="brand-conatiner-mob d-block d-lg-none  ">
                    <h2 className="product-name"> {prod.title}</h2>
                    <p className="price"> {`₹ ${prod.price}`}</p>
                    <div className="rating-reviews-con">
                      <div className="rating-conatiner">
                        <p className="ratings"> {`${prod.rating} ⭐`}</p>
                      </div>
                      <p className="reviwes">
                        {`${prod.total_reviews} Reviews`}
                      </p>
                    </div>

                    <p className="product-description"> {prod.description}</p>
                    <p className="available-product">
                      {` Available : ${prod.availability}`}
                    </p>
                    <p className="brand-section">{`Brand: ${prod.brand}`}</p>
                    <hr className="line" />
                    <div className="counter-conatiner d-flex">
                      <div>
                        <Minus
                          className="min"
                          onClick={() => {
                            if (counter > 1) {
                              SetCounter(counter - 1);
                            }
                          }}
                        />
                        <p className="counternum"> {counter}</p>
                      </div>
                      <Plus
                        className="min"
                        onClick={() => {
                          if (counter < 9) {
                            SetCounter(counter + 1);
                          }
                        }}
                      />
                    </div>
                    <div className="mt-2 ">
                      <Link to={"/carts"}>
                        <button className="btn btn-primary">Add to cart</button>
                      </Link>
                    </div>
                  </div>
                </div>
                <br />
                <h2 className=" brand-section"> Similar Products</h2>
                <div className="prods">
                  {similar_products.map((item, index) => {
                    const { image_url, price, rating, title, brand } = item;

                    return (
                      <div key={index}>
                        <div className="product-container pb-3">
                          <img src={image_url} alt="" className="map-image" />
                          <div className="card-body">
                            <h5 className="card-title text-center pt-2">
                              {title.substr(0, 30)}
                            </h5>
                            <p className="card-text text-center">{`by ${brand}`}</p>

                            <p className="text-center price">{`₹ ${price}`}</p>
                            <div className="rating-container">
                              <p className="ratings text-center">{`${rating} ⭐`}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ProductsDetailPage;
