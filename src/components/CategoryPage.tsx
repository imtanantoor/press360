import { useEffect, useState } from "react";
import ArticleItem from "../models/ArticleItem";
import ArticleService from "../services/ArticleService";
import ArticleList from "./Article/ArticleList";
import HeroArticle from "./Article/HeroArticle";
import { useLocation } from "react-router";

interface CategoryPageProps {
  readonly category: string;
  readonly query?: string;
  readonly pageSize?: string;
}

function CategoryPage({ category, query = '', pageSize = "10" }: CategoryPageProps) {
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const queryParam = !!query ? query : new URLSearchParams(location.search).get("q");
  const articlesWithImage = articles.filter((article) => article.image);
  const articlesFromGuardian = articles.filter(
    (article) => article.source === "The Guardian"
  );

  useEffect(() => {
    const articleService = ArticleService.getInstance();
    articleService
      .searchArticles({
        q: queryParam ?? '',
        category: category,
        section: category,
        page: "1",
        pageSize: pageSize,
      })
      .then((articles) => {
        setArticles(articles);
        setLoading(false);
      });
  }, [category, queryParam, pageSize]);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <HeroArticle article={articlesWithImage[0]} />
          <ArticleList articles={articlesWithImage} title={`Latest in ${category}`} />
          <ArticleList articles={articlesFromGuardian} title="The Guardian" />
        </>
      )}
    </div>
  );
}

export default CategoryPage; 