import React from 'react'
import './Feature.css'
import Stack from '@mui/material/Stack';
import { Box, Typography, colors } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container } from '@mui/material'

export default function Feature() {

    const theme = createTheme({
        palette: {
            primary: {
                light: colors.lightBlue[100],
                main: colors.lightBlue[400]
            },
            secondary: {
                light: colors.orange[100],
                main: colors.orange[400],
            },
            custome: {
                light: colors.teal[100],
                main: colors.teal[500],
            }
        },
    });

    return (
        <Container>
            <ThemeProvider theme={theme}>
                <Stack
                    direction="row"
                    spacing={20}
                    justifyContent="center"
                    mt={5}
                >
                    <Box textAlign='center' bgcolor='primary.light' style={{
                        width: '400px', border: '2px solid #B3E5FC', padding: '20px', borderRadius: '10px'
                    }}>
                        <div className='customercare'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="76" height="75" viewBox="0 0 76 75" fill="none">
                                <path d="M12.3594 2.95306C12.2949 2.96478 12.2305 2.98236 12.1719 2.99994C11.4746 3.15814 10.9824 3.7851 11 4.49994V17.9999H24.5C25.0391 18.0058 25.543 17.7246 25.8184 17.2558C26.0879 16.7871 26.0879 16.2128 25.8184 15.7441C25.543 15.2753 25.0391 14.9941 24.5 14.9999H15.9688C21.6523 9.43939 29.416 5.99994 38 5.99994C55.4141 5.99994 69.5 20.0859 69.5 37.4999C69.5 54.914 55.4141 68.9999 38 68.9999C20.5859 68.9999 6.5 54.914 6.5 37.4999C6.5 32.291 7.7832 27.3867 10.0156 23.0624L7.34375 21.7031C4.89453 26.4374 3.5 31.8105 3.5 37.4999C3.5 56.537 18.9629 71.9999 38 71.9999C57.0371 71.9999 72.5 56.537 72.5 37.4999C72.5 18.4628 57.0371 2.99994 38 2.99994C28.6602 2.99994 20.2109 6.7558 14 12.7968V4.49994C14.0176 4.06635 13.8418 3.65033 13.5312 3.35736C13.2148 3.05853 12.7871 2.91205 12.3594 2.95306ZM38 7.49994C37.1738 7.49994 36.5 8.17377 36.5 8.99994C36.5 9.82611 37.1738 10.4999 38 10.4999C38.8262 10.4999 39.5 9.82611 39.5 8.99994C39.5 8.17377 38.8262 7.49994 38 7.49994ZM52.25 11.2968C51.4238 11.2968 50.75 11.9706 50.75 12.7968C50.75 13.623 51.4238 14.2968 52.25 14.2968C53.0762 14.2968 53.75 13.623 53.75 12.7968C53.75 11.9706 53.0762 11.2968 52.25 11.2968ZM62.7031 21.7499C61.877 21.7499 61.2031 22.4238 61.2031 23.2499C61.2031 24.0761 61.877 24.7499 62.7031 24.7499C63.5293 24.7499 64.2031 24.0761 64.2031 23.2499C64.2031 22.4238 63.5293 21.7499 62.7031 21.7499ZM28.0625 25.3593C23.9023 25.3593 20.9375 28.0722 20.9375 31.9687V32.0156H24.0312V31.9687C24.0312 29.7128 25.5898 28.2187 27.9219 28.2187C30.1016 28.2187 31.7656 29.6601 31.7656 31.5937C31.7656 33.1464 31.0801 34.2714 28.25 37.2187L21.125 44.6249V47.0156H35.375V44.0624H25.6719V43.8281L30.4062 39.0468C33.9512 35.4609 35 33.6445 35 31.4062C35 27.9199 32.0762 25.3593 28.0625 25.3593ZM47.8906 25.8749C44.123 31.5175 40.9707 36.4335 39.0781 39.8906V42.9374H49.3906V47.0156H52.5312V42.9374H55.4844V39.9843H52.5312V25.8749H47.8906ZM49.25 28.7812H49.4375V40.0781H42.2188V39.8437C44.709 35.5195 47.1582 31.8105 49.25 28.7812ZM9.5 35.9999C8.67383 35.9999 8 36.6738 8 37.4999C8 38.3261 8.67383 38.9999 9.5 38.9999C10.3262 38.9999 11 38.3261 11 37.4999C11 36.6738 10.3262 35.9999 9.5 35.9999ZM66.5 35.9999C65.6738 35.9999 65 36.6738 65 37.4999C65 38.3261 65.6738 38.9999 66.5 38.9999C67.3262 38.9999 68 38.3261 68 37.4999C68 36.6738 67.3262 35.9999 66.5 35.9999ZM13.2969 50.2499C12.4707 50.2499 11.7969 50.9238 11.7969 51.7499C11.7969 52.5761 12.4707 53.2499 13.2969 53.2499C14.123 53.2499 14.7969 52.5761 14.7969 51.7499C14.7969 50.9238 14.123 50.2499 13.2969 50.2499ZM62.7031 50.2499C61.877 50.2499 61.2031 50.9238 61.2031 51.7499C61.2031 52.5761 61.877 53.2499 62.7031 53.2499C63.5293 53.2499 64.2031 52.5761 64.2031 51.7499C64.2031 50.9238 63.5293 50.2499 62.7031 50.2499ZM23.75 60.7031C22.9238 60.7031 22.25 61.3769 22.25 62.2031C22.25 63.0292 22.9238 63.7031 23.75 63.7031C24.5762 63.7031 25.25 63.0292 25.25 62.2031C25.25 61.3769 24.5762 60.7031 23.75 60.7031ZM52.25 60.7031C51.4238 60.7031 50.75 61.3769 50.75 62.2031C50.75 63.0292 51.4238 63.7031 52.25 63.7031C53.0762 63.7031 53.75 63.0292 53.75 62.2031C53.75 61.3769 53.0762 60.7031 52.25 60.7031ZM38 64.4999C37.1738 64.4999 36.5 65.1738 36.5 65.9999C36.5 66.8261 37.1738 67.4999 38 67.4999C38.8262 67.4999 39.5 66.8261 39.5 65.9999C39.5 65.1738 38.8262 64.4999 38 64.4999Z" fill="#12AEE0" />
                            </svg>
                        </div>

                        <Typography variant='h4' component='h4' color='primary.main'>Customer care</Typography>
                        <Typography>24h hour follow up</Typography>
                    </Box>

                    <Box textAlign='center' bgcolor='secondary.light' style={{
                        width: '400px', border: '2px solid #FFE0B2', padding: '20px', borderRadius: '10px'
                    }}>
                        <div className='freeship'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="88" height="75" viewBox="0 0 88 75" fill="none">
                                <g clipPath="url(#clip0_0_637)">
                                    <path d="M5.42869 12C2.54542 12 0.168945 14.0332 0.168945 16.5V52.5C0.168945 54.9668 2.54542 57 5.42869 57H12.606C13.4416 61.2539 17.7631 64.5 22.9612 64.5C28.1593 64.5 32.4807 61.2539 33.3163 57H49.5886C50.8624 57 51.9925 56.5254 52.8759 55.8281C53.7799 56.5195 54.9374 57 56.2728 57H58.1905C59.026 61.2539 63.3475 64.5 68.5456 64.5C74.3327 64.5 79.065 60.4512 79.065 55.5C79.065 50.5488 74.3327 46.5 68.5456 46.5C63.3475 46.5 59.026 49.7461 58.1905 54H56.2728C55.9784 54 55.5058 53.8125 55.1223 53.4844C54.7388 53.1562 54.5196 52.752 54.5196 52.5V24C54.5196 23.748 54.7388 23.3438 55.1223 23.0156C55.5058 22.6875 55.9784 22.5 56.2728 22.5H70.2988C71.7439 22.5 73.7574 23.8887 75.0107 25.2188L75.2298 25.5H66.7923C63.9844 25.5 61.5326 27.4395 61.5326 30V36C61.5326 37.248 62.1901 38.3438 63.1215 39.1406C64.0529 39.9375 65.3336 40.5 66.7923 40.5H84.3248V52.5C84.3248 52.752 84.1056 53.1562 83.7221 53.4844C83.3386 53.8125 82.866 54 82.5715 54H79.065V57H82.5715C84.0303 57 85.311 56.4375 86.2424 55.6406C87.1738 54.8438 87.8313 53.748 87.8313 52.5V38.1094C87.8313 36.4219 87.0779 34.875 86.4068 33.7031C85.7356 32.5312 85.037 31.6875 85.037 31.6875V31.6406L77.8597 23.3906H77.8049V23.3438C76.2503 21.6797 73.7574 19.5 70.2988 19.5H56.2728C55.6428 19.5 55.0675 19.5996 54.5196 19.7812V16.5C54.5196 14.0332 52.1431 12 49.2599 12H5.42869ZM5.42869 15H49.2599C50.2324 15 51.0131 15.668 51.0131 16.5V52.7812C51.0131 53.4785 50.4036 54 49.5886 54H33.3163C32.4807 49.7461 28.1593 46.5 22.9612 46.5C17.7631 46.5 13.4416 49.7461 12.606 54H5.42869C4.45618 54 3.67544 53.332 3.67544 52.5V16.5C3.67544 15.668 4.45618 15 5.42869 15ZM66.7923 28.5H77.8597L82.188 33.4219L82.2428 33.4688C82.2771 33.5098 82.7496 34.084 83.2838 35.0156C83.729 35.7891 83.9618 36.709 84.1056 37.5H66.7923C66.4978 37.5 66.0253 37.3125 65.6418 36.9844C65.2582 36.6562 65.0391 36.252 65.0391 36V30C65.0391 29.2617 66.0938 28.5 66.7923 28.5ZM8.93518 30V38.7188H11.2363V35.1094H15.4003V33.6094H11.2363V31.6406H15.9482V30H8.93518ZM17.7014 30V38.3906H19.619V35.1094H21.9202C23.4953 35.1094 23.4953 36.1523 23.6734 37.5C23.6734 37.7988 23.6597 38.0918 23.8378 38.3906H26.1389C25.7896 38.0918 25.7554 37.043 25.7554 36.8906C25.7554 34.793 24.7349 34.5 24.3857 34.5C24.913 34.3477 25.9198 33.7383 25.9198 32.3906C25.9198 30.4395 23.8378 30 22.9612 30H17.7014ZM28.2209 30V38.7188H35.7818V37.0312H30.3029V34.9688H35.2339V33.4688H30.3029V31.6406H35.5626V30H28.2209ZM38.1925 30V38.7188H45.7534V37.0312H40.3293V34.9688H45.2055V33.4688H40.3293V31.6406H45.589V30H38.1925ZM19.7834 31.5H22.2489C22.7762 31.5 23.8378 31.6699 23.8378 32.7188C23.8378 33.9199 22.7762 33.8906 22.2489 33.8906H19.7834V31.5ZM22.9612 49.5C26.858 49.5 29.9741 52.166 29.9741 55.5C29.9741 58.834 26.858 61.5 22.9612 61.5C19.0643 61.5 15.9482 58.834 15.9482 55.5C15.9482 52.166 19.0643 49.5 22.9612 49.5ZM68.5456 49.5C72.4424 49.5 75.5586 52.166 75.5586 55.5C75.5586 58.834 72.4424 61.5 68.5456 61.5C64.6487 61.5 61.5326 58.834 61.5326 55.5C61.5326 52.166 64.6487 49.5 68.5456 49.5Z" fill="#E87B16" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_0_637">
                                        <rect width="87.6623" height="75" fill="white" transform="translate(0.168945)" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>

                        <Typography variant='h4' component='h4' color='secondary.main'>Free ship</Typography>
                        <Typography> Free shipping for 150$ and up</Typography>
                    </Box>

                    <Box textAlign='center' bgcolor='custome.light' style={{
                        width: '400px', border: '2px solid #B2DFDB', padding: '20px', borderRadius: '10px'
                    }}>
                        <div className='return'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="76" height="75" viewBox="0 0 76 75" fill="none">
                                <g clipPath="url(#clip0_0_643)">
                                    <path d="M38.0001 4.5C28.9052 4.5 21.5001 11.9051 21.5001 21C21.5001 30.0949 28.9052 37.5 38.0001 37.5C47.095 37.5 54.5001 30.0949 54.5001 21C54.5001 11.9051 47.095 4.5 38.0001 4.5ZM38.0001 7.5C45.4737 7.5 51.5001 13.5264 51.5001 21C51.5001 28.4736 45.4737 34.5 38.0001 34.5C30.5265 34.5 24.5001 28.4736 24.5001 21C24.5001 13.5264 30.5265 7.5 38.0001 7.5ZM36.5001 10.5V13.1543C32.5281 13.8203 32.4015 17.3501 32.4015 17.7686C32.4015 21.4826 35.4078 22.1534 37.8243 22.6934C39.9933 23.1794 41.2198 23.5264 41.2198 24.9844C41.2198 25.8589 40.802 27.3281 38.003 27.3281C37.9415 27.3281 36.4863 27.3173 35.5743 26.4053C35.0358 25.8668 34.7754 25.0882 34.8009 24.0938L34.8038 24H32.0177L32.0206 24.0967C32.1106 27.2467 33.584 29.0466 36.503 29.6016V31.5H36.6466H39.3771H39.5001V29.6484C43.7691 28.9554 44.0001 25.6464 44.0001 24.9639C44.0016 21.3774 40.9952 20.6878 38.5802 20.1328C36.4112 19.6348 35.1847 19.2846 35.1847 17.9121C35.1847 16.2696 36.0926 15.5039 38.0441 15.5039C40.1681 15.5039 40.7273 16.8105 40.8038 18H43.587C43.5885 16.836 43.1158 15.5839 42.2833 14.6719C41.5543 13.8754 40.5967 13.3627 39.4972 13.1572V10.5H39.3771H36.6437H36.5001ZM20.6974 37.5C16.442 37.5 14.5096 38.5302 12.38 39.3721H12.3771C8.31685 40.981 1.34972 44.332 1.34972 44.332C1.17192 44.4174 1.01267 44.537 0.881085 44.6839C0.749498 44.8308 0.648144 45.0022 0.582814 45.1883C0.517483 45.3745 0.489456 45.5716 0.500332 45.7685C0.511208 45.9655 0.560775 46.1583 0.646201 46.3361C0.731628 46.5139 0.85124 46.6731 0.998207 46.8047C1.14517 46.9362 1.31661 47.0375 1.50274 47.1028C1.68886 47.1681 1.88602 47.196 2.08296 47.1851C2.2799 47.1742 2.47275 47.1245 2.6505 47.0391C2.6505 47.0391 9.66019 43.6757 13.4816 42.1611C15.822 41.236 16.8798 40.5 20.6974 40.5C29.1224 40.5 28.8945 44.2823 32.3458 46.3535H32.3487C33.5869 47.0961 35.5026 47.704 37.6925 48.2607C37.9189 48.3872 38.1743 48.4528 38.4337 48.4512H38.4366C40.8989 49.0468 43.5044 49.5 45.5001 49.5C47.2532 49.5 48.4918 49.8362 49.1505 50.25C49.8092 50.6638 50.0001 51.0052 50.0001 51.75C50.0001 52.6231 49.7992 52.9213 49.1417 53.3115C48.4843 53.7017 47.226 54 45.5001 54H36.7989C33.1259 54 27.9132 52.5586 27.9132 52.5586C27.7219 52.4973 27.5202 52.4751 27.3201 52.4932C27.12 52.5113 26.9256 52.5695 26.7484 52.6642C26.5712 52.7589 26.4148 52.8882 26.2886 53.0445C26.1623 53.2007 26.0687 53.3808 26.0134 53.5739C25.958 53.7671 25.942 53.9693 25.9664 54.1688C25.9907 54.3682 26.0548 54.5607 26.1549 54.7349C26.2551 54.9091 26.3892 55.0614 26.5493 55.1827C26.7094 55.3041 26.8923 55.3921 27.087 55.4414C27.087 55.4414 32.384 57 36.7989 57H45.5001C47.5303 57 49.2704 56.7256 50.6739 55.8926C51.0958 55.6422 51.4672 55.318 51.7902 54.9492C51.9029 54.9066 52.0101 54.8505 52.1095 54.7822L65.6007 45.709C67.9399 44.3212 69.553 43.927 70.5138 43.9453C71.4749 43.9636 71.8388 44.268 72.1456 44.6689C72.5904 45.2508 72.6253 45.5594 72.3361 46.2451C72.0468 46.9308 71.22 47.9203 69.7726 48.9463C67.9715 50.2242 48.1517 63.3894 45.8224 64.7373C44.0987 65.7363 42.709 66.7999 41.1202 67.251C39.532 67.7019 37.6533 67.6968 34.5812 66.2021H34.5782C32.5264 65.2026 23.8591 60.6761 21.046 59.2236C19.4915 58.4202 18.1809 57.9763 16.8419 58.0518C15.5029 58.1272 14.3689 58.7113 13.1769 59.4727C13.1729 59.4756 13.169 59.4785 13.1651 59.4814L9.11925 62.1211C8.95173 62.2275 8.80698 62.3661 8.6934 62.5288C8.57982 62.6916 8.49965 62.8752 8.45756 63.0692C8.41546 63.2631 8.41227 63.4635 8.44816 63.6587C8.48405 63.8539 8.55832 64.04 8.66665 64.2063C8.77499 64.3726 8.91524 64.5157 9.07929 64.6274C9.24334 64.7391 9.42791 64.8171 9.62233 64.857C9.81675 64.8968 10.0171 64.8977 10.2119 64.8596C10.4067 64.8214 10.5919 64.745 10.7569 64.6348L14.8058 61.9951C15.8393 61.3367 16.4507 61.0804 17.0118 61.0488C17.5767 61.017 18.3301 61.1976 19.6691 61.8896C22.4565 63.3289 31.0107 67.799 33.2657 68.8975C36.8082 70.6217 39.657 70.7851 41.9405 70.1367C44.224 69.4883 45.8525 68.1866 47.3253 67.333C50.45 65.5249 69.249 52.9947 71.507 51.3926V51.3955C73.2275 50.1759 74.4711 48.8989 75.0987 47.4111C75.7264 45.9233 75.5242 44.1504 74.5275 42.8467C73.7438 41.8226 72.3439 40.9791 70.5695 40.9453C69.3145 40.9214 67.8133 41.3957 66.1603 42.1377C66.0978 41.8377 66.2436 41.5065 66.1105 41.2178C65.6005 40.1115 64.464 39.3322 63.1866 39.0791H63.1837C61.508 38.7478 59.6103 39.264 57.7316 40.1279C57.5978 39.7207 57.4958 39.2938 57.2247 38.9707C56.4203 38.012 55.2632 37.6714 54.1866 37.5879C52.0335 37.421 49.7938 38.124 48.1749 39.0879C45.9281 40.425 39.214 44.6745 38.2374 45.293C36.2324 44.7526 34.4252 44.0994 33.8898 43.7783V43.7812C32.5171 42.9574 30.1554 37.5 20.6974 37.5ZM53.9552 40.5791C54.5547 40.6256 54.8414 40.7989 54.9249 40.8984C54.9885 40.9742 55.088 41.1155 55.0421 41.5576L47.6359 46.6641C46.9648 46.565 46.2638 46.5 45.5001 46.5C44.7063 46.5 43.62 46.3808 42.4357 46.1924C45.0455 44.5461 48.2802 42.5123 49.7071 41.6631C50.7133 41.064 52.7562 40.4862 53.9552 40.5791ZM61.6046 41.9971C62.0013 41.9604 62.3435 41.9691 62.6036 42.0205C63.2267 42.144 63.2868 42.2597 63.3859 42.4746C63.4594 42.6343 63.482 43.0361 63.4298 43.5527L52.8624 50.6602C52.6004 49.5784 51.9606 48.6125 51.0665 47.9414L57.257 43.6758C57.3102 43.64 57.3611 43.6009 57.4093 43.5586C58.8375 42.6015 60.4517 42.1035 61.6046 41.9971Z" fill="#06C825" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_0_643">
                                        <rect width="75" height="75" fill="white" transform="translate(0.5)" />
                                    </clipPath>
                                </defs>
                            </svg>

                            <Typography variant='h4' component='h4' color='custome.main'>Return</Typography>
                            <Typography>Within 7 Days</Typography>
                        </div>
                    </Box>
                </Stack>
            </ThemeProvider >
        </Container>
    )
}
