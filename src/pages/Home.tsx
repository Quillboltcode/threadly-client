import { usePosts } from "../hooks/usePost";
import { Suspense } from "react";
import { motion } from "framer-motion";
import PostCard from "../components/PostCard";
import { sanitizePost } from "../types/post";



const Home = () => {
  const { data, isLoading, isError } = usePosts();

  if (isLoading) return <p className="text-center text-gray-400 mt-10">Loading...</p>;
  if (isError) return <p className="text-center text-red-500 mt-10">Error fetching posts</p>;
  const sanitizeData = data?.map((post) => sanitizePost(post))|| [];
  return (
    <div className="max-w-2xl md:w-full mx-auto p-4">
      <h1 className="text-2xl font-bold text-white mb-4">Home</h1>
      
      {/* Posts List */}
      <Suspense fallback={<p className="text-gray-400">Loading posts...</p>}>
        <div className="space-y-4 w-full whitespace-nowrap overflow-x-auto">
          {sanitizeData?.map((post, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <PostCard post={post} />
            </motion.div>
          ))}
        </div>
      </Suspense>
    </div>
  );
};



export default Home;
