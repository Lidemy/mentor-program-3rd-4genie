import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';
import { getPost, deletePost } from '../../redux/reducers/postReducer';
import { useDispatch, useSelector } from 'react-redux';

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
// const PostTitle = styled.div.attrs({
//   className: 'form-title',
// })``;

const PostBody = styled.div`
  text-align: justify;
  font-size: 20px;
  letter-spacing: 3px;
  line-height: 1.5;
  white-space: pre-wrap;
`;

const PostDeleteButton = styled.button`
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

const PostEditButton = styled.button`
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
  // 設定變數 dispatch，之後可以將 action 傳送到 reducer 中
  const dispatch = useDispatch();
  // 設定 title 的 state

  // 設定變數 user，從 store 的 users 中拿到 user 的 state
  const user = useSelector((store) => store.users.user);

  // 設定變數 post，從 store 的 posts 中拿到 post 的 state
  const post = useSelector((store) => store.posts.post);

  // 設定變數 isLoading，從 store 的 posts 中拿到 isLoading 的 state
  const isLoading = useSelector((store) => store.posts.isLoadingPost);

  // 取得 URL 上 id 的參數
  const { id } = useParams();

  const history = useHistory();
  console.log(post);

  // 拿到某單一文章的內容：
  //dispatch 一個名為 'getPost' 的 action 到 postReducer，並將 id 帶入 action 中
  useEffect(() => {
    dispatch(getPost(id));
    //dependency： 當偵測到 id、dispatch 改變時才重新渲染
  }, [id, dispatch]);

  // 執行刪除功能
  const handleDelete = (id) => {
    //dispatch 一個名為 'deletePost' 的 action 到 postReducer，並將 id 帶入 action 中
    dispatch(deletePost(id));

    // 刪除成功後轉到首頁
    history.push('/');
  };

  // 執行編輯功能
  const handleEdit = (id) => {
    // ，點擊後，前往編輯頁面
    history.push('/edit-post/' + id);
  };

  return (
    <Root>
      {/* 若在載入中，尚未從 API 中取得任何資料，顯示 ' 正在載入中 ' */}
      {isLoading && <Loading> 正在載入中...</Loading>}

      {/* 若已從 API 拿到資料，顯示文章內容 */}
      {!isLoading && (
        <PostContainer>
          <PostHeader>
            <PostTitle>
              {post && post[0].title}
              {user && (
                <>
                  <div>
                    {/* 點擊 ' 刪除此文 ' 按鈕時，執行 handleDelete */}
                    <PostDeleteButton onClick={() => handleDelete(id)}>
                      {' '}
                      刪除此文{' '}
                    </PostDeleteButton>
                    {/* 點擊 ' 編輯此文 ' 按鈕時，執行 handleEdit */}
                    <PostEditButton onClick={() => handleEdit(id)}>
                      {' '}
                      編輯此文{' '}
                    </PostEditButton>
                  </div>
                </>
              )}
            </PostTitle>
            <PostDate>
              {post && new Date(post[0].createdAt).toLocaleDateString()}
            </PostDate>
          </PostHeader>
          <PostBody>{post && post[0].body}</PostBody>
        </PostContainer>
      )}
    </Root>
  );
}
