import React from "react";

// Bootstrap
import Button from "react-bootstrap/Button";

function LandingPage() {
  return (
    <div className="container">
      <h1 className="text-center mb-4">A registry... but for your life</h1>
      <Button variant="success" className="d-block mx-auto p-3">
        Start Your Registry
      </Button>
    </div>
  );
}

export default LandingPage;
