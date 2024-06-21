import { useEffect, useState } from "react";
import { CheckIcon, StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { Alert, Box, Button, Grid, LinearProgress, Rating } from "@mui/material";
import ProductReviewCard from "./ProductReviewCard";
import { color } from "./../Product/FilterData";
import { mens_kurta } from "../../../data/mens_kurta";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import { useNavigate, useParams } from "react-router-dom";
import { findProductById, findProducts } from "../../../State/Product/Action";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, getCart } from './../../../State/Cart/Action';
import './ProductDetails.css';

const product = {
  name: "Basic Tee 6-Pack",
  price: "$192",
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Men", href: "#" },
    { id: 2, name: "Clothing", href: "#" },
  ],
  images: [
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
      alt: "Model wearing plain white basic tee.",
    },
  ],
  colors: [
    { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  ],
  sizes: [
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};
const reviews = { href: "#", average: 4, totalCount: 117 };



function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const [selectedSize, setSelectedSize] = useState("");
  const { productId }=useParams();
  const dispatch = useDispatch();
  const { customersProduct } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  const [activeImage, setActiveImage] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const navigate=useNavigate();

  const handleAddToCart=()=>{
    const data = { productId, size: selectedSize.name };
    dispatch(addItemToCart({ data, jwt }));
    console.log("handle Add to cart", data,jwt);
    
    // navigate("/cart")
    setShowAlert(true);
  }
  const handleSetActiveImage = (image) => {
    setActiveImage(image);
  };



 

  



  useEffect(() => {
    const data = { productId: Number(productId), jwt };
    console.log("Manish ",productId,"jwt :",jwt)
    dispatch(findProductById(productId));
    // dispatch(getAllReviews(productId));
    dispatch(getCart())
  }, [productId],showAlert);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);

  const handleMouseMove = (e) => {
    const image = e.target;
    console.log("In")
    const { left, top, width, height } = image.getBoundingClientRect();
    const offsetX = (e.clientX - left) / width * 100;
    const offsetY = (e.clientY - top) / height * 100;
    setZoomPosition({ x: offsetX, y: offsetY });
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
    console.log(customersProduct.product)
    console.log(customersProduct.product?.category.parentCategory.parentCategory.name)
    console.log(customersProduct.product?.category.parentCategory.name)
    console.log(customersProduct.product?.category.name)

  };



  return (
    <div className="bg-white lg:px-16">
      <div className="pt-6">
        <nav onClick={()=>navigate(`/${customersProduct.product?.category.parentCategory.parentCategory.name}/${customersProduct.product?.category.parentCategory.name}/${customersProduct.product?.category.name}`)} aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8 cursor-pointer"
          >
            {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <p
                    
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {breadcrumb.name}
                  </p>
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <p
                
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {customersProduct.product?.category.name}
              </p>
            </li>
          </ol>
        </nav>
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10">
          {/* Image gallery */}
          <div className="flex flex-col items-center" >
            <div className="overflow-hidden rounded-lg lg:block max-w-[30rem] max-h-[35rem]"
            style={{ cursor: 'crosshair' }} onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}>
              <img
                src={activeImage?.src || customersProduct?.product?.imageUrl}
                alt={product.images[0].alt}
                className="h-full w-full object-cover object-center"
                style={{ transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`, transform: isZoomed ? 'scale(2)' : 'scale(1)', transition: 'transform 0.3s ease' }}
              />
            </div>
            <div className="flex flex-wrap space-x-5 justify-center">
              
             
                
               
              
            </div>
          </div>
          {/* Product info */}
          <div className="lg:col-span-1 maxt-auto max-w-2xl px-4 pb-16 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-24">
            <div className="lg:col-span-2">
              <h1 className="text-lg lg:text-xl font-semibold text-gray-900">
              {customersProduct.product?.brand}
              </h1>
              <h1 className="text-lg lg:text-xl text-gray-900 opacity-70 pt-1">
              {customersProduct.product?.title}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <div className="flex space-x-5 items-center text-lg lg:text-xl text-gray-900 mt-6">
                <p className="font-semibold">₹{customersProduct.product?.discountedPrice}</p>
                <p className="opacity-50 line-through">₹{customersProduct.product?.price}</p>
                <p className="text-green-600 font-semibold">{customersProduct.product?.discountPersent}% Off</p>
              </div>

              {/* Reviews */}
              <div className="mt-6">
                <div className="flex items-center space-x-3">
                  <Rating name="read-only" value={4.5} readOnly />
                  <p className="opacity-50 text-sm">5432 Ratings</p>
                  <p className="ml-3 text-sm font-medium text-indigo-700 hover:text-indigo-500">
                    432 Reviews
                  </p>
                </div>
              </div>

              <form className="mt-10">
                {/* Sizes */}
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  </div>

                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="mt-4"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a size
                    </RadioGroup.Label>
                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                      {product.sizes.map((size) => (
                        <RadioGroup.Option
                          key={size.name}
                          value={size}
                          disabled={!size.inStock}
                          className={({ active }) =>
                            classNames(
                              size.inStock
                                ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                : "cursor-not-allowed bg-gray-50 text-gray-200",
                              active ? "ring-2 ring-indigo-500" : "",
                              "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                            )
                          }
                        >
                          {({ active, checked }) => (
                            <>
                              <RadioGroup.Label as="span">
                                {size.name}
                              </RadioGroup.Label>
                              {size.inStock ? (
                                <span
                                  className={classNames(
                                    active ? "border" : "border-2",
                                    checked
                                      ? "border-indigo-500"
                                      : "border-transparent",
                                    "pointer-events-none absolute -inset-px rounded-md"
                                  )}
                                  aria-hidden="true"
                                />
                              ) : (
                                <span
                                  aria-hidden="true"
                                  className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                >
                                  <svg
                                    className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                    viewBox="0 0 100 100"
                                    preserveAspectRatio="none"
                                    stroke="currentColor"
                                  >
                                    <line
                                      x1={0}
                                      y1={100}
                                      x2={100}
                                      y2={0}
                                      vectorEffect="non-scaling-stroke"
                                    />
                                  </svg>
                                </span>
                              )}
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <Button onClick={handleAddToCart}
                  variant="contained"
                  sx={{
                    px: "2rem",
                    py: "1rem",
                    my: "2rem",
                    bgcolor: "#9155fd",
                    "&:hover": {
                      bgcolor: "#5931a8",
                    },
                  }}
                >
                  Add to Cart
                </Button>
              </form>
            </div>
            {showAlert && (
        <Alert
          className="top-alert"
          severity="success"
          onClose={() => setShowAlert(false)} // Close the alert when clicked
        >
          Item has been added to cart
        </Alert>
      )}

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                  {customersProduct.product?.description}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {product.highlights.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{product.details}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Rating and Reviews */}
        <section>
          <h1 className="font-semibold text-lg pb-4">Recent Review & Rating</h1>
          <div className="border p-5">
            <Grid container spacing={7}>
              <Grid item xs={7}>
                <div className="space-y-5">
                  {[1, 1, 1].map((item) => (
                    <ProductReviewCard />
                  ))}
                </div>
              </Grid>
              <Grid item xs={5}>
                <h1 className="text-wl font-semibold pb-2">Product rating</h1>
                <div className="flex items-center space-x-3">
                  <Rating value={3.6} precision={0.1} readOnly />
                  <p className="opacity-60">59678 Ratings</p>
                </div>

                <Box className="mt-10 space-y-3">
                  <Grid container alignItems="center" gap={2}>
                    <Grid item xs={2}>
                      <p>Excellent</p>
                    </Grid>
                    <Grid item xs={7}>
                      <LinearProgress
                        sx={{ bgcolor: "#d0d0d0", borderRadius: 7, height: 7 }}
                        variant="determinate"
                        value={60}
                        color="success"
                      />
                    </Grid>
                  </Grid>
                  <Grid container alignItems="center" gap={2}>
                    <Grid item xs={2}>
                      <p>Very Good</p>
                    </Grid>
                    <Grid item xs={7}>
                      <LinearProgress
                        sx={{
                          bgcolor: "#d0d0d0",
                          borderRadius: 7,
                          height: 7,
                          "& .MuiLinearProgress-bar": {
                            bgcolor: "#689f38",
                          },
                        }}
                        variant="determinate"
                        value={75}
                      />
                    </Grid>
                  </Grid>
                  <Grid container alignItems="center" gap={2}>
                    <Grid item xs={2}>
                      <p>Good</p>
                    </Grid>
                    <Grid item xs={7}>
                      <LinearProgress
                        sx={{
                          bgcolor: "#d0d0d0",
                          borderRadius: 7,
                          height: 7,
                          "& .MuiLinearProgress-bar": {
                            bgcolor: "#FFD700",
                          },
                        }}
                        variant="determinate"
                        value={50}
                        className="bg-yellow-500"
                      />
                    </Grid>
                  </Grid>
                  <Grid container alignItems="center" gap={2}>
                    <Grid item xs={2}>
                      <p>Average</p>
                    </Grid>
                    <Grid item xs={7}>
                      <LinearProgress
                        sx={{ bgcolor: "#d0d0d0", borderRadius: 7, height: 7 }}
                        variant="determinate"
                        value={15}
                        color="warning"
                      />
                    </Grid>
                  </Grid>
                  <Grid container alignItems="center" gap={2}>
                    <Grid item xs={2}>
                      <p>Poor</p>
                    </Grid>
                    <Grid item xs={7}>
                      <LinearProgress
                        sx={{ bgcolor: "#d0d0d0", borderRadius: 7, height: 7 }}
                        variant="determinate"
                        value={10}
                        color="error"
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </div>
        </section>
        {/* Similiar Product */}
        <section className="pt-10">
          <h1 className="py-5 text-xl font-bold">Similiar Products</h1>
          <div className="flex flex-wrap space-y-5">
            {mens_kurta.slice(0, 10).map((item) => (
              <HomeSectionCard product={item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
