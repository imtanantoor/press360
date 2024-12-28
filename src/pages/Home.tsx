import ArticleList from "../components/Article/ArticleList";
import NewsLayout from "../layout/NewsLayout";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { fetchArticles } from "../redux/searchSlice";
import { useEffect } from "react";

function HomePage() {
  const { articles, loading } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchArticles());
  }, []);

  return (
    <NewsLayout>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ArticleList articles={articles} title="Latest Articles" />
      )}
    </NewsLayout>
  );
}

export default HomePage;
