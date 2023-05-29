import Head from "next/head";
import Link from "next/link";
import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>Animex</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand className="logo text-white" href="#">
            Anime List.
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" bg="light"/>
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ms-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Link href="/" className="mx-3 text-white navbar-link">
                Home
              </Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-light">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main>
        <Container>{children}</Container>
      </main>
    </div>
  );
}

export default Layout;