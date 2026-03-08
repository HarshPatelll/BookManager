"use client";

import { useEffect, useState, useRef } from "react";

interface Book {
  _id: string;
  title: string;
  author: string;
  tags?: string[];
  status: "want_to_read" | "reading" | "completed";
  image?: string;
}

interface User {
  email: string;
  name?: string;
}

export default function Dashboard() {
  const [books, setBooks] = useState<Book[]>([]);
//   const [user, setUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState<"want_to_read" | "reading" | "completed">("want_to_read");
  
  const [filter, setFilter] = useState("all");
  

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  

  // Fetch books
  async function fetchBooks() {
    if (!token) return;
    try {
      const res = await fetch("/api/Books", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setBooks(data || []);
    } catch (err) {
      console.log("[v0] Failed to fetch books:", err);
    }
  }

  useEffect(() => {
    
    fetchBooks();
  }, []);

  

  // Add or update book
  async function handleSaveBook(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !author) return;

    const body = {
  title,
  author,
  tags: tags ? tags.split(",").map(t => t.trim()) : [],
  status
};

    try {
      const method = editingBook ? "PUT" : "POST";
      const url = editingBook ? `/api/Books/${editingBook._id}` : "/api/Books";

     const res = await fetch(url, {
  method,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(body),
});

      if (res.ok) {
        resetForm();
        setIsModalOpen(false);
        fetchBooks();
      }
    } catch (err) {
      console.log("[v0] Failed to save book:", err);
    }
  }

  // Delete book
  async function deleteBook(id: string) {
    if (!confirm("Are you sure you want to delete this book?")) return;

    try {
      await fetch(`/api/Books/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchBooks();
    } catch (err) {
      console.log("[v0] Failed to delete book:", err);
    }
  }

  // Update status
  async function updateStatus(id: string, newStatus: string) {
    try {
      await fetch(`/api/Books/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchBooks();
    } catch (err) {
      console.log("[v0] Failed to update status:", err);
    }
  }

  // Reset form
  function resetForm() {
    setTitle("");
    setAuthor("");
    setTags("");
    setStatus("want_to_read");
    
    setEditingBook(null);
  }

  // Edit book
  function handleEditBook(book: Book) {
    setEditingBook(book);
    setTitle(book.title);
    setAuthor(book.author);
    setTags(book.tags?.join(", ") || "");
    setStatus(book.status);
    
    setIsModalOpen(true);
  }

  // Close modal
  function handleCloseModal() {
    setIsModalOpen(false);
    resetForm();
  }

  // Stats
  const total = books.length;
  const completed = books.filter((b) => b.status === "completed").length;
  const wantToRead = books.filter((b) => b.status === "want_to_read").length;
  const reading = books.filter((b) => b.status === "reading").length;
  const filteredBooks = filter === "all" ? books : books.filter((b) => b.status === filter);

  

  return (
    <div className="min-h-screen" style={{
      background: "linear-gradient(135deg, #faf9f7 0%, #f0e6f6 50%, #e8f4f8 100%)",
    }}>
      {/* Header */}
      <header className="border-b border-white/30 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#5a4a7a]">My Library</h1>

          <div className="flex items-center gap-4">
            {/* Avatar */}
            {/* <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm border-2 border-white shadow-md cursor-pointer hover:shadow-lg transition-shadow"
              style={{ backgroundColor: "#8b7fa8" }}
              title={user?.email || "User"}
            >
              {initials}
            </div> */}

            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
              className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
          {/* Left Sidebar - Stats */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/30 hover:shadow-md transition-shadow">
              <p className="text-sm text-[#8b7fa8] font-semibold mb-2">Total Books</p>
              <p className="text-4xl font-bold text-[#5a4a7a]">{total}</p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/30 hover:shadow-md transition-shadow">
              <p className="text-sm text-[#d4a574] font-semibold mb-2">Want to Read</p>
              <p className="text-4xl font-bold text-[#d4a574]">{wantToRead}</p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/30 hover:shadow-md transition-shadow">
              <p className="text-sm text-[#6b8fa8] font-semibold mb-2">Reading</p>
              <p className="text-4xl font-bold text-[#6b8fa8]">{reading}</p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/30 hover:shadow-md transition-shadow">
              <p className="text-sm text-[#4caf50] font-semibold mb-2">Completed</p>
              <p className="text-4xl font-bold text-[#4caf50]">{completed}</p>
            </div>

            <button
              onClick={() => {
                resetForm();
                setIsModalOpen(true);
              }}
              className="w-full mt-2 bg-gradient-to-r from-[#8b7fa8] to-[#6b8fa8] text-white rounded-lg py-2.5 font-semibold hover:shadow-lg transition-all"
            >
              + Add Book
            </button>
          </div>

          {/* Center - Books Grid */}
          <div className="lg:col-span-3">
            {/* Filter */}
            <div className="mb-6 flex gap-3 flex-wrap">
              {["all", "want_to_read", "reading", "completed"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filter === f
                      ? "bg-[#8b7fa8] text-white shadow-md"
                      : "bg-white/40 text-[#5a4a7a] hover:bg-white/60 border border-white/30"
                  }`}
                >
                  {f === "all" ? "All Books" : f === "want_to_read" ? "Want to Read" : f === "reading" ? "Reading" : "Completed"}
                </button>
              ))}
            </div>

            {/* Books Grid */}
            {filteredBooks.length === 0 ? (
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-12 text-center border border-white/30">
                <p className="text-[#8b7fa8] text-lg font-medium">No books found. Start building your collection!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredBooks.map((book) => (
                  <div
                    key={book._id}
                    className="bg-white/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/30 hover:shadow-lg transition-all group"
                  >
                    {/* Book Image */}
                    {book.image && (
                      <div className="h-40 bg-gradient-to-br from-[#8b7fa8] to-[#6b8fa8] overflow-hidden relative">
                        <img
                          src={book.image}
                          alt={book.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                    )}

                    {/* Book Info */}
                    <div className="p-4">
                      <h3 className="font-bold text-[#5a4a7a] text-lg truncate">{book.title}</h3>
                      <p className="text-sm text-[#8b7fa8] mb-2">{book.author}</p>

                      {book.tags && book.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {book.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs bg-[#d4c5e2] text-[#5a4a7a] px-2 py-1 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Status Badge */}
                      <div className="mb-3">
                        <select
                          value={book.status}
                          onChange={(e) => updateStatus(book._id, e.target.value)}
                          className={`w-full px-3 py-2 rounded-lg text-sm font-medium border-0 cursor-pointer transition-all ${
                            book.status === "completed"
                              ? "bg-[#c8e6c9] text-[#2e7d32]"
                              : book.status === "reading"
                              ? "bg-[#c5d9f1] text-[#1565c0]"
                              : "bg-[#ffe0b2] text-[#e65100]"
                          }`}
                        >
                          <option value="want_to_read">Want to Read</option>
                          <option value="reading">Reading</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditBook(book)}
                          className="flex-1 bg-[#8b7fa8] hover:bg-[#7a6e97] text-white text-sm py-2 rounded-lg transition-all"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteBook(book._id)}
                          className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm py-2 rounded-lg transition-all"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal - Add/Edit Book */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-white/30">
            <div className="sticky top-0 bg-gradient-to-r from-[#8b7fa8] to-[#6b8fa8] p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">{editingBook ? "Edit Book" : "Add New Book"}</h2>
              <button
                onClick={handleCloseModal}
                className="text-white hover:bg-white/20 rounded-lg p-1 transition-all"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveBook} className="p-6 space-y-4">
              {/* Image Upload
              <div>
                <label className="block text-sm font-semibold text-[#5a4a7a] mb-2">Book Cover</label>
                <div
                  className="border-2 border-dashed border-[#d4c5e2] rounded-lg p-4 text-center cursor-pointer hover:bg-[#f5f3f8] transition-all"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {imagePreview ? (
                    <div className="relative">
                      <img src={imagePreview} alt="Preview" className="w-full h-32 object-cover rounded" />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setImagePreview(null);
                          setImageFile(null);
                        }}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div>
                      <p className="text-[#8b7fa8] font-medium">Click to upload or drag & drop</p>
                      <p className="text-xs text-[#a89bb8]">PNG, JPG up to 5MB</p>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div> */}

              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-[#5a4a7a] mb-2">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Book title"
                  className="w-full px-3 py-2 border border-[#d4c5e2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b7fa8] bg-white/50"
                  required
                />
              </div>

              {/* Author */}
              <div>
                <label className="block text-sm font-semibold text-[#5a4a7a] mb-2">Author</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Author name"
                  className="w-full px-3 py-2 border border-[#d4c5e2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b7fa8] bg-white/50"
                  required
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-semibold text-[#5a4a7a] mb-2">Tags</label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Fiction, Mystery, Comedy (comma-separated)"
                  className="w-full px-3 py-2 border border-[#d4c5e2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b7fa8] bg-white/50"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-semibold text-[#5a4a7a] mb-2">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full px-3 py-2 border border-[#d4c5e2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b7fa8] bg-white/50"
                >
                  <option value="want_to_read">Want to Read</option>
                  <option value="reading">Reading</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-[#8b7fa8] to-[#6b8fa8] text-white font-semibold rounded-lg py-2.5 hover:shadow-lg transition-all"
                >
                  {editingBook ? "Update Book" : "Add Book"}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg py-2.5 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
