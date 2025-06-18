'use client';

import { useState, useEffect } from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  //changed now
  const [searchedResults, setSearchedResults] = useState([]);
  const handleSearchChange = (e) => {
    const text = e.target.value;
    setSearchText(text);

    const filteredPosts = posts.filter((post) => {
      const promptMatch = post.prompt.toLowerCase().includes(text.toLowerCase());
      const tagMatch = post.tag.toLowerCase().includes(text.toLowerCase());
      const usernameMatch = post.creator.username.toLowerCase().includes(text.toLowerCase());
      return promptMatch || tagMatch || usernameMatch;
    });

    setSearchedResults(filteredPosts);
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);

    const filteredPosts = posts.filter((post) =>
      post.tag.toLowerCase().includes(tag.toLowerCase())
    );

    setSearchedResults(filteredPosts);
  };

  //till here

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      console.log("Fetched posts:", data); 

      // Assuming data is an array of prompts
      // console.log(data);
      // You can set the fetched data to a state variable if needed
      setPosts(data);
    };

    fetchPosts();
  }, []);
  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="block w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 py-2.5 pl-5 pr-12 text-sm font-medium shadow-lg text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-black dark:focus:border-white focus:outline-none focus:ring-0 font-satoshi"
        />
      </form>

      <PromptCardList
        data={searchText ? searchedResults : posts} //{posts}
        handleTagClick={handleTagClick} // Pass the handleTagClick function to PromptCardList
      />
    </section>
  )
}

export default Feed