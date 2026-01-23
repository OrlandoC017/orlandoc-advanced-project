// Book Page Layout //

"use client";

import React, { useEffect, useState } from "react";
import Searchbar from "../../components/searchbar";
import Sidebar from "../../components/sidebar";
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
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";
import { SkeletonBookPage } from "../../components/SkeletonLoader";

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
  const [audioDuration, setAudioDuration] = useState<string>("Loading...");
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const params = useParams();
  const router = useRouter();
  const { isLoggedIn, userPlan } = useAuth();
  const bookId = (params as { bookId: string }).bookId;

  const handleBookmarkClick = () => {
    setIsAdded(!isAdded);
  };

  const getButtonHref = (): string => {
    if (book?.subscriptionRequired && userPlan !== 'premium') {
      return '/choose-plan';
    }
    return `/player/${bookId}`;
  };

  useEffect(() => {
    if (!bookId) return;

    const fetchBooks = async () => {
      try {
        const API_URL = `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${bookId}`;
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

        // Check if book requires subscription and user is not logged in
        if (data.subscriptionRequired && !isLoggedIn) {
          router.push("/choose-plan");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setLoading(false);
      }
    };

    fetchBooks();
  }, [bookId]);

  useEffect(() => {
    if (book?.audioLink && audioRef.current) {
      const audio = audioRef.current;
      
      const handleLoadedMetadata = () => {
        const duration = audio.duration;
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        setAudioDuration(`${minutes} min ${seconds} sec`);
      };

      audio.src = book.audioLink;
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
      
      return () => {
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      };
    }
  }, [book?.audioLink]);

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
      <audio ref={audioRef} style={{ display: 'none' }} />
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
                    {audioDuration}
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
                  <Link href={getButtonHref()} className="inner-book__read--btn">
                    <BookOpenText />
                    Read
                  </Link>
                  <Link href={getButtonHref()} className="inner-book__read--btn">
                    <Headphones />
                    Listen
                  </Link>
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

                <div className="inner-book__tags--wrapper">
                  {book.tags.map((tag, index) => (
                    <span key={index} className="inner-book__tag">
                      {tag}
                    </span>
                  ))}
                </div>

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
