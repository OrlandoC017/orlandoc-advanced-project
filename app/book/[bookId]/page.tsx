// Book Page Layout //

"use client";

import React, { useEffect, useState } from "react";
import Searchbar from "../../components/searchbar";
import Sidebar from "../../components/sidebar";
import { SkeletonBookPage } from "../../components/SkeletonLoader";
import "../[bookId]/style.css";
import {
  Bookmark,
  BookmarkCheck,
  BookOpenText,
  Clock,
  Headphones,
  LightbulbIcon,
  Mic,
  Star,
} from "lucide-react";
import { BiMicrophone } from "react-icons/bi";
import { useParams } from "next/navigation";

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

export default function page() {
  const [isAdded, setIsAdded] = useState(false);
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();

  const handleBookmarkClick = () => {
    setIsAdded(!isAdded);
  };

  useEffect(() => {
    if (!id) return;

    const fetchBooks = async () => {
      try {
        const API_URL = `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

        const response = await fetch(API_URL, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        const data = await response.json();
        setBook(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setLoading(false);
      }
    };

    fetchBooks();
  }, [id]);

  if (loading) {
    return (
      <div>
        <Searchbar />
        <Sidebar />
        <main>
          <section id="features">
            <div className="row inner-row">
              <SkeletonBookPage />
            </div>
          </section>
        </main>
      </div>
    );
  }
  if (error) return <div>Error: {error}</div>;
  if (!book) return <div>No book data found</div>;

  return (
    <div>
      <Searchbar />
      <Sidebar />
      <main>
        <section id="features">
          <div className="row inner-row">
            <div className="inner-wrapper">
              <div className="book__main-info">
                <h1 className="text-gray-900 mb-4 font-semibold text-5xl">
                  {book.title}
                </h1>
                <h3 className="text-gray-900 mb-4 font-semibold text-3xl">
                  {book.author}
                </h3>
                <h3 className="text-lg">
                  <i>{book.subTitle}</i>
                </h3>
                <div className="inner__book-description--wrapper">
                  <div className="inner__book-description">
                    <Star />
                    {book.averageRating} ({book.totalRating} ratings)
                  </div>
                  <div className="inner__book-description">
                    <Clock />
                    Audio Runtime
                  </div>
                  <div className="inner__book-description">
                    <Mic />
                    {book.type}
                  </div>
                  <div className="inner__book-description">
                    <LightbulbIcon />
                    {book.keyIdeas} Key Ideas
                  </div>
                </div>
                <div className="inner__book-button--wrapper">
                  <button className="inner-book__read--btn">
                    <BookOpenText />
                    Read
                  </button>
                  <button className="inner-book__read--btn">
                    <Headphones />
                    Listen
                  </button>
                </div>

                <button
                  className="inner-book__bookmark"
                  onClick={handleBookmarkClick}
                >
                  {isAdded ? <BookmarkCheck /> : <Bookmark />}{" "}
                  {isAdded
                    ? "Title added to library"
                    : "Add Title to My Library"}
                </button>

                <div className="inner-book__about">
                  <h2 className="text-gray-900 mb-4 font-semibold text-3xl">
                    About this book
                  </h2>
                  <p>{book.bookDescription}</p>
                </div>

                <div className="inner-book__about">
                  <h2 className="text-gray-900 mb-4 font-semibold text-3xl">
                    About the author
                  </h2>
                  <p>{book.authorDescription}</p>
                </div>
              </div>
            </div>
            <div className="inner-book__img--wrapper">
              <img
                src={book.imageLink}
                alt={book.title}
                className="book__image"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
