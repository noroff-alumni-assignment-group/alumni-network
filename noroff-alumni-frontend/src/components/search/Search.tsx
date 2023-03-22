// Search.tsx
import React, { useState } from "react";
import './search.css';
import PostDTO from "../../models/PostDTO";



interface SearchProps {
  posts: PostDTO[];
  updateFilteredPosts: (filteredPosts: PostDTO[]) => void;
}

const Search: React.FC<SearchProps> = ({ posts, updateFilteredPosts }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);

    const filteredPosts = posts.filter((post) => {
      const searchString = e.target.value.toLowerCase();
      const topicsString = post.target_topics?.join(" ").toLowerCase();
      const groupsString = post.target_groups?.join(" ").toLowerCase();

      return (
        post.title.toLowerCase().includes(searchString) ||
        post.body.toLowerCase().includes(searchString) ||
        topicsString?.includes(searchString) ||
        groupsString?.includes(searchString) ||
        (post.author.firstName +" "+ post.author.lastName).toLowerCase().includes(searchString)
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
