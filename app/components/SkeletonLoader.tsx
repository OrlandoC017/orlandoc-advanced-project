import React from "react";
import "../components/SkeletonLoader.css";

export const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton-image"></div>
    <div className="skeleton-title"></div>
    <div className="skeleton-author"></div>
  </div>
);

export const SkeletonHeroSection = () => (
  <div className="skeleton-hero">
    <div className="skeleton-hero-content">
      <div className="skeleton-hero-title"></div>
      <div className="skeleton-hero-subtitle"></div>
      <div className="skeleton-hero-buttons">
        <div className="skeleton-button"></div>
        <div className="skeleton-button"></div>
      </div>
    </div>
    <div className="skeleton-hero-image"></div>
  </div>
);

export const SkeletonScrollSection = () => (
  <div className="skeleton-scroll-section">
    <div className="skeleton-section-title"></div>
    <div className="skeleton-scroll-container">
      {[...Array(4)].map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  </div>
);

export const SkeletonSelectedBook = () => (
  <div className="skeleton-selected-book">
    <div className="skeleton-selected-caption"></div>
    <div className="skeleton-selected-content">
      <div className="skeleton-selected-image"></div>
      <div className="skeleton-selected-info">
        <div className="skeleton-selected-title"></div>
        <div className="skeleton-selected-author"></div>
        <div className="skeleton-selected-duration"></div>
      </div>
    </div>
  </div>
);

export const SkeletonBookCard = () => (
  <div className="skeleton-book-card">
    <div className="skeleton-card-image"></div>
    <div className="skeleton-card-title"></div>
    <div className="skeleton-card-subtitle"></div>
    <div className="skeleton-card-rating"></div>
  </div>
);

export const SkeletonBookLink = () => (
  <div className="for-you__books--link skeleton-book-link">
    <div className="skeleton-card-image"></div>
    <div className="skeleton-card-title"></div>
    <div className="skeleton-card-author"></div>
    <div className="skeleton-card-subtitle"></div>
    <div className="skeleton-books-stats"></div>
  </div>
);

export const SkeletonBooksSection = () => (
  <div className="for-you__books">
    {[...Array(5)].map((_, i) => (
      <SkeletonBookLink key={i} />
    ))}
  </div>
);

export const SkeletonForYouPage = () => (
  <div className="skeleton-for-you-page">
    <div className="for-you-section">
      <div className="row">
        <div className="skeleton-section-heading"></div>
        <SkeletonSelectedBook />
      </div>
    </div>
    
    <div className="for-you-section">
      <div className="skeleton-heading-text">
        <div className="skeleton-section-title"></div>
        <div className="skeleton-section-subtitle"></div>
      </div>
      <div className="skeleton-books-grid">
        {[...Array(4)].map((_, i) => (
          <SkeletonBookCard key={i} />
        ))}
      </div>
    </div>

    <div className="for-you-section">
      <div className="skeleton-heading-text">
        <div className="skeleton-section-title"></div>
        <div className="skeleton-section-subtitle"></div>
      </div>
      <div className="skeleton-books-grid">
        {[...Array(4)].map((_, i) => (
          <SkeletonBookCard key={i} />
        ))}
      </div>
    </div>
  </div>
);

export const SkeletonBookPage = () => (
  <>
    <div className="inner-wrapper">
      <div className="book__main-info">
        <div className="skeleton-book-title"></div>
        <div className="skeleton-book-author"></div>
        <div className="skeleton-book-subtitle"></div>
        <div className="inner__book-description--wrapper">
          <div className="skeleton-book-description-item"></div>
          <div className="skeleton-book-description-item"></div>
          <div className="skeleton-book-description-item"></div>
          <div className="skeleton-book-description-item"></div>
        </div>
        <div className="inner__book-button--wrapper">
          <div className="skeleton-button"></div>
          <div className="skeleton-button"></div>
        </div>
        <div className="skeleton-book-bookmark"></div>
        <div className="inner-book__about skeleton-about">
          <div className="skeleton-book-about-title"></div>
          <div className="skeleton-book-about-text"></div>
          <div className="skeleton-book-about-text"></div>
        </div>
        <div className="inner-book__about skeleton-about">
          <div className="skeleton-book-about-title"></div>
          <div className="skeleton-book-about-text"></div>
          <div className="skeleton-book-about-text"></div>
        </div>
      </div>
    </div>
    <div className="inner-book__img--wrapper">
      <div className="skeleton-book-image"></div>
    </div>
  </>
);
