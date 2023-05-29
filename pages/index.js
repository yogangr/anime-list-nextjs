import Layout from "@/component/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function Home({ anime }) {
  return (
    <Layout>
      <div className="title">Popular Anime</div>
      <div className="my-2 list">
        {anime.map((post, index) => (
          <Card className="card" key={index}>
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
              <Link href={`${post.mal_id}`}>
                <Button variant="dark" className="btn-detail">
                  Detail
                </Button>
              </Link>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://api.jikan.moe/v4/top/anime");
  const { data } = await res.json();
  const anime = data;

  return {
    props: {
      anime,
    },
  };
}
