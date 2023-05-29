import Layout from "@/component/Layout";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";

function Detail({ anime }) {
  const renderGenre = () => {
    return anime.genres.map((type) => (
      <span key={type.mal_id}> {type.name},</span>
    ));
  };
  const renderAuthor = () => {
    return anime.authors.map((type) => (
      <span key={type.mal_id}>{type.name}</span>
    ));
  };
  return (
    <Layout>
      <div className="anime-detail my-4">
        <Container>
          <Row>
            <Col className="col-4 thumb">
              <img
                className="anime-image-detail"
                alt={anime.title}
                src={anime.images.jpg.image_url}
              />
              <div className="detail-title">{anime.title}</div>
            </Col>
            <Col className="col-8 item">
              <p>
                Synopsis : <br />
                {anime.synopsis}
              </p>
              <p>Rating : {anime.score}</p>
              <p>Status : {anime.status}</p>
              <p>Type : {anime.type}</p>
              <p>Genre : {renderGenre()}</p>
              <p>Authors : {renderAuthor()}</p>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}

export default Detail;

export async function getServerSideProps(context) {
  const res = await fetch(
    `https://api.jikan.moe/v4/manga/${context.params.id}`
  );
  const { data } = await res.json();
  const anime = data;
  return {
    props: {
      anime,
    },
  };
}
