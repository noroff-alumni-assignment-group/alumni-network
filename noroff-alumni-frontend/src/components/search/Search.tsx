// Search.tsx
import React, { useState } from "react";

interface PostData {
  title: string;
  date: string;
  body: string;
  topics: string[];
  groups: string[];
  author: string;
  profileInitials: string;
  lastActivity: string;
  comments: {
    author: string;
    authorInitials: string;
    response: string;
    date: string;
  }[];
}

interface SearchProps {
  posts: PostData[];
  updateFilteredPosts: (filteredPosts: PostData[]) => void;
}

const Search: React.FC<SearchProps> = ({ posts, updateFilteredPosts }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);

    const filteredPosts = posts.filter((post) => {
      const searchString = e.target.value.toLowerCase();
      const topicsString = post.topics.join(" ").toLowerCase();
      const groupsString = post.groups.join(" ").toLowerCase();

      return (
        post.title.toLowerCase().includes(searchString) ||
        post.body.toLowerCase().includes(searchString) ||
        topicsString.includes(searchString) ||
        groupsString.includes(searchString) ||
        post.author.toLowerCase().includes(searchString)
      );
    });

    updateFilteredPosts(filteredPosts);
  };

  return (

      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search..."
        className="search-input"
      />
  );
};

export default Search;
