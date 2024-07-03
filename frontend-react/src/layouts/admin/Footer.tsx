export default function Footer() {
  return (
    <footer className="absolute bottom-0 flex h-16 w-full flex-auto items-center !bg-white px-4 sm:px-6 md:px-8">
      <div className="flex w-full flex-auto items-center justify-between">
        <span>
          Copyright © 2024 <span className="font-semibold">ngChinh</span> All
          rights reserved.
        </span>
        <div className="">
          <a className="text-gray" href="/#">
            Term &amp; Conditions
          </a>
          <span className="text-muted mx-2"> | </span>
          <a className="text-gray" href="/#">
            Privacy &amp; Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
