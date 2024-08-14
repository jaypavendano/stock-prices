import Navigation from '@/components/navigation';
import { notFound } from 'next/navigation';
import Header from '@/components/header';
import HistoryPriceChart from '@/components/history-price-chart';

export interface CompanyInfo {
  symbol: string;
  price: number;
  beta: number;
  volAvg: number;
  mktCap: number;
  lastDiv: number;
  range: string;
  changes: number;
  companyName: string;
  currency: string;
  cik: string;
  isin: string;
  cusip: string;
  exchange: string;
  exchangeShortName: string;
  industry: string;
  website: string;
  description: string;
  ceo: string;
  sector: string;
  country: string;
  fullTimeEmployees: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  dcfDiff: number;
  dcf: number;
  image: string;
  ipoDate: string;
  defaultImage: boolean;
  isEtf: boolean;
  isActivelyTrading: boolean;
  isAdr: boolean;
  isFund: boolean;
}

export type Quote = {
  symbol: string;
  name: string;
  price: number;
  changesPercentage: number;
  change: number;
  dayLow: number;
  dayHigh: number;
  yearHigh: number;
  yearLow: number;
  marketCap: number;
  priceAvg50: number;
  priceAvg200: number;
  exchange: string;
  volume: number;
  avgVolume: number;
  open: number;
  previousClose: number;
  eps: number;
  pe: number;
  earningsAnnouncement: string;
  sharesOutstanding: number;
  timestamp: number;
};

const getCompanyInfo = async (symbol: string): Promise<CompanyInfo[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/profile/${symbol}?apikey=${process.env.NEXT_PUBLIC_API_KEY}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  if (!res.ok) return notFound();
  return res.json();
};

const getQuote = async (symbol: string): Promise<Quote[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/quote/${symbol}?apikey=${process.env.NEXT_PUBLIC_API_KEY}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  // return notfound if return error code
  if (!res.ok) return notFound();
  return res.json();
};

export default async function Company({
  params: { symbol },
}: {
  params: { symbol: string };
}) {
  const details = await getCompanyInfo(symbol);

  if (details.length === 0) {
    return notFound();
  }

  const quote = await getQuote(symbol);

  return (
    <main>
      <Navigation />
      <section className="container my-8">
        <Header quote={quote[0]} details={details[0]} />
        <HistoryPriceChart symbol={symbol} />
      </section>
    </main>
  );
}
