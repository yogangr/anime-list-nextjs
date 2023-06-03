import Layout from "@/component/Layout";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Link from "next/link";

function Detail({ char, pic }) {
  //   const renderGenre = () => {
  //     return anime.genres.map((type) => (
  //       <span key={type.mal_id}> {type.name},</span>
  //     ));
  //   };

  return (
    <Layout>
      <Container className=" justify-content-center anime-detail my-4 ">
        <Row>
          <Col className="col-4 thumb">
            <img
              className="anime-image-detail"
              alt={char.name}
              src={char.images.jpg.image_url}
            />
            <div className="detail-title">{char.name}</div>
          </Col>
          <Col className="col-8 item">
            <div>{char.about}</div>
          </Col>
        </Row>
        <div className="fw-bold h1 my-5">Picture</div>
        <div className="list-char gap-4  d-flex flex-wrap">
          {pic.map((pict, index) => (
            <Card style={{ width: "120px" }} key={index}>
              <Card.Img
                variant="top"
                src={pict.jpg.image_url}
                className="char-img"
              />
            </Card>
          ))}
        </div>
      </Container>
    </Layout>
  );
}

export default Detail;

export async function getServerSideProps(context) {
  const res = await fetch(
    `https://api.jikan.moe/v4/characters/${context.params.id}`
  );
  const { data } = await res.json();
  const char = data;
  const response = await fetch(
    `https://api.jikan.moe/v4/characters/${context.params.id}/pictures`
  );
  const result = await response.json();
  const pic = result.data;
  return {
    props: {
      char,
      pic,
    },
  };
}
