// Book Page Layout //

"use client";

import React, { useEffect, useState } from "react";
import Searchbar from "../../components/searchbar";
import PlayerSidebar from "../../components/PlayerSidebar";
import MediaPlayer from "../../components/MediaPlayer";
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
  const [textSize, setTextSize] = useState<"small" | "medium" | "large">("medium");
  const params = useParams();
  const bookId = (params as { bookId: string }).bookId;

  const handleBookmarkClick = () => {
    setIsAdded(!isAdded);
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
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setLoading(false);
      }
    };

    fetchBooks();
  }, [bookId]);

  if (loading) {
    return (
      <div>
        <Searchbar />
        <PlayerSidebar textSize={textSize} onTextSizeChange={setTextSize} />
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
      <PlayerSidebar textSize={textSize} onTextSizeChange={setTextSize} />
      <main>
        <section id="player">
          <div className="row inner-row">
            <div className="inner-wrapper">
              <div className="book__main-info">
                <h1 className="text-gray-900 mb-4 font-semibold text-5xl">
                  {book.title}
                </h1>
                <h3 className="text-gray-900 mb-4 font-semibold text-3xl">
                  {book.author}
                </h3>
              </div>
            </div>
          </div>
          <div className="row">
            <p 
              className={`audio__book--summary-text audio__book--summary-text--${textSize}`}
            >
              {book.summary}
            </p>
          </div>
        </section>
      </main>
      <MediaPlayer 
        audioLink={book.audioLink} 
        title={book.title} 
        author={book.author}
        imageLink={book.imageLink}
      />
    </div>
  );
}
