"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Clock, StarIcon } from "lucide-react";

interface Book {
  id: string;
  author: string;
  title: string;
  subTitle: string;
  imageLink: string;
  audioLink: string;
  totalRating: number;
  averageRating: number;
  keyIdeas: number;
  type: string;
  status: string;
  subscriptionRequired: boolean;
  summary: string;
  tags: string[];
  bookDescription: string;
  authorDescription: string;
}

const API_URL = `https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested`;

export default function LibraryScrollSuggested() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        const data = await response.json();
        setBooks(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return null;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="heading__text">
        <h2 className="section__title mb-0.5">Suggested Books</h2>
        <h3 className="text-center">Discover books we think you'll love</h3>
      </div>

      <div className="for-you__books">
        {books.map((book) => (
          <Link
            key={book.id}
            href={`/book/${book.id}`}
            className="for-you__books--link flex flex-col justify-center items-center h-auto "
          >
            <div
              className="book__image--wrapper"
              style={{ position: "relative" }}
            >
              <img
                src={book.imageLink}
                alt={book.title}
                className="book__image"
              />
              {book.subscriptionRequired && (
                <span
                  style={{
                    position: "absolute",
                    top: "-15px",
                    right: "-12px",
                    backgroundColor: "#FFD700",
                    color: "#000",
                    padding: "4px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    zIndex: 10,
                  }}
                >
                  Premium
                </span>
              )}
            </div>
            <div className="for-you__books--title">
              <b>{book.title}</b>
            </div>
            <div className="for-you__books--author text-blue-500 font-bold">{book.author}</div>
            <div className="for-you__books--subtitle">
              <i>"{book.subTitle}"</i>
            </div>
            <div className="flex justify-evenly">
              <div className="flex items-center gap-2">
                <Clock />
                <span className="duration--time">{book.keyIdeas} Ideas</span>
              </div>
              <div className="flex items-center gap-2">
                <StarIcon />
                <span className="duration--time">{book.averageRating}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
