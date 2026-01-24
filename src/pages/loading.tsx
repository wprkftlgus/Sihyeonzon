import loadingGif from '../assets/loading.gif'

function Loading(){
    return(
    <div className='mx-auto w-[300px] flex flex-col items-center justify-center mt-[300px]'>
      <img src={loadingGif}></img>
      <div className='text-2xl font-bold'>Page loading</div>
    </div>
    )
}

export default Loading;