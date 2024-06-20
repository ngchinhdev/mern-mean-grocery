import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Detail from "./Detail";
import Images from "./Images";
import Navigation from "./Navigation";
import Promotion from "./Promotion";
import RelatedProducts from "./RelatedProducts";
import {
  getProductById,
  getProductsByCategoryId,
} from "src/services/apiProducts";
import NotFound from "src/ui/NotFound";
import Loader from "src/ui/Loader";

export default function ProductDetailFeature() {
  const { productId } = useParams();

  const {
    data: product,
    error: errorProduct,
    isLoading,
  } = useQuery({
    queryKey: [`productDetail-${productId}`, productId],
    queryFn: () => getProductById(productId || "not-found"),
  });

  const { data: relatedProducts, error: errorRelatedProduct } = useQuery({
    queryKey: [`relatedProducts-${product?.categoryId._id}`],
    queryFn: () =>
      getProductsByCategoryId(product?.categoryId._id || "not-found"),
  });

  return (
    <>
      {errorProduct || !product ? (
        <NotFound message="Product not found" />
      ) : isLoading ? (
        <Loader />
      ) : (
        <div className="bg-gray-50">
          <div className="px-0 py-10 lg:py-10">
            <div className="mx-auto max-w-screen-2xl px-3 lg:px-10">
              <Navigation product={product} />
              <div className="w-full rounded-lg bg-white p-3 lg:p-12">
                <div className="flex flex-col xl:flex-row">
                  <Images images={product.images} />
                  <div className="mt-4 w-full lg:mt-4">
                    <div className="flex flex-col md:flex-row">
                      <Detail product={product} />
                      <Promotion />
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-10 lg:pb-10 lg:pt-20">
                <RelatedProducts
                  error={errorRelatedProduct}
                  products={relatedProducts?.filter(
                    (p) => p._id !== product._id,
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
