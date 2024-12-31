import { useEffect, useState } from "react";
import ArticleItem from "../models/ArticleItem";
import ArticleService from "../services/ArticleService";
import ArticleList from "./Article/ArticleList";
import { useAppSelector } from "../hooks/reduxHooks";
import NewsLayout from "../layout/NewsLayout";

interface CategoryPageProps {
  readonly category: string;
  readonly pageSize?: string;
}

function CategoryPage({ category }: CategoryPageProps) {
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const articlesWithImage = articles.filter((article) => article.image);
  const { filters } = useAppSelector((state) => state.search);

  useEffect(() => {
    const articleService = ArticleService.getInstance();
    articleService
      .searchArticles({ category })
      .then((articles) => {
        setArticles(articles);
        setLoading(false);
      });
  }, [category, filters.q]);

  return (
    <NewsLayout>
      {loading ? (
        <div style={{ padding: 20 }}>
          <h3>Loading...</h3>
        </div>
      ) : (
        <ArticleList articles={articlesWithImage} title={`${category}`} />
      )}
    </NewsLayout>
  );
}

export default CategoryPage;
