import fs from "fs"
import { contextBridge } from "electron"
// import { LOCAL_FOLDER_PATH } from "./constants"
import { Photo } from "./photo"
// import { dialog } from "electron"
import copy from "copy-to-clipboard"

contextBridge.exposeInMainWorld("api", { getLocalPhotos })

function getLocalPhotos(
   folderPath: string
): Photo[]
{

   copy("here-here")
   copy(window.process.argv.join(", "))

   // console.log(window.process.argv)
   // console.log("here", folderPath)

   // dialog.showMessageBoxSync({ 
   //    message: `${folderPath}`
   //    , buttons: ["OK"] 
   // })

   // let folderPath = LOCAL_FOLDER_PATH
   if(!folderPath.endsWith("/"))
      folderPath += "/"

   const fileNames = fs.readdirSync(folderPath)

   const photos = fileNames
      .filter(fn => fn.match(/\.(jpg|jpeg)$/i) != null)
      .map(fn => ({
         url: `file:///${folderPath}${fn}`,
         title: "",
         attribution: "",
      }))

   return photos
}
