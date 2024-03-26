import express from "express";

const PORT = 3000;

function main() {
  const app = express();
  // END POINTS
  app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}/`);
  });
}

main();
