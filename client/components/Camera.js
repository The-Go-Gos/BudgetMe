import React from 'react'

import {Capacitor, CameraResultType} from '@capacitor/core'
import {Plugins} from '@capacitor/core'
import {render} from 'enzyme'
const {Camera} = Plugins
// const position = await Plugins.Geolocation.getCurrentPosition();
// async takePicture() {
//   const image = await Camera.getPhoto({
//     quality: 90,
//     allowEditing: true,
//     resultType: CameraResultType.Uri
//   });
//   // image.webPath will contain a path that can be set as an image src.
//   // You can access the original file using image.path, which can be
//   // passed to the Filesystem API to read the raw data of the image,
//   // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
//   const imageUrl = image.webPath;
//   // Can be set to the src of an image now
//   imageElement.src = imageUrl;
// }

class TakePhoto extends React.Component {
  constructor() {
    super()
    this.state = {}
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick = () => {
    console.log('PICPICPICs')
    async function takePicture() {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.Uri
      })
      console.log(image)
      const imageUrl = image.webPath
      console.log('IMAGEURL', imageUrl)
      // const imageElement.src = imageUrl;
    }
    takePicture()
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Take photo</button>
      </div>
    )
  }
}
export default TakePhoto
