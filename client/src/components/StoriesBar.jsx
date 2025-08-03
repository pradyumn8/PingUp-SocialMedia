import React, { useEffect, useState } from 'react'
import { dummyStoriesData } from '../assets/assets'
import { Plus } from 'lucide-react'
import moment from 'moment'
import StoryModel from './StoryModel'
import StoryViewer from './StoryViewer'

const StoriesBar = () => {
  const [stories, setStories] = useState([])
  const [showModel, setShowModel] = useState(false)
  const [viewStory, setViewStory] = useState(null)

  const fetchStories = async () => {
    setStories(dummyStoriesData)
  }

  useEffect(() => {
    fetchStories()
  }, [])

  return (
    <div
      className="
        w-screen 
        sm:w-[calc(100vw-240px)] 
        lg:max-w-2xl 
        overflow-x-auto 
        no-scrollbar 
        px-4
      "
    >
      <div className="flex flex-row flex-nowrap gap-4 pb-5">
        {/* Create Story card */}
        <div
        onClick={()=>setShowModel(true)}
          className="
            flex-none w-32 aspect-[3/4]
            rounded-lg border-2 border-dashed border-indigo-300
            bg-gradient-to-b from-indigo-50 to-white
            cursor-pointer hover:shadow-lg
            transition-all duration-200
          "
          // onClick={() => console.log('open create-story modal')}
        >
          <div className="h-full flex flex-col items-center justify-center p-4">
            <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center mb-3">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <p className="text-sm font-medium text-slate-700 text-center">
              Create Story
            </p>
          </div>
        </div>

        {/* Story cards */}
        {stories.map((story, idx) => (
          <div
            key={idx}
            onClick={()=>setViewStory(story)}
            className="
              flex-none relative w-32 aspect-[3/4]
              rounded-lg
              bg-gradient-to-b from-indigo-500 to-purple-600
              hover:from-indigo-700 hover:to-purple-800
              cursor-pointer hover:shadow-lg
              transition-all duration-200 active:scale-95
            "
          >
            <img
              src={story.user.profile_picture}
              alt=""
              className="
                absolute w-8 h-8
                top-3 left-3 z-10
                rounded-full ring ring-gray-100 shadow
              "
            />
            <p
              className="
                absolute top-12 left-3
                w-20 text-white/60 text-sm truncate
              "
            >
              {story.content}
            </p>
            <p className="
                absolute bottom-1 right-2 z-10
                text-xs text-white
              ">
              {moment(story.createdAt).fromNow()}
            </p>
            {
              story.media_type !== 'text' && (
                <div className='absolute inset-0 z-1 rounded-lg bg-black overflow-hidden'>
                  {
                    story.media_type === 'image' ?
                      <img src={story.media_url} alt="" className="w-full h-full object-cover hover:scale-110 transition duration-500 opatcity-70 hover:opacity-80" />
                      :
                      <video src={story.media_url} className="w-full h-full object-cover hover:scale-110 transition duration-500 opatcity-70 hover:opacity-80" />
                  }
                </div>
              )
            }

          </div>
        ))}
      </div>
      {/* Add Story model */}
      {
        showModel && <StoryModel setShowModel={setShowModel} fetchStories={fetchStories}/>
      }
      {/* view story model */}
      {viewStory && <StoryViewer viewStory={viewStory} setViewStory={setViewStory}/>}
    </div>
  )
}

export default StoriesBar
