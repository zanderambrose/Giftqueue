import React from "react";
import Layout from "./Layout";

// Bootstrap
import Button from "react-bootstrap/Button";

function LandingPage() {
  return (
    <Layout>
      <h1 className="text-center mb-4">A registry... but for your life</h1>
      <Button variant="success" className="d-block mx-auto p-3">
        Start Your Registry
      </Button>
    </Layout>
  );
}

export default LandingPage;
