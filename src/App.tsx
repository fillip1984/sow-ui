import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PostDetailPage from "./pages/posts/PostDetailPage";
import PostList from "./pages/posts/PostList";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 30 * 1000 } },
});

const App = () => {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/posts" element={<PostList />} />
            <Route path="/posts/:id" element={<PostDetailPage />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
};

export default App;
