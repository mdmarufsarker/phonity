import React, { useState, useEffect } from "react";
import Hero from "../components/Layout/Hero";
import NewArrivals from "../components/Products/NewArrivals";
import ProductDetails from "../components/Products/ProductDetails";
import ProductGrid from "../components/Products/ProductGrid";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeaturedSection from "../components/Products/FeaturedSection";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productsSlice";
import axios from "axios";
import SearchPhone from "../components/Products/SearchPhone";
import FeaturedServices from "../components/Products/FeaturedServices";
import FeaturedBrands from "../components/Products/FeaturedBrands";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {
    dispatch(
      fetchProductsByFilters({
        gender: "Women",
        category: "Bottom Wear",
        limit: 8,
      })
    );

    // fetch best seller products
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/products/best-seller`
        );
        setBestSellerProduct(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBestSeller();
  }, [dispatch]);
  return (
    <div>
      <Hero />
      {/* <SearchPhone /> */}
      <FeaturedBrands />
      <NewArrivals />

      {/* Best Seller Section */}
      <h2 className="text-3xl text-center font-bold my-8">Best Seller</h2>
      {bestSellerProduct ? (
        <ProductDetails productId={bestSellerProduct._id} />
      ) : (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 text-center">
            Loading best seller product...
          </p>
        </div>
      )}
      {/* <ProductDetails /> */}
      {/* <FeaturedServices /> */}
    </div>
  );
};

export default Home;
