"use client"

import { calculatePageNumbers } from '@/lib/helpers';
import { cn } from '@/lib/utils';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';
import React from 'react'


type Props = {
    totalPages: number;
    currentPage: number;
    pageNeighbors?: number;
    className?: string;
}

const Pagination = ({
    totalPages,
    currentPage,
    pageNeighbors = 2,
    className = '',
  }: Props
) => {

    const pageNumbers = calculatePageNumbers({
        pageNeighbors,
        totalPages,
        currentPage,
    });

  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
        {/* previous page button */}
        {currentPage !== 1 && (
            <button className='bg-slate-200 px-3 py-2 rounded-md'>
                <Link href={`?page=${currentPage-1}`}>
                    <ChevronLeftIcon className='w-6 h-6' />
                </Link>
            </button>
        )}

        {pageNumbers.map((page, index) => (
            <button key={index} className={cn('px-3 py-1 rounded-md transition hover:text-sky-600', {
                'bg-slate-200': page !== currentPage && page !== '...',
                'bg-blue-500 text-white': page === currentPage,
            })}>
                {page === "..." 
                    ? "..." 
                    :   <Link href={`?page=${page}`}>
                            {page}
                        </Link> 
                }
            </button>
        ))}

        {/* next page button */}
        {currentPage !== totalPages && (
            <button className='bg-slate-200 px-3 py-2 rounded-md' onClick={() => {}}>
                <Link href={`?page=${
                    currentPage + 1
                }`}>
                    <ChevronRightIcon className='w-6 h-6' />
                </Link>
            </button>
        )}
    </div>
  )
}

export default Pagination