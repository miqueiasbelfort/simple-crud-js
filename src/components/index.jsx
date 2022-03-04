import {Button, DivPopup} from "./style"
import axios from "axios"
import {useEffect, useState} from "react"

function Main(){

    // get the data
    const [posts, setPosts] = useState([])
    // get the input value
    const [text, setText] = useState()
    // get the input value of edite
    const [editText, setEditeText] = useState()
    // cheking if click in button edite
    const [checked, setChecked] = useState("none")

    // get the api with axios.get
    useEffect(() => {
        axios.get("http://localhost:5000/posts").then(
            response => setPosts(response.data)
        )
    }, [])


    //add new posts in database 
    const addNewPosts = () => {
        axios.post("http://localhost:5000/posts", {
            postText: `${text}`
        }).then(
            alert("Add a new post with success!")
        ).catch (
            err => {
                alert("Erro in add a new Post")
                console.error(err)
            }
        )
    }

    // delete post funcion
    const deletePost = (e) => {
        const idPost = e.target.id
        axios.delete(`http://localhost:5000/posts/${idPost}`)
            .then(alert("Post deleted with success!"))
            .catch(err => {
                alert("Erro in deleting the post!")
                console.log(err)
            })
    }

    // edite the post funcion
    const editePost = (e) => {
        const idPost = e.target.id
        axios.put(`http://localhost:5000/posts/${idPost}`, {
            postText: `${editText}`
        })
            .then(alert("Edited pot with success!"))
            .catch(err => {
                alert("Erro in editing the post!")
                console.log(err)
            })
        setChecked("none")
    }

    // show edite post
    const showEdite = () => {
        setChecked("block")
    }


    return (
        <div className="container p-5">
            <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">Adicionar um novo post</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="formGroupExampleInput" 
                    placeholder="Vamos mudar o mundo!"
                    onChange={e => setText(e.target.value)}
                />
            </div>
            <Button 
                background="none" 
                backgroundHover="#0d6efd"
                onClick={addNewPosts}
            >Enviar</Button>

            {posts.map(rePost => (
                    <div className="card mt-4" key={rePost.id}>
                        <div className="card-body">
                            {rePost.postText}
                        </div>
                        <div className="card-body">
                            <Button
                                id={`${rePost.id}`} 
                                background="none" 
                                backgroundHover="#dc3545"
                                onClick={deletePost}
                            >Deletar</Button>
                            
                            <Button
                                background="none" 
                                backgroundHover="#198754"
                                onClick={showEdite}    
                            >Editar</Button>
                        </div>
                        <DivPopup 
                            className="card-body popup"
                            display={checked}
                        >
                            <h3>Editar Post</h3>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="formGroupExampleInput" 
                                placeholder=""
                                onChange={e => setEditeText(e.target.value)}
                            />
                            <Button
                                id={`${rePost.id}`}  
                                className="mt-2"
                                background="none" 
                                backgroundHover="#ffc107"
                                onClick={editePost}    
                            >Salvar</Button>
                        </DivPopup>
                    </div>
                ))
            }
        </div>
    )
}

export default Main