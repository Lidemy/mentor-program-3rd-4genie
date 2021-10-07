import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getLimitPosts } from '../../WebAPI';
import { useDispatch, useSelector } from 'react-redux';

import { getPosts, setPost } from '../../redux/reducers/postReducer';

// import { getPosts, setActivePage } from '../../redux/reducers/postReducer';

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
  // 設定變數 dispatch，之後可以將 action 傳送到 reducer 中
  const dispatch = useDispatch();

  // 設定變數 post，從 store 的 posts 中拿到 post 的 state
  const posts = useSelector((store) => store.posts.post);

  // 設定每頁顯示多少筆
  // 設定變數 limit，從 store 的 posts 中拿到 limit 的 state
  const limit = useSelector((store) => store.posts.limit);

  // 設定變數 pages，從 store 的 posts 中拿到 pages 的 state
  const pages = useSelector((store) => store.posts.allPageNumber);

  // 設定變數 isLoading，從 store 的 posts 中拿到 isLoading 的 state
  const isLoading = useSelector((store) => store.posts.isLoadingPost);

  // console.log(posts);
  // console.log(pages);

  // 拿到所有頁面的內容：
  //dispatch 一個名為 'getPosts' 的 action 到 postReducer，並將 limit 帶入 action 中

  useEffect(() => {
    dispatch(getPosts(limit));
  }, [dispatch, limit]);

  // 點擊頁碼按鈕後，執行 handlePageClick()
  const handlePageClick = (page) => {
    // 根據參數 page、limit 拿到限定第幾頁且每頁多少篇的文章
    // 執行 getLimitPosts 的 API，並將 page、 limit 帶入
    getLimitPosts(page, limit).then((posts) =>
      //dispatch 一個名為 'setPost' 的 action 到 postReducer，並將回傳的資料帶入 action 中
      dispatch(setPost(posts))
    );
  };

  return (
    <Root>
      {/* 若在載入中，尚未從 API 中取得任何資料，顯示 '正在載入中' */}
      {isLoading && <Loading>正在載入中...</Loading>}

      {/* 若已從 API 拿到資料，將每一筆資料透過 props.post 帶到 Post 這個 component， */}
      {!isLoading &&
        posts &&
        posts.map((post) => <Post key={post.id} post={post} />)}

      {/* 顯示頁數 */}
      <PaginationContainer>
        {posts &&
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
