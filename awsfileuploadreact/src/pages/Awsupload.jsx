import React,{Fragment,useState} from 'react';
import axios from 'axios';

const Awsupload = () => {
    const [file,setFile]=useState([]);
    console.log(file)

    const uploadfilechange=(e)=>{
        setFile(e.target.files)
    };


    const uploadfilehandler=async()=>{
        const formdata=new FormData();
        for(let i=0;i<file.length; i++){
            formdata.append("files",file[i])
        };


        try {
            const response = await axios.post('/api/aws/uploadfile', formdata, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
      
            console.log('Files uploaded to S3. URLs: ', response.data.fileUrls);
          } catch (error) {
            console.error('Error uploading files: ', error.response.data.message);
          }

    }

    // const getmyvideos=async()=>{
    //   try {
    //     const myvideos=await axios.get("/api/aws/object/me");
    //     console.log(myvideos.data.urlArray)
    //   } catch (error) {
        
    //     console.log(error.data)
    //   }
    // }
  return (
    <Fragment>
        <div>
            <input type="file"
            onChange={uploadfilechange}
            multiple
            />
            <div>
                <button 
                onClick={uploadfilehandler}
                >Upload</button>
            </div>
        </div>
        <div>
          <video src="" autoPlay controls></video>
        </div>

        <div>
          {/* <button onClick={getmyvideos}>get my uploaded videos</button> */}
        </div>
    </Fragment>
  )
}

export default Awsupload