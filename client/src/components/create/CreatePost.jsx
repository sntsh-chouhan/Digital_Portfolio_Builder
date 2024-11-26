import React, { useState, useEffect, useContext } from 'react';

import { styled, Box, TextareaAutosize, Button, InputBase, FormControl, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

const Container = styled(Box)(({ theme }) => ({
    margin: '50px auto',
    maxWidth: '800px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    [theme.breakpoints.down('md')]: {
        margin: '20px',
        padding: '10px',
    },
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '20px',
});

const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 15px;
`;

const InputTextField = styled(InputBase)(({ theme }) => ({
    flex: 1,
    fontSize: '18px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#fff',
    '&:focus-visible': {
        outline: '2px solid #3f51b5',
    },
}));

const Textarea = styled(TextareaAutosize)(({ theme }) => ({
    width: '100%',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '10px',
    fontSize: '16px',
    marginTop: '20px',
    '&:focus-visible': {
        outline: '2px solid #3f51b5',
    },
}));

const ProjectContainer = styled(Box)`
    margin-top: 30px;
    background: #ffffff;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
`;

const AddButton = styled(Button)`
    margin-top: 20px;
    width: 100%;
    background-color: #3f51b5;
    color: white;
    &:hover {
        background-color: #2c387e;
    }
`;

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date(),
};

const CreatePost = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');
    const { account } = useContext(DataContext);
    const [projects, setProjects] = useState([{ name: '', link: '', description: '' }]);

    const url = post.picture
        ? post.picture
        : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const data = new FormData();
                data.append('name', file.name);
                data.append('file', file);

                const response = await API.uploadFile(data);
                post.picture = response.data;
            }
        };
        getImage();
        post.categories = location.search?.split('=')[1] || 'All';
        post.username = account.username;
    }, [file]);

    const savePost = async () => {
        await API.createPost({ ...post, projects });
        navigate('/');
    };

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const handleProjectChange = (index, field, value) => {
        const updatedProjects = [...projects];
        updatedProjects[index][field] = value;
        setProjects(updatedProjects);
    };

    const addProject = () => {
        setProjects([...projects, { name: '', link: '', description: '' }]);
    };

    return (
        <Container>
            <Image src={url} alt="post" />

            <StyledFormControl>
                <InputTextField
                    onChange={(e) => handleChange(e)}
                    name="title"
                    placeholder="Your name"
                />
                <Button onClick={savePost} variant="contained" color="primary">
                    Publish
                </Button>
            </StyledFormControl>

            <Textarea
                rowsMin={5}
                placeholder="Tell about yourself"
                name="description"
                onChange={(e) => handleChange(e)}
            />

            {/* Project Section */}
            <Typography variant="h6" style={{ marginTop: '30px', color: '#3f51b5' }}>
                Add Projects
            </Typography>
            {projects.map((project, index) => (
                <ProjectContainer key={index}>
                    <InputTextField
                        placeholder="Project Name"
                        value={project.name}
                        onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
                        style={{ marginBottom: '10px' }}
                    />
                    <InputTextField
                        placeholder="Project Link"
                        value={project.link}
                        onChange={(e) => handleProjectChange(index, 'link', e.target.value)}
                        style={{ marginBottom: '10px' }}
                    />
                    <Textarea
                        rowsMin={3}
                        placeholder="Project Description"
                        value={project.description}
                        onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                    />
                </ProjectContainer>
            ))}
            <AddButton onClick={addProject} variant="outlined">
                Add More Project
            </AddButton>
        </Container>
    );
};

export default CreatePost;
