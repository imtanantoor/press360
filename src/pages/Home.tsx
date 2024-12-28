import ArticleList from "../components/Article/ArticleList";
import NewsLayout from "../layout/NewsLayout";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { fetchArticles } from "../redux/searchSlice";
import { useEffect } from "react";

function HomePage() {
  const { articles, loading } = useAppSelector((state) => state.search);
  const articlesWithImage = articles.filter((article) => article.image);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchArticles());
  }, []);

  return (
    <NewsLayout>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ArticleList articles={articlesWithImage} title="Latest Articles" />
      )}
    </NewsLayout>
  );
}

export default HomePage;
