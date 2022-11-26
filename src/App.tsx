import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/navigation/Nav";
import AuthorDetailPage from "./pages/authors/AuthorDetailPage";
import AuthorList from "./pages/authors/AuthorList";
import PostDetailPage from "./pages/posts/PostDetailPage";
import PostList from "./pages/posts/PostList";
import TagList from "./pages/tags/TagList";
import TopicList from "./pages/topics/TopicList";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 30 * 1000 } },
});

const App = () => {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Router>
          <Nav />
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/posts" element={<PostList />} />
            <Route path="/posts/:id" element={<PostDetailPage />} />
            <Route path="/authors" element={<AuthorList />} />
            <Route path="/authors/:id" element={<AuthorDetailPage />} />
            <Route path="/topics" element={<TopicList />} />
            <Route path="/tags" element={<TagList />} />
          </Routes>
        </Router>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </div>
  );
};

export default App;
