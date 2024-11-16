import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch posts inside useEffect to avoid excessive calls
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await appwriteService.getPosts();
        if (response?.documents) {
          setPosts(response.documents);
        }
      } catch (err) {
        setError("Failed to load posts. Please try again later.");
        console.error(`Error fetching posts: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); // Empty dependency array to run once on mount

  return (
    <div className="w-full py-8">
      <h1 className="text-white text-center font-bold text-2xl"> All Posts </h1>

      {loading && <div className="text-center text-gray-300">Loading...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}

      {!loading && !error && (
        <Container>
          <div className="flex flex-wrap">
            {posts.length ? (
              posts.map((post) => (
                <div key={post.$id} className="p-2 w-1/4">
                  <PostCard {...post} />
                </div>
              ))
            ) : (
              <div className="text-center text-gray-300 w-full">
                No posts available
              </div>
            )}
          </div>
        </Container>
      )}
    </div>
  );
}

export default AllPosts;
