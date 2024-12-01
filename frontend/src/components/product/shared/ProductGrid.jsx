import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { motion, useInView } from "framer-motion";
import StarRating from "@/components/product/shared/StarRating";
import defaultImage from "@/assets/bestSellingAssets/droid.png";

const ProductGrid = ({ title, products, baseUrl, animations }) => {
  const navigate = useNavigate();
  const ref = React.useRef(null);

  const isInView = useInView(ref, {
    once: true,
    amount: 0.2,
  });

  const handleViewAll = () => {
    // Extract the category from baseUrl (e.g., "best-selling" or "latest-product")
    const category = baseUrl.replace('/', '');
    
    // Navigate to Products page with the category in the URL
    navigate(`/products?category=${category}`);
  };

  const handleViewDetails = (productId) => {
    navigate(`${baseUrl}/${productId}`);
  };

  return (
    <section ref={ref} className="p-4">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-3xl text-gray-300 font-extrabold mb-4 text-center pt-6 header-text"
      >
        {title}
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex items-center justify-center pb-10"
      >
        <button 
          onClick={handleViewAll}
          className="py-2 px-6 rounded-md text-white font-semibold bg-red-600 hover:bg-red-700"
        >
          View All
        </button>
      </motion.div>

      <motion.div
        variants={animations.containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 py-5"
      >
        {products?.slice(0, 4).map((product, index) => (
          <motion.div
            key={index}
            variants={animations.cardVariants}
            custom={index}
          >
            <Card
              key={product.id}
              className="bg-brand-gradient text-white border border-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group flex flex-col h-full"
            >
              <div className="relative overflow-hidden aspect-square">
                <img
                  src={product?.product_images?.[0]?.url || defaultImage}
                  alt={product.product_name}
                  className="w-full aspect-square transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                {/* View Details Button */}
                <button
                  onClick={() => handleViewDetails(product._id)}
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-6 py-2 rounded-md transition-all duration-300 ease-in-out"
                >
                  View Details
                </button>
              </div>

              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors min-h-[2.5rem]">
                  {product.product_name}
                </h3>
                <div className="flex items-center justify-between mt-auto pt-5">
                  <p className="text-red-500 font-bold text-xl">
                    ${product.price}
                  </p>

                  {/* Star Rating */}
                  <div className="flex items-center space-x-2">
                    <StarRating rating={product.ratings} />
                    <span className="text-sm text-gray-300">
                      ({product.ratings})
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default ProductGrid;