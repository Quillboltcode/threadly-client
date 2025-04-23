import { usePosts } from "../hooks/usePost";
import { Suspense } from "react";
import { motion } from "framer-motion";
import PostCard from "../components/PostCard";

import LoadingSpinner from "../components/LoadingSpinner";



const Home = () => {
  const { data, isLoading, isError } = usePosts();

  if (isLoading) return <LoadingSpinner />
  if (isError) return <p className="text-center text-red-500 mt-10">Error fetching posts</p>;
  // console.log(data)
  const sanitizeData = data?.map((post) => post)|| [];
  return (
    <div className="max-w-2xl md:w-full mx-auto p-4">
      <h1 className="text-2xl font-bold text-white mb-4">Home</h1>
      
      {/* Posts List */}
      <Suspense fallback={<p className="text-gray-400">Loading posts...</p>}>
        <div className="space-y-4 w-full whitespace-nowrap overflow-x-auto">
          {sanitizeData?.map((post, _index) => (
            <motion.div 
              key={post.id}
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
