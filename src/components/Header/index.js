import React from 'react';
import { useState } from 'react';
import { Nav, LeftSide, RightSide, ImageDiv, ProfileDiv, SearchDiv } from './style';
import Logo from 'assets/images/Logo.png';
import Search from 'assets/images/search.png';
import Profile from 'assets/images/bubbleProfile.jpg';

//import axios from 'axios';
//import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [value, setValue] = useState('');
    const [show, setShow] = useState('false');

    const handleChangeValue = e => {
        e.preventDefault();
        console.log(e.target.value);
        setValue(e.target.value);
    };

    //const baseUrl ='https://api.themoviedb.org/3/genre/movie/list?api_key=ade4d8200b5fce37d7401ffb7f381d9f&language=en-US';

    //const response = axios.get(baseUrl);

    //const navigate = useNavigate();

    // const handleOnClick = e => {
    //     e.preventDefault();

    //     console.log('Hi');
    // };

    // const handleOnKeyPress = e => {
    //     if (e.key === 'Enter') {
    //         handleOnClick();
    //     }
    // };

    return (
        <>
            <Nav>
                <ImageDiv>
                    <img id="logo" src={Logo} alt="NETFLIX" />
                </ImageDiv>
                <LeftSide>
                    <span>
                        <a href="/">홈</a>
                    </span>
                    <span>
                        <a href="/series">시리즈</a>
                    </span>
                    <span>
                        <a href="/movie">영화</a>
                    </span>
                    <span>
                        <a href="https://about.netflix.com/ko/new-to-watch">
                            NEW! 요즘 대세 콘텐츠
                        </a>
                    </span>
                    <span>
                        <a href="/like">내가 찜한 콘텐츠</a>
                    </span>
                </LeftSide>
                <RightSide>
                    <SearchDiv>
                        <img
                            id="searchImg"
                            src={Search}
                            alt="search"
                            show={show}
                            onClick={() => {
                                show === 'false' ? setShow('true') : setShow('false');
                            }}
                        />
                        {show === 'true' && (
                            <form>
                                <input
                                    className={show ? 'showInput' : 'hideInput'}
                                    id="searchInput"
                                    type="text"
                                    value={value}
                                    onChange={handleChangeValue}
                                    // onKeyPress={handleOnKeyPress}
                                />
                            </form>
                        )}
                    </SearchDiv>

                    <ProfileDiv>
                        <img id="profileImg" src={Profile} alt="profile" />
                        <select id="select">
                            <option></option>
                            <option>계정관리</option>
                        </select>
                    </ProfileDiv>
                </RightSide>
            </Nav>
        </>
    );
};

export default Header;
