import { LoadingButton } from "@mui/lab";
import { Card, Checkbox, Grid, TextField, Typography } from "@mui/material";
import { Box, styled, useTheme } from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import ImageSlider from "../Components/Carousel/ImageSlider";
import { Paragraph } from "../Components/Typography";
import { apiURL } from "../Constant/ApiUrlConstant";
import { AxiosResponse } from "axios";
import { postRequest } from "../Services/httpservice";
import Loader from "../Components/loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FlexBox = styled(Box)(() => ({ display: "flex", alignItems: "center" }));
const JustifyBox = styled(FlexBox)(() => ({ justifyContent: "center" }));
const ContentBox = styled(Box)(() => ({
    height: "100%",
    padding: "10px",
    position: "relative",
    background: "rgba(0, 0, 0, 0.01)",
}));

const JWTRoot = styled(JustifyBox)(() => ({
    // background: '#1A2038',
    minHeight: "100vh !important",

    "& .card": {
        // maxWidth: 800,
        // minHeight: 400,
        margin: "1rem",
        display: "flex",
        borderRadius: 12,
        alignItems: "center",
    },
}));

const H4 = styled("h4")(({ theme }) => ({
    fontSize: "1.3rem",
    fontWeight: "600",
    marginBottom: "16px",
    textTransform: "capitalize",
    color: "#2a2626",
}));


const Register = () => {
    return (
        <JWTRoot>
            <Card className="card">
                <Grid container>
                    <Grid item sm={6} xs={12}></Grid>
                </Grid>
            </Card>
        </JWTRoot>
    )
}

export default Register;
