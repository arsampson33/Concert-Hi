import { useRef, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";

export default function UpdatePage({ user }) {
  const bio = useRef();
  const city = useRef();
  const state = useRef();
  const newFile = useRef();
  const params = useParams();
  const [profile, setProfile] = useState([]);
  const [file, setFile] = useState(null);
  useEffect(() => {
    const res = fetch(
      `/api/users/?username=${params.username}`
    )
      .then((res) => res.json())
      .then((res) => setProfile(res));
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setFile(newFile.current.value);
    const newPath = newFile.current.value.replace("C:/fakepath/", "");
    const update = {
      bio: bio.current.value,
      city: city.current.value,
      stateCode: state.current.value,
      userId: user._id,
    };
    // if(file){
    //     const data = new FormData()
    //     const fileName = Date.now() + file.name
    //     data.append('file',file)
    //     data.append('name',fileName)
    //     update.profilePicture = fileName
    //     try{
    //         const res = fetch(`/upload/${newPath}`, {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             // body: JSON.stringify(fileName),
    //           });
    //           console.log(res);

    //     }catch(error){
    //     }
    // }
    try {
      const res = fetch(`/api/users/${profile._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(update),
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Bio</Form.Label>
          <Form.Control type="text" ref={bio} defaultValue={profile.bio} />
          <Form.Text className="text-muted">Tells us about yourself!</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" ref={city} defaultValue={profile.city} />
          <Form.Text className="text-muted">
            What city do you mainly see concerts in?
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            ref={state}
            defaultValue={profile.stateCode}
          />
          <Form.Text className="text-muted">
            What state do you mainly see concerts in?
          </Form.Text>
        </Form.Group>
        {/* <Form.Group className="mb-3" controlId="">
          <Form.Label>Profile Picture</Form.Label>
          <Form.Control type="file"  ref={newFile} />
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group> */}

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
