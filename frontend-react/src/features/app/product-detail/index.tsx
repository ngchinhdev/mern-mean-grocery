import Detail from "./Detail";
import Images from "./Images";
import Navigation from "./Navigation";
import Promotion from "./Promotion";
import RelatedProducts from "./RelatedProducts";

export default function ProductDetailFeature() {
  return (
    <div className="bg-gray-50">
      <div className="px-0 py-10 lg:py-10">
        <div className="mx-auto max-w-screen-2xl px-3 lg:px-10">
          <Navigation />
          <div className="w-full rounded-lg bg-white p-3 lg:p-12">
            <div className="flex flex-col xl:flex-row">
              <Images />
              <div className="w-full">
                <div className="flex flex-col md:flex-row">
                  <Detail />
                  <Promotion />
                </div>
              </div>
            </div>
          </div>
          <div className="pt-10 lg:pb-10 lg:pt-20">
            <RelatedProducts />
          </div>
        </div>
      </div>
    </div>
  );
}
