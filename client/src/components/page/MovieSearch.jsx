import React, { useEffect, useState } from "react";
import axios from "axios";

const MovieSearch = () => {
  const [Movies, setMovies] = useState([]);
  // 검색 Input value 값을 담을 State
  const [searchKeyword, setSearchKeyword] = useState("");
  // Loader 관리
  const [Loading, setLoading] = useState(false);

  const fetchData = async () => {
    // 검색어
    console.log(searchKeyword);

    // 데이터 불러오는 중에 Loader 띄우기
    setLoading(true);

    try {
      if (searchKeyword === "") {
        // 검색창이 비었을 때 초기화
        setMovies([]);
        setSearchKeyword("");
      } else {
        // '/api/search'로 서버에 요청
        const { data } = await axios.get("/api/search", {
          params: {
            query: searchKeyword, // 검색어를 파라미터로 보냄
          },
        });

        // 서버에서 보낸 데이터 담기
        setMovies(data);
        console.log(Movies);
      }
    } catch (error) {
      let message = "Unknown Error";
      if (error instanceof Error) message = error.message;
      alert(message);
    }

    // Loader 없애기
    setLoading(false);
  };

  const submitKeyword = (e) => {
    e.preventDefault();
    fetchData();
    console.log("제출!");
  };

  // 마운트 시 데이터 초기화 위해 실행
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <form onSubmit={submitKeyword}>
        <input
          type="text"
          onChange={(e) => setSearchKeyword(e.target.value)}
        ></input>
        <button type="submit">검색</button>
      </form>
    </div>
  );
};

export default MovieSearch;
