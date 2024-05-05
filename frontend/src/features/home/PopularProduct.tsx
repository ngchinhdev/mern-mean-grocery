import ProductList from "../../ui/ProductList";

export default function PopularProduct() {
  return (
    <section className="bg-gray-50 px-3 py-10 text-center sm:px-10 lg:py-16">
      <div className="mx-auto max-w-screen-2xl">
        <div className="mx-auto lg:w-3/4 xl:w-2/4">
          <h2 className="mb-2 text-xl font-semibold lg:text-2xl">
            Popular Products for Daily Shopping
          </h2>
          <p className="text-base leading-6 text-gray-600">
            See all our popular products in this week. You can choose your daily
            needs products from this list and get some special offer with free
            shipping.
          </p>
        </div>
        <ProductList />
      </div>
    </section>
  );
}
