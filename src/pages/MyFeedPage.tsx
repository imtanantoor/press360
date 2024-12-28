import { Navigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { RootState } from "../redux/store";
import NewsLayout from "../layout/NewsLayout";
import ArticleList from "../components/Article/ArticleList";
import { useEffect } from "react";
import { fetchMyFeed } from "../redux/userSlice";

function MyFeedPage() {
  const isLoggedIn = useAppSelector(
    (state: RootState) => state.user.isLoggedIn
  );
  const dispatch = useAppDispatch();
  const { myFeed, myFeedLoading, preferences } = useAppSelector(
    (state: RootState) => state.user
  );
  
  useEffect(() => {
    dispatch(fetchMyFeed(preferences));
  }, []);

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <NewsLayout>
      {myFeedLoading ? (
        <p>Fetching my feed...</p>
      ) : (
        <ArticleList articles={myFeed} title="My Feed" />
      )}
    </NewsLayout>
  );
}

export default MyFeedPage;
