import React,{useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux'
import HTMLVideo from './HTMLVideo.js';

import './App.css';
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

function App() {
  const url = useSelector(x => x.videoURL);
  const err = useSelector(x => x.errorGettingVideo);  
  const videoLoading = useSelector(x => x.videoLoading);  
  const dispatch = useDispatch();  
  const getVideoURL = async () => {
    dispatch({type:'videoLoading',videoLoading:true});
    const iserr = (Math.random()<=0.2);
    if (iserr) throw new Error('could not load video');
    
    await sleep(Math.random()*10*1000);
    return "http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_30fps_normal.mp4"
  }
  const getVideo = async () => {
    try {
      const gvu = await getVideoURL()
      dispatch({type:'videoURL',videoURL:gvu});
    } catch (e)
    {
      dispatch({type:'errorGettingVideo',errorGettingVideo:e});
    }
  }
  useEffect(() => {
    //if (!url) getVideo();
  });

  return  (<div className="App">
      <header className="App-header">
      <h4>sum vide0z</h4>
	   {err ? <div style={{color:'red'}}>ERROR</div> : <HTMLVideo url={url}/>}
	   <button
	   disabled={videoLoading}
	   onClick={getVideo}>load video</button>
      </header>
   </div>);
    

}

export default App;
