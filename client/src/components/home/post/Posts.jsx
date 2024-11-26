import { useEffect, useState } from 'react'; 
import { Grid, Box, Typography } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import { styled } from '@mui/system'; // Add this import for styled components

// Styled components for the card
const Heading = styled('h1')`
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
`;

const CardContainer = styled(Box)`
  margin: 10px;
  position: relative;
  background-size: cover;
  background-image: url('/background.jpg');
  background-position: center;
  height: 200px;
  width: 90%;
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease-in-out;
  }
`;

const Portrait = styled('img')`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid white;
`;

const NameText = styled(Typography)`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 18px;
  font-weight: bold;
  color: white;
`;

const Posts = () => {
    const [posts, getPosts] = useState([]);
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    // Dummy posts object
    const dummyPosts = [
        { _id: '1', username: 'John Doe' },
        { _id: '2', username: 'Jane Smith' },
        { _id: '3', username: 'Bob Johnson' }
    ];

    useEffect(() => {
        // Using dummy posts data
        getPosts(dummyPosts);
    }, []);

    return (
        <>
            {/* <h1 className="heading">Explore All the Portfolio</h1> */}
            {
                
                posts?.length ? posts.map(post => (
                    <Grid item lg={3} sm={4} xs={12} key={post._id}>
                        <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/portfolio/${post._id}`}>
                            <CardContainer>
                                <Portrait src="/dummyprofile.png" alt="portrait" />
                                <NameText>{post.username}</NameText>
                            </CardContainer>
                        </Link>
                    </Grid>
                )) : <Box style={{color: '878787', margin: '30px 80px', fontSize: 18}}>
                        No data is available for the selected category.
                    </Box>
            }
        </>
    );
}

export default Posts;
