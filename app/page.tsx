import { ModeToggle } from '@/components/mode-toggle';
import SearchBar from '@/components/search';

export default function Home() {
  return (
    <main>
      <div className="container relative">
        <div className="absolute z-50 top-2 right-2">
          <ModeToggle />
        </div>
      </div>
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <div className="mx-auto max-w-3xl h-screen flex flex-col content-center justify-center gap-y-5 px-5">
        <h1 className="text-3xl text-center font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Search for Stock Prices
        </h1>
        <SearchBar />
      </div>
    </main>
  );
}
