import style from '../styles/app.module.css';
import previewImageSrc from '../assets/widget-preview.png'; 




const PreviewImage = () => {
    
  return (
    <div
        style={{display:'flex', justifyContent:'center', alignContent:'center'}}>
        <img
          className={style.preview_img}
          src={previewImageSrc} alt=""
          style={{  objectFit: 'cover' }}
        />
      </div>
  )
}

export default PreviewImage
