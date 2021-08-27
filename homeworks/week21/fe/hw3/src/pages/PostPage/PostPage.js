import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';
import { getPost, deletePost } from '../../WebAPI';

const Root = styled.div`
  width: 75%;
  margin: 0 auto;
`;

const PostContainer = styled.div`
  padding: 16px;
  margin: 8px auto;
  max-width: 960px;
`;

const PostHeader = styled.div`
  padding: 16px 0;
`;

const PostTitle = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const PostDate = styled.div`
  color: rgba(0, 0, 0, 0.8);
  margin-top: 10px;
`;

const PostBody = styled.div`
  text-align: justify;
  font-size: 20px;
  letter-spacing: 3px;
  line-height: 1.5;
  white-space: pre-wrap;
`;

const PostButton = styled.button`
  border: none;
  height: 35px;
  width: 100px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 20px;

  &:hover {
    background-color: rgba(0, 12, 34, 0.1);
  }
`;

const Loading = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-item: center;
  font-size: 28px;
`;

export default function PostPage() {
  // 設定 post 的 state
  const [post, setPost] = useState(null);
  // 設定 isLoading 的 state
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  // 取得 URL 上 id 的參數
  const { id } = useParams();

  useEffect(() => {
    // 設 isLoading 為 true
    setIsLoading(true);
    // 執行 getPost()，並將 id 帶入，取得特定 id 的文章
    getPost(id)
      .then((post) => {
        // 成功後，將 isLoading 的 state 更新為 false
        setIsLoading(false);
        // post 的 state 更新為取得的 post 內容
        setPost(post[0]);
      })
      .catch((err) => {
        // API 串接有誤時，isLoading 的 state 更新為 false
        setIsLoading(false);
      });
    // dependency： 當偵測到 id 值才重新渲染
  }, [id]);

  // 執行 handleDelete()
  const handleDelete = () => {
    // 串接API, 執行 deletePost()，並帶入 id 值， 刪除 id 為此的文章
    deletePost(id).then(() => {
      // 刪除成功後轉到首頁
      history.push('/');
    });
  };

  return (
    <Root>
      {/* 若在載入中，尚未從 API 中取得任何資料，顯示 '正在載入中' */}
      {isLoading && <Loading>正在載入中...</Loading>}

      {/* 若已從 API 拿到資料，顯示文章內容 */}
      <PostContainer>
        <PostHeader>
          <PostTitle>
            {post && post.title}
            {!isLoading && (
              // 點擊 '刪除此文' 按鈕時，執行 handleDelete
              <PostButton onClick={handleDelete}>刪除此文</PostButton>
            )}
          </PostTitle>
          <PostDate>
            {post && new Date(post.createdAt).toLocaleDateString()}
          </PostDate>
        </PostHeader>
        <PostBody>{post && post.body}</PostBody>
      </PostContainer>
    </Root>
  );
}
