import React, {useEffect, useCallback, useState} from 'react'
import { getHolds } from '../../redux/holdReducer'
import axios from "axios"
import {useDispatch, useSelector} from "react-redux"
import UserHold from "./UserHold"
import {getUser} from "../../redux/authReducer"
import { v4 as randomString } from 'uuid'
import {useDropzone} from 'react-dropzone'
import { GridLoader } from 'react-spinners'
import "./account.scss"

const Account = () => {
    const {user} = useSelector((state) => state.reducer)
    const {holds} = useSelector((state) => state.holdReducer)
    const {user_id} = user
    let {profile_pic} = user
    const [update, setUpdate] = useState(false)
    const [picUrl, setUrl] = useState("")
    const [isUploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const getUserHolds = useCallback(async () => {
        try {
          const res = await axios.get(`/api/hold/${user_id}`)
          dispatch(getHolds(res.data))
        } catch (err) {
          console.log(err)
        }
    }, [dispatch, user_id])

    useEffect(() => {
        getUserHolds()
      }, [getUserHolds])


    const getSignedReq = ([file]) => {
        setUploading(true)
        
        const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`
        axios.get('/api/signs3', {
            params: {
                'file-name': fileName,
                'file-type': file.type
            }
        }).then(res => {
            const {signedRequest, url} = res.data
            uploadFile(file, signedRequest, url)
        }).catch(err => {
            console.log(err)
        })
    }

    const uploadFile = (file, signedRequest, url) => {
        const options = {
            headers: {
                'Content-Type': file.type
            }
        }
        axios.put(signedRequest, file, options).then(() => {
            setUrl(url)
            axios.put("/api/user", {user_id, url}).then((res) => {
                console.log(res.data)
                dispatch(getUser(res.data))
                setUpdate(false)
            })
            setUploading(false)
        }).catch(err => {
            setUploading(false)
            if (err.response.status === 403){
                alert(`Your request for a signed URL failed with a status 403. Double check the CORS config and bucket policy in Matts repo.\n${err.stack}`)
            } else {
                alert(`Error: ${err.status}\n ${err.stack}`)
            }
        })
        
    }

    const {getRootProps, getInputProps} = useDropzone({
        accept: "image/*",
        multiple: false,
        onDrop: (file) => {
            getSignedReq(file)
        }
    })

    const mappedHolds = holds.map((hold, index) => {
        return (
                <UserHold 
                key = {`${hold.hold_id}-${index}`} 
                hold = {hold}
                user = {user}
                getUserHolds = {getUserHolds}
            />
        )
    })
    
    return (
        <div className = "account">
            {user_id 
            ?
                <div className = "account-info">
                    <div className = "profile-info">
                        <div className="pic-box">
                            <img className = "profile-picture" alt="profile preview" src = {profile_pic
                                ? 
                                    `${profile_pic}`
                                : 
                                    "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1-744x744.jpg"                        
                                }/>
                            {update
                            ?
                            <div className = "update-box">
                                <div {...getRootProps({className: "drop-zone"})}>
                                    <input {...getInputProps()} />
                                    {isUploading 
                                    ? 
                                        <GridLoader /> 
                                    : 
                                        <h3>Drop File or Click Here</h3>}
                                </div>
                                <button
                                    className = "cancel-button"
                                    onClick = {() => {
                                        setUpdate(!update)
                                    }}> 
                                    Cancel
                                </button> 
                            </div>
                            :
                            <button
                                className = "update-button"
                                onClick = {() => {
                                    setUpdate(!update)
                                }}> 
                                Update Profile Picture 
                            </button>  
                        }
                        </div>
                    </div>
                    <ul className = "user-holds"
                        style = {{listStyle: "none"}} 
                    >
                        <h2>Your Current Holds</h2>
                        {mappedHolds}
                    </ul>
                </div>   
            :
                null
            }
        </div>
    )
}

export default Account