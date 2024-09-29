"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { IconMenu2 } from "@tabler/icons-react";
import classNames from "classnames";

export const Header = () => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className="sticky top-0 z-50 w-full border-b transition-shadow duration-300 bg-white">
      <Container>
        <div className="relative flex h-16 justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <div
              className="relative cursor-pointer inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setIsOpened(!isOpened)}
            >
              <span className="sr-only">Open main menu</span>
              <IconMenu2 size={24} stroke={1.5} />
            </div>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Link href="/">
                <div className="flex items-center">
                  <div className="text-xl font-bold cursor-pointer">
                    withPayload
                  </div>
                  <div>
                    <div className="ml-2 block rounded-full bg-gray-700 px-1.5 py-0.5 text-xs font-semibold text-white">
                      Beta
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                Projects
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                Blog
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              data-tally-open="w7V8Xa"
              data-tally-layout="modal"
              data-tally-width="800"
              data-tally-emoji-text="🚀"
              data-tally-emoji-animation="wave"
            >
              Submit
            </Button>
          </div>
        </div>
      </Container>

      <div
        className={classNames("sm:hidden", {
          hidden: !isOpened,
          shadow: isOpened,
        })}
        id="mobile-menu"
      >
        <div className="space-y-1 pb-4 pt-2">
          <Link
            href="/"
            className="transition-all block border-l-4 border-transparent py-2 pl-8 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
          >
            Projects
          </Link>
          <Link
            href="/blog"
            className="transition-all block border-l-4 border-transparent py-2 pl-8 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
          >
            Blog
          </Link>
        </div>
      </div>
    </div>
  );
};
