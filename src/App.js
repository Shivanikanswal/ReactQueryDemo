import React, { useState } from "react";
import { useQuery, useQueryClient } from "react-query";

const fetchBookInfo = async (bookTitle) => {
  // Mocking an API response based on the book title
  const books = {
    "The Hobbit": {
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      rating: 4.5,
      description:
        "J.R.R. Tolkien's classic prelude to his Lord of the Rings trilogy...",
      excerpt:
        "Bilbo Baggins is a hobbit who enjoys a comfortable, unambitious life...",
    },
    1984: {
      title: "1984",
      author: "George Orwell",
      rating: 4.8,
      description:
        "A dystopian social science fiction novel and cautionary tale...",
      excerpt:
        "Winston Smith lives in a world of perpetual war, surveillance...",
    },
  };

  return new Promise((resolve) => {
    setTimeout(() => resolve(books[bookTitle]), 500); // Simulating network delay
  });
};

const App = () => {
  const [selectedBook, setSelectedBook] = useState("The Hobbit");
  const queryClient = useQueryClient();

  const { data: book, isLoading } = useQuery(
    ["bookInfo", selectedBook],
    () => fetchBookInfo(selectedBook),
    {
      enabled: !!selectedBook,
    }
  );
  const handleBookChange = (event) => {
    setSelectedBook(event.target.value);
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        maxWidth: "400px",
        backgroundColor: "#333",
        color: "#eee",
      }}
    >
      <h2>QUERY LIBRARY</h2>

      <select
        onChange={handleBookChange}
        value={selectedBook}
        style={{ marginBottom: "20px", padding: "5px" }}
      >
        <option value="The Hobbit">The Hobbit</option>
        <option value="1984">1984</option>
      </select>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        book && (
          <div
            style={{
              backgroundColor: "#222",
              padding: "20px",
              borderRadius: "5px",
            }}
          >
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p>⭐ {book.rating} / 5</p>
            <p>{book.description}</p>
            <p>{book.excerpt}</p>
            <button style={{ marginTop: "10px", padding: "5px 10px" }}>
              Update Rating
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default App;
