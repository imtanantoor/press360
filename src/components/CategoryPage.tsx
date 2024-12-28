import { useEffect, useState } from "react";
import ArticleItem from "../models/ArticleItem";
import ArticleService from "../services/ArticleService";
import ArticleList from "./Article/ArticleList";
import { useAppSelector } from "../hooks/reduxHooks";
import NewsLayout from "../layout/NewsLayout";

interface CategoryPageProps {
  readonly category: string;
  readonly query?: string;
  readonly pageSize?: string;
}

function CategoryPage({
  category,
  query = "",
  pageSize = "10",
}: CategoryPageProps) {
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const articlesWithImage = articles.filter((article) => article.image);
  const { query: keyword } = useAppSelector((state) => state.search);

  useEffect(() => {
    const articleService = ArticleService.getInstance();
    articleService
      .searchArticles({
        q: keyword,
        category: category,
        section: category,
        page: "1",
        pageSize: pageSize,
      })
      .then((articles) => {
        setArticles(articles);
        setLoading(false);
      });
  }, [category, keyword, pageSize]);

  return (
    <NewsLayout>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ArticleList
          articles={articlesWithImage}
          title={`Latest in ${category}`}
        />
      )}
    </NewsLayout>
  );
}

export default CategoryPage;
