'use client';

import { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { search, SearchResponse } from '@/app/api';
import Link from 'next/link';
import { BiSearch } from 'react-icons/bi';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<SearchResponse[]>([]);

  const handleFetchData = async () => {
    try {
      setData([]);
      const data = await search(searchQuery);
      setData(data);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    // wait 600ms after the user stops typing before calling `handleFetchData`.
    // If `searchQuery` changes within those 600ms, reset the timer.

    const handler = setTimeout(() => {
      if (searchQuery) {
        handleFetchData();
      }
    }, 600);

    return () => {
      clearTimeout(handler); // Clear the timer if `searchQuery` changes before 600ms.
    };
  }, [searchQuery]);

  return (
    <div className="space-y-2 relative">
      <div className="relative">
        <BiSearch className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          onChange={(e) => {
            setIsLoading(true);
            setSearchQuery(e.target.value);
          }}
          type="search"
          placeholder="Search for stock symbol..."
          className="h-12 w-full rounded-full border border-input bg-background pl-12 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>
      {searchQuery && (
        <div className="absolute left-0 right-0 bg-background drop-shadow-2xl rounded-xl border">
          <ScrollArea className="flex max-h-40 flex-col overflow-y-auto">
            {isLoading ? (
              <p className="text-sm px-2 py-4  italic text-muted-foreground">
                searching...
              </p>
            ) : data.length > 0 ? (
              <ul className="p-2">
                {data.map((item, i) => (
                  <Link key={i} href={`/company/${item.symbol}`}>
                    {' '}
                    <li className="text-sm flex justify-between p-2 transition-colors hover:bg-muted rounded-md cursor-pointer">
                      <span>{item.symbol}</span>
                      <span>{item.name}</span>
                    </li>
                  </Link>
                ))}
              </ul>
            ) : (
              <p className="text-sm px-2 py-4  italic text-muted-foreground">
                no result found
              </p>
            )}
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
