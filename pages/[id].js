import Layout from "@/component/Layout";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";
import ReactPlayer from "react-player";
import Card from "react-bootstrap/Card";
import Link from "next/link";

function Detail({ anime, char }) {
  const renderGenre = () => {
    return anime.genres.map((type) => (
      <span key={type.mal_id}> {type.name},</span>
    ));
  };

  const renderTrailer = () => {
    if (anime.trailer.url) {
      return (
        <>
          <div className="my-5">
            <h2 className="text-center fw-bold">Trailer {anime.title}</h2>
            <div className="d-flex justify-content-center">
              <ReactPlayer
                width="100vw"
                height="100vh"
                url={anime.trailer.url}
              />
            </div>
          </div>
        </>
      );
    } else {
      <>
        <div></div>
      </>;
    }
  };
  return (
    <Layout>
      <div className="anime-detail my-4">
        <Container className=" justify-content-center ">
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
              <p>Duration : {anime.duration}</p>
              <p>Source : {anime.source}</p>
              <p>Episode : {anime.episodes}</p>
              <p>Status : {anime.status}</p>
              <p>Genre : {renderGenre()}</p>
            </Col>
          </Row>
          <Row className="list-char gap-3 my-5">
            <div className="fw-bold h1">Karakter</div>
            {char.map((chara) => (
              <Card
                style={{ width: "115px", height: "14rem" }}
                key={chara.character.mal_id}
              >
                <Link href={`${chara.character.mal_id}/character`}>
                  <Card.Img
                    variant="top"
                    src={chara.character.images.jpg.image_url}
                    className="char-img"
                  />
                </Link>
                <Card.Body>
                  <Card.Title className="title-char">
                    {chara.character.name}
                  </Card.Title>
                </Card.Body>
              </Card>
            ))}
          </Row>

          {/* {anime.map((post, index) => (
            <div key={index}>Characters : {post.character.name}</div>
          ))} */}
          {renderTrailer()}
        </Container>
      </div>
    </Layout>
  );
}

export default Detail;

export async function getServerSideProps(context) {
  const res = await fetch(
    `https://api.jikan.moe/v4/anime/${context.params.id}`
  );
  const { data } = await res.json();
  const anime = data;
  const response = await fetch(
    `https://api.jikan.moe/v4/anime/${context.params.id}/characters`
  );
  const result = await response.json();
  const char = result.data;
  return {
    props: {
      anime,
      char,
    },
  };
}
