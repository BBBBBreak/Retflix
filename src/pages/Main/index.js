import React, { useEffect, useState } from 'react';
import { MainContainer, VideoWrap, MediaDetail } from './style';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Row from 'Row';
import requests from 'requests';
// import intern from 'assets/images/intern.png';
import blackadam from 'assets/images/blackadam.jpg';
import Video from 'react-player';
import axios from 'axios';
import { BsPlayFill } from '@react-icons/all-files/bs/BsPlayFill';

const Main = () => {
    // const url = "https://youtu.be/bwylOLy5ir0";
    const url = 'https://youtu.be/FuPLLwH4lp4';
    const API_KEY = process.env.REACT_APP_API_KEY;

    const [movie, setMovie] = useState([]);
    const [endMovie, setEndMovie] = useState(false);
    const [keywords, setKeywords] = useState({
        id: '',
        name: '',
    });

    document.cookie = 'safeCookie1=foo; SameSite=None; Secure';
    document.cookie = 'safeCookie2=foo; SameSite=None; Secure';

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get(
                `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`,
            );
            console.log(res.data.results);
            setMovie(res.data.results);
            const result = await axios.get(
                `https://api.themoviedb.org/3/movie/${436270}/keywords?api_key=${API_KEY}`,
            );
            const newKey = {
                ...keywords,
                id: result.data.keywords[1].id,
                name: result.data.keywords[1].name,
            };
            setKeywords({ ...newKey });
            const li = await axios.get(
                `https://api.themoviedb.org/3/movie/${436270}?api_key=${API_KEY}&language=ko-KR`,
            );
            console.log(li, 'asdasd');
        }

        fetchData();
    }, []);

    const Movietitle = () => {
        const title = movie.map((tem, idx) => {
            return (
                idx < 1 && (
                    // <MediaDetail key={idx}>
                    //     <dl>
                    //         <dt>{tem.title}</dt>
                    //         <dd className="keywords">{keywords.name}</dd>
                    //         <dd>{tem.overview}</dd>
                    //     </dl>
                    //     <button>예고편</button>
                    // </MediaDetail>
                    <dl key={idx}>
                        <dt>{tem.title}</dt>
                        <dd className="keywords">{keywords.name}</dd>
                        <dd>{tem.overview}</dd>
                    </dl>
                )
            );
        });

        return (
            <MediaDetail>
                {title}
                <button onClick={() => setEndMovie(!endMovie)}>
                    <BsPlayFill /> 예고편
                </button>
            </MediaDetail>
        );
    };

    return (
        <MainContainer>
            <Header />
            <div>
                <article>
                    {endMovie ? (
                        <>
                            <Movietitle />
                            <div className="ageRating">
                                <span>
                                    <small>12</small>
                                    {/* <small>15</small>
                                    <small>18</small> */}
                                </span>
                            </div>

                            <img src={blackadam} alt="visualImg" />
                        </>
                    ) : (
                        <>
                            <VideoWrap>
                                <Video
                                    url={url}
                                    playing={true}
                                    muted={true}
                                    width="100%"
                                    height="100%"
                                    onEnded={() => setEndMovie(!endMovie)}
                                />
                            </VideoWrap>
                        </>
                    )}
                </article>

                {/* <Row title="NETFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOriginals} /> */}
                <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
                <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
                <Row
                    title="Action Movies"
                    fetchUrl={requests.fetchActionMovies}
                    isLargeRow={true}
                />
                <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
                <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
                {/* <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} /> */}
            </div>

            <Footer />
        </MainContainer>
    );
};

export default Main;
