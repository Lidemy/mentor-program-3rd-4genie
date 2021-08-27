import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getLimitPosts, getPosts } from '../../WebAPI';
import { getPages } from '../../utils';

const Root = styled.div`
  width: 75%;
  margin: 0 auto;
`;
const PostContainer = styled.div`
  border-bottom: solid 1px rgba(0, 12, 34, 0.2);
  padding: 16px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  &:hover {
    background-color: rgba(0, 12, 34, 0.07);
  }
`;
const PostTitle = styled(Link)`
  font-size: 24px;
  color: #333;
  text-decoration: none;
`;

const PostDate = styled.div`
  color: rgba(0, 0, 0, 0.8);
`;

const PaginationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const PageButton = styled.li`
  width: 45px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  cursor: pointer;
  outline: transparent;
  border: solid 1px rgba(0, 12, 34, 0.1);
  margin-top: 20px;

  &:hover {
    background-color: rgba(0, 12, 34, 0.07);
  }
`;

const Loading = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-item: center;
  font-size: 28px;
`;

// 接收從 HomePage props.post
function Post({ post }) {
  return (
    <PostContainer>
      <PostTitle to={`/posts/${post.id}`}>{post.title}</PostTitle>
      <PostDate>{new Date(post.createdAt).toLocaleDateString()}</PostDate>
    </PostContainer>
  );
}

Post.propTypes = {
  post: PropTypes.object,
};

export default function HomePage() {
  // 設定 posts 的 state
  const [posts, setPosts] = useState([]);
  // 設定 pages 的 state
  const [pages, setPages] = useState([]);
  // 設定 isLoading 的 state
  const [isLoading, setIsLoading] = useState(false);
  // 設定每頁顯示多少筆
  const limit = 5;

  useEffect(() => {
    // 設 isLoading 為 true
    setIsLoading(true);
    getPosts()
      .then((posts) => {
        // 計算每頁 limit 筆的話，全部共有多少頁
        let totalPages = Math.ceil(posts.length / limit);
        // 計算出全部頁數後，更新 pages 的state
        setPages(getPages(totalPages));
        // 到第一頁
        getLimitPosts(1, limit).then((posts) => setPosts(posts));
        // 成功後，將 isLoading 的 state 更新為 false
        setIsLoading(false);
      })
      .catch((err) => {
        // API 串接有誤時，isLoading 的 state 更新為 false
        setIsLoading(false);
      });
  }, []);

  // 執行 handlePageClick()
  const handlePageClick = (page) => {
    getLimitPosts(page, limit).then((posts) => setPosts(posts));
  };

  return (
    <Root>
      {/* 若在載入中，尚未從 API 中取得任何資料，顯示 '正在載入中' */}
      {isLoading && <Loading>正在載入中...</Loading>}

      {/* 若已從 API 拿到資料，將每一筆資料透過 props.post 帶到 Post 這個 component， */}
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}

      {/* 顯示頁數 */}
      <PaginationContainer>
        {posts.length > 0 &&
          pages.map((page) => (
            // 點擊頁碼按鈕時，執行 handlePageClick()
            <PageButton key={page} onClick={() => handlePageClick(page)}>
              {page}
            </PageButton>
          ))}
      </PaginationContainer>
    </Root>
  );
}
