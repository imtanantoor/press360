import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { RootState } from "../redux/store";
import NewsLayout from "../layout/NewsLayout";
import ArticleList from "../components/Article/ArticleList";
import { useEffect } from "react";
import { fetchMyFeed } from "../redux/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

function MyFeedPage() {
  const isLoggedIn = useAppSelector(
    (state: RootState) => state.user.isLoggedIn
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { myFeed, myFeedLoading, preferences } = useAppSelector(
    (state: RootState) => state.user
  );

  const filteredAuthors = myFeed.filter((article) => {
    if (preferences.authors.length > 0)
      return ['Associated Press'].some((author) =>
        article.author.includes(author)
      );
    return true;
  });

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error("Please login to view your feed");
      navigate("/");
      return;
    }

    dispatch(fetchMyFeed(preferences));
  }, [preferences.source, preferences.category, preferences.authors]);

  return (
    <NewsLayout>
      {myFeedLoading ? (
        <div style={{ padding: 20 }}>
          <h3>Loading...</h3>
        </div>
      ) : (
        <ArticleList articles={filteredAuthors} title="My Feed" />
      )}
    </NewsLayout>
  );
}

export default MyFeedPage;
