'use client';

import Link from 'next/link';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { ModeToggle } from './mode-toggle';
import { Button } from './ui/button';
import { BiSearch } from 'react-icons/bi';
import {
  CommandDialog,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command';
import { useEffect, useState } from 'react';
import { search, SearchResponse } from '@/app/api';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
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
    const handler = setTimeout(() => {
      if (searchQuery) {
        handleFetchData();
      }
    }, 600);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]); // eslint-disable-line

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <nav>
      <div className="container py-3 flex justify-between items-center">
        <Link href="/">
          <FaArrowLeftLong />
        </Link>
        <div className="flex items-center gap-x-2">
          <div>
            <Button
              className="flex items-center gap-x-1"
              onClick={() => {
                setIsOpen(true);
              }}
              variant="ghost"
            >
              <BiSearch className="text-lg" />
              <p>Search</p>
            </Button>
            <CommandDialog
              open={isOpen}
              onClose={handleClose}
              onInteractOutside={handleClose}
            >
              <CommandInput
                placeholder="Type a command or search..."
                onChange={(e) => {
                  setIsLoading(true);
                  setSearchQuery(e.target.value);
                }}
              />
              <CommandList>
                {searchQuery ? (
                  isLoading ? (
                    <p className="text-sm px-2 py-4  italic text-muted-foreground">
                      searching...
                    </p>
                  ) : data.length > 0 ? (
                    data.map((item, i) => (
                      <Link key={i} href={`/company/${item.symbol}`}>
                        <CommandItem className="flex justify-between cursor-pointer">
                          <p>{item.symbol}</p>
                          <span>{item.name}</span>
                        </CommandItem>
                      </Link>
                    ))
                  ) : (
                    <p className="text-sm px-2 py-4  italic text-muted-foreground">
                      no result found
                    </p>
                  )
                ) : (
                  <p className="text-sm px-2 py-4  italic text-muted-foreground">
                    start typing to see results..
                  </p>
                )}
              </CommandList>
            </CommandDialog>
          </div>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
