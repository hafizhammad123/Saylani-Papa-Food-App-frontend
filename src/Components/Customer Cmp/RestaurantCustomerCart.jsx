import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, Container, Stack } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import * as React from 'react';
import { useEffect } from 'react';
import { BASE_URL } from '../../Utils/Utils';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;

    //states//

})(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
    variants: [
        {
            props: ({ expand }) => !expand,
            style: {
                transform: 'rotate(0deg)',
            },
        },
        {
            props: ({ expand }) => !!expand,
            style: {
                transform: 'rotate(180deg)',
            },
        },
    ],
}));

export default function RestaurantCustomerCart() {
    const [expanded, setExpanded] = React.useState(false);
    const [data, setData] = React.useState([])
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        getRestaurantCustomer()
    }, [])

    const getRestaurantCustomer = async () => {
        try {
            let getData = await axios.get(`${BASE_URL}/resturant/customerShowRest`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            })
            console.log(getData.data.Data)
            setData(getData.data.Data)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Container>
            <Stack flexDirection={"row"} justifyContent={'center'} flexWrap={"wrap"} gap={"20px"}>
                {data.map((data) => {
                    return (
                        <Card sx={{ maxWidth: 345 }}>
                            <CardHeader
                               
                                action={
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                title={data.RestaurantName}

                            />
                            <CardMedia
                                component="img"
                                height="194"
                                image={data.imageUrl}
                            />
                            <CardContent>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {data.RestaurantDetail}
                                </Typography>
                            </CardContent>
                            <Stack flexDirection={"row"} justifyContent={"center"}>
                                <Link style={{ textDecoration: "none", color: "whitef" }} to={`/meun/${data._id}`}
                                    state={{ restName : data.RestaurantName }}
                                >
                                    <Button variant='contained' sx={{ bgcolor: "#a0e500ff", width: "200px" }}>View menu</Button></Link>
                            </Stack>


                        </Card>
                    )
                })}
            </Stack>


        </Container>
    );
}
