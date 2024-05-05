import Button from "../../ui/Button";

import deliveryMan from "../../assets/delivery-boy.webp";

export default function DownloadApp() {
  return (
    <section className="bg-gray-50 px-3 py-6 sm:px-10">
      <div className="mx-auto max-w-screen-2xl rounded-lg bg-primary-600 p-6 lg:p-16">
        <div className="flex items-center gap-3 rounded-lg bg-white px-6 py-8">
          <div className="flex-1">
            <span className="">Organic Products and Food</span>
            <h2 className="mb-2 text-lg font-bold lg:text-2xl">
              Quick Delivery to Your Home
            </h2>
            <p className="mb-5 text-sm">
              There are many products you will find in our shop, Choose your
              daily necessary product from our KachaBazar shop and get some
              special offers. See Our latest discounted products from here and
              get a special discount.
            </p>
            <Button to="/" type="primary">
              Download App
            </Button>
          </div>
          <div>
            <img src={deliveryMan} alt="" className="hidden w-full lg:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
