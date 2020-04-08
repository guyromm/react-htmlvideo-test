import React,{useRef,useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux'

import './App.css';

function HTMLVideo({url}) {
  const ref = useRef(null);
  const seekProgress = useSelector(x => x.seekProgress);
  const loadProgress = useSelector(x => x.loadProgress);
  const duration = useSelector(x => x.duration);
  const dispatch = useDispatch();
  const computeBuffered = (tr) => {
    let progSum=0;
    for (let i=0;i<tr.length;i++)
      progSum+=(tr.end(i)-tr.start(i));
    return progSum;
  }

  useEffect( () => {
    if (ref.current)
    {
      const cb = computeBuffered(ref.current.buffered);
      dispatch({type:'loadProgress',loadProgress:cb});
    }
  });
  const onProg = (e) =>
	{
	  let tr = e.nativeEvent.target.buffered;
	  const cb = computeBuffered(tr);
	  dispatch({type:'loadProgress',loadProgress:cb});
	}
  const onTimeUpd =
	({ nativeEvent }) =>
	{
	  const ct = nativeEvent.target.currentTime;
	  dispatch({type:'seekProgress',seekProgress:ct});
	}
  
  const onSeeked = ({nativeEvent}) => {
    const ct = nativeEvent.target.currentTime;
    dispatch({type:'seekProgress',ct});
  }
  const durChange = ({nativeEvent}) => {
    const dur = nativeEvent.target.duration;
    dispatch({type:'duration',duration:dur});
  }
  let seekPercent = (seekProgress && duration) ? ((seekProgress/duration)) : 0;
  let loadPercent = (loadProgress && duration) ? ((loadProgress/duration)):0;
  const barWidth=300;
  return (
      <div><video
    onDurationChange={durChange}
    onProgress={onProg}
    onTimeUpdate={onTimeUpd}
    onSeeked={onSeeked}
    style={{maxWidth:'300px',maxHeight:'300px'}}
    ref={ref}
    autoPlay
    muted
    src={url}/>
      <div/>

      <div style={{backgroundColor:'gray',height:'50px',width:barWidth+'px'}}>
      <div style={{index:1,backgroundColor:'lightgray',height:'100%',width:(barWidth*loadPercent)+'px'}}/>
      <div style={{index:2,position:'relative',top:'-50px',backgroundColor:'green',height:'50px',width:(barWidth*seekPercent)+'px'}}/>      
      </div>
      </div>
  );
}

export default HTMLVideo;
