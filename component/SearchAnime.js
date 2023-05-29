import Home from "@/pages";
import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useState } from "react";

function SearchAnime() {
  const [search, setSearch] = useState([]);
  const [query, setQuery] = useState([]);

  const handleSubmit = async () => {
    const res = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&sfw`);
    const { data } = await res.json();
    const search = data;
    const result = search.filter((post) =>
      post.title.toLowerCase().includes(query)
    );
    setSearch(result);
  };

  const SearchList = () => {
    return (
      <div className="d-flex flex-wrap my-2 list">
        {search?.map((post, index) => (
          <Card style={{ width: "12rem", height: "500px" }} key={index}>
            <Card.Img
              variant="top"
              src={post.images.jpg.image_url}
              className="cover-img"
            />
            <Card.Body>
              <Card.Title className="title-anime">
                {post.title}/{post.title_japanese}
              </Card.Title>
              <p>{post.episodes} Episode</p>
              <p>Status: {post.status}</p>
              <p>Rating: {post.score}</p>
              <p>Source: {post.source}</p>
              <Button variant="dark" className="btn-detail">
                Detail
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  };
  return (
    <>
      <Home handleSubmit={handleSubmit} setQuery={setQuery} />
      <div className="App">
        <header className="App-header">
          <div className="container car-container">
            <SearchList />
          </div>
        </header>
      </div>
    </>
  );
}

export default SearchAnime;
