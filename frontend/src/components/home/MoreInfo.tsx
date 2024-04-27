import appStoreImage from "../../assets/app-store_cyyc0f.svg";
import playStoreImage from "../../assets/play-store_cavwua.svg";

export default function MoreInfo() {
  return (
    <section className="overflow-hidden bg-indigo-50 bg-center bg-repeat px-3 py-10 text-center lg:py-16">
      <h3 className="mb-3 text-xl font-bold md:text-2xl lg:text-3xl">
        Get Your Daily Needs From Our KachaBazar Store
      </h3>
      <p className="mb-6 text-base leading-7 opacity-90">
        There are many products you will find in our shop, Choose your daily
        necessary product from our KachaBazar shop and get some special offers.
      </p>
      <div className="grid grid-cols-2 gap-2">
        <img src={appStoreImage} alt="" />
        <img src={playStoreImage} alt="" />
      </div>
    </section>
  );
}
