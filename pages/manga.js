import Layout from "@/component/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";

export default function Home({ anime }) {
  const [search, setSearch] = useState([]);
  const [query, setQuery] = useState([]);

  const handleSubmit = async () => {
    const res = await fetch(`https://api.jikan.moe/v4/manga?q=${query}&sfw`);
    const { data } = await res.json();
    const search = data;
    const result = search.filter((post) =>
      post.title.toLowerCase().includes(query)
    );
    setSearch(result);
    console.log(result);
  };

  const SearchList = () => {
    return (
      <div className="d-flex flex-wrap list">
        {search?.map((post, index) => (
          <Card style={{ width: "12rem" }} key={index}>
            <Link href={`${post.mal_id}/full`}>
              <Card.Img
                variant="top"
                src={post.images.jpg.image_url}
                className="cover-img"
              />
            </Link>
            <Card.Body>
              <Card.Title className="title-anime">{post.title}</Card.Title>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  };
  return (
    <Layout>
      <Form className="d-flex my-4">
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-auto"
          aria-label="Search"
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button variant="outline-dark ms-2" onClick={handleSubmit}>
          Search
        </Button>
      </Form>
      <SearchList />
      <div className="title">Top Rating Manga</div>
      <div className="my-2 list">
        {anime.map((post, index) => (
          <Card className="card" key={index}>
            <Link href={`${post.mal_id}/full`}>
              <Card.Img
                variant="top"
                src={post.images.jpg.image_url}
                className="cover-img"
              />
            </Link>
            <Card.Body>
              <Card.Title className="title-anime">{post.title}</Card.Title>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://api.jikan.moe/v4/top/manga");
  const { data } = await res.json();
  const anime = data;

  return {
    props: {
      anime,
    },
  };
}
