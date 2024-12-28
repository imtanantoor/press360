import { useEffect, useState } from "react";
import ArticleList from "../components/Article/ArticleList";
import ArticleItem from "../models/ArticleItem";
import ArticleService from "../services/ArticleService";
import NewsLayout from "../layout/NewsLayout";

function HomePage() {
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const articlesWithImage = articles.filter((article) => article.image);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const articleService = ArticleService.getInstance();
    articleService.getArticles().then((articles) => {
      setArticles(articles);
      setLoading(false);
    });
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
