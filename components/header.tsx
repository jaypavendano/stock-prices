import Image from 'next/image';
import { CompanyInfo, Quote } from '@/app/company/[symbol]/page';

export default function Header({
  quote,
  details,
}: {
  quote: Quote;
  details: CompanyInfo;
}) {
  const isUp = quote.change > 0 ? true : false;
  return (
    <div className="flex flex-wrap justify-between items-center">
      <div className="flex items-center gap-1 md:gap-3">
        <div className="h-10 md:h-12 aspect-square rounded-full overflow-hidden relative">
          <Image
            src={details.image}
            alt={details.companyName}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{
              objectFit: 'cover',
            }}
            className="p-2"
          />
        </div>
        <div className="font-semibold">
          <h1 className="text-lg md:text-2xl">{details.companyName}</h1>
          <p className="text-muted-foreground text-sm">{details.symbol}</p>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-bold text-2xl lg:text-3xl flex items-start">
          <span className="text-sm md:text-base text-muted-foreground pr-1">
            {details.currency}
          </span>
          <span>{quote.price}</span>
        </p>
        <div
          className={`flex items-center ${
            isUp ? 'text-green-500' : 'text-red-500'
          }`}
        >
          <span className="text-sm font-medium">
            +{quote.change} ({quote.changesPercentage}%)
          </span>
        </div>
      </div>
    </div>
  );
}
