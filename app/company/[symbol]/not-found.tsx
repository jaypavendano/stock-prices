import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CustomStock404() {
  return (
    <div className="flex min-h-screen container flex-col items-center justify-center p-4 text-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <h1 className="mb-2 text-6xl font-bold text-foreground">404</h1>
      <p className="mb-4 text-2xl font-light text-muted-foreground">
        Oops! Stock Symbol Not Found
      </p>
      <p className="mb-8 text-lg text-gray-500">
        It looks like the stock symbol you're looking for isn't available.
        Please check the symbol and try again, or use our search feature to find
        the stock you’re interested in. If you believe this is an error, feel
        free to contact our support team for assistance.
      </p>
      <Link href="/" className="mb-4 inline-block text-sm" prefetch={false}>
        <Button variant="default">Go back home</Button>
      </Link>
    </div>
  );
}
