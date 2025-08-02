import React, { useEffect, useState } from 'react'
import { dummyPostsData } from '../assets/assets'
import Loading from '../components/Loading'

const Feed = () => {

  const [feeds, setFeeds] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch feeds from the server
  const fetchFeeds = async () => {
    setFeeds(dummyPostsData)
    setLoading(false)
  }

  useEffect(() => {
    fetchFeeds()
  },[])

  return !loading ? (
    <div className='h-full overflow-y-scroll no-scrollbar py-10 xl:pr-5 flex items-start justify-center xl:gap-8'>
      {/* Stories and post list */}
      <div>
    <h1>Stories here</h1>
     <div className='p-4 space-y-6'>
    List of post
      </div>
      </div>
      {/* Right Sidebar */}
      <div>
        <div>
          <h1>Sponsored</h1>
          </div>
          <h1>Recent Messages</h1>
      </div>
    </div>
  ) : <Loading/>
}

export default Feed