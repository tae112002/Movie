const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

let corsOptions = {
  origin: "https://openapi.naver.com",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

app.get("/api/search", (req, res) => {
  // 클라이언트에서 보낸 검색어
  const searchKeyword = req.query.query;

  axios
    .get("https://openapi.naver.com/v1/search/movie.json", {
      params: {
        query: searchKeyword,
        display: 100, // 검색 결과 노출 개수
      },
      headers: {
        "X-Naver-Client-Id": CLIENT_ID,
        "X-Naver-Client-Secret": CLIENT_SECRET,
      },
    })
    .then((response) => {
      const { data } = response;
      // 클라이언트에 보내기
      res.send(data.items);
    })
    .catch((error) => {
      let message = "Unknown Error";
      if (error instanceof Error) message = error.message;
      console.log(message);
    });
});

app.listen(5000, function () {
  console.log("app listening on port 5000!");
});
