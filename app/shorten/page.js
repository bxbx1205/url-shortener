"use client";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ShortenPage() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [urlList, setUrlList] = useState([]);

  const handleChange = (e) => setUrl(e.target.value);
  const handleAliasChange = (e) => setShortUrl(e.target.value);

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!url) return toast.error("Please enter a URL");
    if (!validateUrl(url)) return toast.error("Please enter a valid URL");
    setIsLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, shorturl: shortUrl }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to generate short URL");
      setResult(data);
      toast.success("URL shortened successfully!");
      setUrl("");
      setShortUrl("");
      fetchOldUrls(); // Refresh list
    } catch (error) {
      toast.error(error.message || "Failed to generate short URL");
    } finally {
      setIsLoading(false);
    }
  };

  const getShortUrl = (item) =>
    item.shortenedUrl || `${window.location.origin}/${item.shorturl}`;

  const fetchOldUrls = async () => {
    try {
      const res = await fetch("/api/urls");
      const data = await res.json();
      if (res.ok) {
        setUrlList(data.urls);
      } else {
        toast.error(data.error || "Failed to load URLs");
      }
    } catch (err) {
      toast.error("Error fetching previous URLs");
    }
  };

  useEffect(() => {
    fetchOldUrls();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex flex-col items-center justify-center p-4">
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-2xl border border-purple-200">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-purple-800">Shorten Your URL</h1>
        <div className="space-y-6">
          <input
            type="text"
            value={url}
            className="w-full px-4 py-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-black"
            placeholder="https://example.com/long-url"
            onChange={handleChange}
          />
          <input
            type="text"
            value={shortUrl}
            className="w-full px-4 py-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-black"
            placeholder="custom-alias"
            onChange={handleAliasChange}
          />
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-3 px-4 rounded-lg hover:from-purple-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition disabled:opacity-50 font-bold text-lg"
          >
            {isLoading ? "Processing..." : "Shorten URL"}
          </button>
        </div>

        {result && (
          <div className="mt-8 p-4 bg-purple-50 rounded-lg border border-purple-200 shadow">
            <p className="font-semibold text-purple-700">Your shortened URL:</p>
            <div className="flex items-center mt-2">
              <input
                type="text"
                readOnly
                value={getShortUrl(result)}
                className="flex-1 px-2 py-1 border border-purple-300 rounded-md bg-gray-100 text-purple-800 font-semibold"
              />
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(getShortUrl(result));
                  toast.info("Copied to clipboard!");
                }}
                className="ml-2 p-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Previous shortened links section */}
      {urlList.length > 0 && (
        <div className="mt-12 max-w-md w-full">
          <h2 className="text-xl font-bold text-purple-800 mb-4 text-center">Previous Shortened URLs</h2>
          <ul className="space-y-4">
            {urlList.map((item, idx) => (
              <li
                key={idx}
                className="bg-white border border-purple-200 rounded-lg shadow p-4 hover:shadow-md transition"
              >
                <div className="flex justify-between items-center">
                  <span className="text-purple-800 font-semibold">🔗 Short URL:</span>
                  <a
                    href={`/${item.shorturl}`}
                    className="text-blue-600 underline ml-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {`${window.location.origin}/${item.shorturl}`}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ShortenPage;
