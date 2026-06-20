# 🎬 CineWrapped
🌐 Live Demo - https://mahekk0.github.io/Cine-wrapped/

A data-driven movie analytics platform that transforms raw Letterboxd export data into an interactive personal cinema dashboard.

CineWrapped analyzes viewing habits, rating behavior, watch history, and long-term trends from a user's Letterboxd dataset and presents them through an elegant web-based analytics interface inspired by modern data visualization platforms and annual media recap experiences such as Spotify Wrapped.

---

## 🚀 Live Features

### Personal Analytics Dashboard

* Total Movies Watched
* Total Movies Rated
* Average Rating
* Favorite Decade
* Rewatch Count
* Most Active Year
* Most Active Month
* Longest Viewing Streak
* Personalized Movie Personality Classification

### Data Visualizations

#### Rating Distribution

Displays the distribution of ratings across all watched films, allowing users to analyze scoring tendencies and rating bias.

#### Movies By Year

Tracks movie release years across the user's viewing history to identify decade and era preferences.

#### Monthly Watch Activity

Visualizes viewing activity over time and highlights periods of increased engagement.

### Wrapped Summary

Generates a personalized cinematic profile based on historical viewing patterns and rating behavior.

Example classifications:

* The Cinephile
* The Explorer
* The Strategist
* The Critic
* The Realist

---

# System Architecture

```text
Letterboxd Export
        │
        ▼
CSV Dataset
(watched.csv,
 ratings.csv,
 diary.csv)
        │
        ▼
PapaParse CSV Engine
        │
        ▼
JavaScript Analytics Layer
        │
 ┌──────┼─────────────┐
 ▼      ▼             ▼
Stats  Charts     Personality
Engine Engine      Engine
        │
        ▼
Interactive Dashboard
```

---

# Dataset

The application processes the standard Letterboxd export package.

### watched.csv

Contains all watched films.

```csv
Date,Name,Year,Letterboxd URI
```

### ratings.csv

Contains user ratings.

```csv
Date,Name,Year,Letterboxd URI,Rating
```

### diary.csv

Contains detailed watch history.

```csv
Date,Name,Year,Letterboxd URI,Rating,Rewatch,Tags,Watched Date
```

---

# Technology Stack

## Frontend

### HTML5

Used for semantic page structure and dashboard layout.

### CSS3

Modern styling techniques including:

* CSS Grid
* Flexbox
* Responsive Layouts
* Glassmorphism Effects
* Gradient Backgrounds
* Hover Animations
* Mobile Optimization

### Vanilla JavaScript

Core application logic implemented without frontend frameworks.

Responsibilities include:

* Data Processing
* Statistical Analysis
* Trend Detection
* DOM Manipulation
* Dynamic Content Rendering

---

## Data Parsing

### PapaParse

CSV ingestion engine.

Features:

* Client-side parsing
* Header-based mapping
* Large dataset support
* Asynchronous processing

Example:

```javascript
Papa.parse(file,{
    download:true,
    header:true
})
```

---

## Visualization Layer

### Chart.js

Used to generate:

* Bar Charts
* Time-Series Charts
* Distribution Graphs

Provides:

* Responsive rendering
* Canvas-based visualization
* Dynamic dataset updates

---

# Core Analytics Engine

## Average Rating

Computed as:

```math
Average Rating =
Σ Ratings / Total Ratings
```

Complexity:

```text
O(n)
```

---

## Favorite Decade Detection

Movies are grouped by release decade.

Example:

```text
1994 → 1990s
2001 → 2000s
2014 → 2010s
```

The decade with maximum frequency is selected.

Complexity:

```text
O(n)
```

---

## Rewatch Analysis

Diary entries are scanned for rewatch indicators.

```javascript
movie.Rewatch !== ""
```

Complexity:

```text
O(n)
```

---

## Longest Viewing Streak

Algorithm:

1. Extract watch dates
2. Sort chronologically
3. Compare adjacent days
4. Track maximum consecutive sequence

Complexity:

```text
O(n log n)
```

Dominated by sorting.

---

## Personality Classification Engine

Users are classified based on aggregate rating behavior.

Example:

```text
Average ≥ 4.3
→ The Cinephile

Average ≥ 4.0
→ The Explorer

Average ≥ 3.5
→ The Strategist

Average ≥ 3.0
→ The Critic

Else
→ The Realist
```

---

# Performance Characteristics

Dataset tested with:

```text
1155+ watched films
1150+ ratings
280+ diary entries
```

All analytics execute client-side.

No backend infrastructure required.

No database required.

No server-side computation required.

---

# Project Structure

```text
cinewrapped/
│
├── data/
│   ├── watched.csv
│   ├── ratings.csv
│   └── diary.csv
│
├── screenshots/
│
├── index.html
├── style.css
├── script.js
│
├── README.md
└── .gitignore
```

---

# Installation

Clone repository:

```bash
git clone https://github.com/YOUR_USERNAME/cinewrapped.git
```

Navigate into project:

```bash
cd cinewrapped
```

Launch with Live Server or any static server.

Example:

```bash
npx serve
```

or

```bash
Open index.html with Live Server
```

---

# Design Principles

The project was designed around:

* Client-side processing
* Zero backend dependencies
* High-performance analytics
* Interactive visual storytelling
* Personal data exploration
* Responsive user experience

---

# Future Enhancements

### Planned Features

* Genre Analytics
* Director Analytics
* Watch Heatmaps
* Yearly Wrapped Reports
* Exportable Wrapped Cards
* Dark / Light Theme Toggle
* Movie Recommendation Engine
* TMDB Metadata Integration
* User Comparison Mode
* Machine Learning Based Taste Profiling

---

# Educational Value

This project demonstrates practical implementation of:

* Data Analytics
* Data Visualization
* CSV Processing
* JavaScript Algorithms
* Statistical Computation
* Responsive Web Design
* Frontend Architecture
* Client-Side Data Engineering

---

# Author

**Mahek Patel**

Built as a personal data analytics project using real-world Letterboxd export data.
