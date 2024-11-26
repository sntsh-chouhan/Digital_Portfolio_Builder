
import { styled, Box, Typography } from '@mui/material';

const Image = styled(Box)`
    width: 100%;
    background:  #000;
    height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Heading = styled(Typography)`
    font-size: 80px;
    color: #FFFFFF;
    line-height: 1;
    font-weight: bold;
`;

const SubHeading = styled(Typography)`
    margin: 10px;
    font-size: 20px;
    background: #000;
    color: #FFFFFF;
`;

const Banner = () => {
    
    return (
        <Image>
            <Heading>Show case yourself</Heading>
            <SubHeading> by santosh chouhan</SubHeading>
        </Image>
    )
}

export default Banner;