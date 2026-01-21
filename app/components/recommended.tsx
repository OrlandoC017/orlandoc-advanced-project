"use client"

import React, { useState, useEffect, ReactNode } from 'react'
import Link from "next/link";
import { CirclePlay } from 'lucide-react';

const API_URL = 'https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected'

interface Book {
  subTitle: ReactNode;
  id: string
  title: string
  author: string
  subtitle: string
  imageLink: string
  duration?: string
}

export default function Selected() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(API_URL)
        if (!response.ok) {
          throw new Error('Failed to fetch books')
        }
        const data = await response.json()
        setBooks(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  if (loading) return null
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <div className="row">
        <h2 className="landing__title">Selected just for You</h2>
        {books.map((book) => (
          <Link key={book.id} href={`/book/${book.id}?title=${encodeURIComponent(book.title)}&author=${encodeURIComponent(book.author)}&subtitle=${encodeURIComponent(book.subtitle)}`} className='selected-book'>
            <div className="recommended__book--wrapper">
              <figcaption className="recommended__book--caption">
                <h3 className="recommended__book--subtitle">"{book.subTitle}"</h3>
              </figcaption>

              <div className="recommended__book--content">
                <figure className="recommended__book--figure">
                  <div className="book__image--wrapper">
                    <img src={book.imageLink} alt={book.title} className="recommended__book--image"/>
                  </div>
                </figure>

                <div className="recommended__book--info">
                  <h3 className="recommended__book--title">{book.title}</h3>
                  <p className="">{book.author}</p>
                  <div className="flex align-items-center gap-2 mt-10px ">
                    <CirclePlay />
                    <p className='text-nowrap'>{book.duration || '3 mins 23 seconds'}</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
